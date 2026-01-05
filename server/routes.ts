import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertEquipmentSchema, 
  insertLandSchema, 
  insertMarketplaceItemSchema,
  insertProductSchema 
} from "@shared/schema";
import { z } from "zod";

// Helper to generate 6-digit OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper to extract name from email
function extractNameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  return localPart
    .replace(/[._-]/g, ' ')
    .replace(/\d+/g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim() || 'User';
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ===== OTP AUTH ROUTES =====
  
  // Request OTP (send to phone or email)
  app.post("/api/auth/request-otp", async (req, res) => {
    try {
      const { identifier, type } = req.body;
      
      if (!identifier || !type || !['phone', 'email'].includes(type)) {
        return res.status(400).json({ error: "Invalid identifier or type" });
      }
      
      // Generate OTP
      const code = generateOtp();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      
      // Store OTP in database
      await storage.createOtp({
        identifier,
        type,
        code,
        expiresAt,
      });
      
      // In production, send OTP via Twilio (SMS) or SendGrid (email)
      // For development, log OTP to server console only
      console.log(`[OTP] Generated for ${type} ${identifier}: ${code}`);
      
      // Only show OTP in development mode via server console
      const isDev = process.env.NODE_ENV !== 'production';
      
      res.json({ 
        success: true, 
        message: `OTP sent to ${type === 'phone' ? 'phone' : 'email'}`,
        // Only include debug OTP in development for testing
        ...(isDev && { debugOtp: code })
      });
    } catch (error) {
      console.error("OTP request error:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  });

  // Verify OTP
  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const { identifier, type, code, name } = req.body;
      
      if (!identifier || !type || !code) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Find valid OTP
      const otp = await storage.getValidOtp(identifier, code);
      
      if (!otp) {
        return res.status(401).json({ error: "Invalid or expired OTP" });
      }
      
      // Mark OTP as verified
      await storage.markOtpVerified(otp.id);
      
      // Find or create user
      let user;
      if (type === 'phone') {
        user = await storage.getUserByPhone(identifier);
        if (!user) {
          // For phone login, name is required for new users
          if (!name) {
            return res.json({ 
              success: true, 
              requiresName: true,
              message: "OTP verified. Please provide your name."
            });
          }
          // Create new user with phone
          user = await storage.createUser({
            phone: identifier,
            name: name,
            role: 'user',
          });
        }
      } else {
        // Email login
        user = await storage.getUserByEmail(identifier);
        if (!user) {
          // Extract name from email for new users
          const extractedName = name || extractNameFromEmail(identifier);
          user = await storage.createUser({
            email: identifier,
            name: extractedName,
            role: 'user',
          });
        }
      }
      
      // Set user as verified
      await storage.setUserVerified(user.id);
      
      res.json({ 
        success: true, 
        user,
        message: "Login successful"
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  });

  // Complete profile (for phone users who need to add name after OTP verification)
  app.post("/api/auth/complete-profile", async (req, res) => {
    try {
      const { identifier, type, name, otpCode } = req.body;
      
      if (!identifier || !type || !name || !otpCode) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      
      // Verify the OTP was already verified for this identifier
      const otp = await storage.getVerifiedOtp(identifier, otpCode);
      if (!otp) {
        return res.status(401).json({ error: "OTP verification required. Please verify OTP first." });
      }
      
      let user;
      if (type === 'phone') {
        user = await storage.getUserByPhone(identifier);
        if (!user) {
          // Create new user with phone and name
          user = await storage.createUser({
            phone: identifier,
            name: name,
            role: 'user',
          });
        } else {
          // Update existing user's name
          user = await storage.updateUser(user.id, { name });
        }
      } else {
        user = await storage.getUserByEmail(identifier);
        if (user) {
          user = await storage.updateUser(user.id, { name });
        }
      }
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      await storage.setUserVerified(user.id);
      
      res.json({ 
        success: true, 
        user,
        message: "Profile completed"
      });
    } catch (error) {
      console.error("Complete profile error:", error);
      res.status(500).json({ error: "Failed to complete profile" });
    }
  });

  // ===== USER ROUTES =====
  
  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Update user
  app.patch("/api/users/:id", async (req, res) => {
    try {
      const updates = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // ===== EQUIPMENT ROUTES =====
  
  // Get all equipment
  app.get("/api/equipment", async (req, res) => {
    try {
      const equipment = await storage.getAllEquipment();
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch equipment" });
    }
  });

  // Get equipment by user
  app.get("/api/users/:userId/equipment", async (req, res) => {
    try {
      const equipment = await storage.getEquipmentByUserId(req.params.userId);
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch equipment" });
    }
  });

  // Create equipment
  app.post("/api/equipment", async (req, res) => {
    try {
      const validatedData = insertEquipmentSchema.parse(req.body);
      const equipment = await storage.createEquipment(validatedData);
      res.status(201).json(equipment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create equipment" });
    }
  });

  // Update equipment
  app.patch("/api/equipment/:id", async (req, res) => {
    try {
      const updates = insertEquipmentSchema.partial().parse(req.body);
      const equipment = await storage.updateEquipment(req.params.id, updates);
      if (!equipment) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      res.json(equipment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update equipment" });
    }
  });

  // Delete equipment
  app.delete("/api/equipment/:id", async (req, res) => {
    try {
      const success = await storage.deleteEquipment(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete equipment" });
    }
  });

  // ===== LAND ROUTES =====
  
  // Get all lands
  app.get("/api/lands", async (req, res) => {
    try {
      const lands = await storage.getAllLands();
      res.json(lands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lands" });
    }
  });

  // Get lands by user
  app.get("/api/users/:userId/lands", async (req, res) => {
    try {
      const lands = await storage.getLandsByUserId(req.params.userId);
      res.json(lands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch lands" });
    }
  });

  // Create land
  app.post("/api/lands", async (req, res) => {
    try {
      const validatedData = insertLandSchema.parse(req.body);
      const land = await storage.createLand(validatedData);
      res.status(201).json(land);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create land" });
    }
  });

  // Update land
  app.patch("/api/lands/:id", async (req, res) => {
    try {
      const updates = insertLandSchema.partial().parse(req.body);
      const land = await storage.updateLand(req.params.id, updates);
      if (!land) {
        return res.status(404).json({ error: "Land not found" });
      }
      res.json(land);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update land" });
    }
  });

  // Delete land
  app.delete("/api/lands/:id", async (req, res) => {
    try {
      const success = await storage.deleteLand(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Land not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete land" });
    }
  });

  // ===== MARKETPLACE ROUTES =====
  
  // Get all marketplace items
  app.get("/api/marketplace", async (req, res) => {
    try {
      const items = await storage.getAllMarketplaceItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marketplace items" });
    }
  });

  // Get marketplace items by user
  app.get("/api/users/:userId/marketplace", async (req, res) => {
    try {
      const items = await storage.getMarketplaceItemsByUserId(req.params.userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch marketplace items" });
    }
  });

  // Create marketplace item
  app.post("/api/marketplace", async (req, res) => {
    try {
      const validatedData = insertMarketplaceItemSchema.parse(req.body);
      const item = await storage.createMarketplaceItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create marketplace item" });
    }
  });

  // Update marketplace item
  app.patch("/api/marketplace/:id", async (req, res) => {
    try {
      const updates = insertMarketplaceItemSchema.partial().parse(req.body);
      const item = await storage.updateMarketplaceItem(req.params.id, updates);
      if (!item) {
        return res.status(404).json({ error: "Marketplace item not found" });
      }
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update marketplace item" });
    }
  });

  // Delete marketplace item
  app.delete("/api/marketplace/:id", async (req, res) => {
    try {
      const success = await storage.deleteMarketplaceItem(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Marketplace item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete marketplace item" });
    }
  });

  // ===== PRODUCT ROUTES =====
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get products by user
  app.get("/api/users/:userId/products", async (req, res) => {
    try {
      const products = await storage.getProductsByUserId(req.params.userId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Create product
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  // Update product
  app.patch("/api/products/:id", async (req, res) => {
    try {
      const updates = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, updates);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  return httpServer;
}
