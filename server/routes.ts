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

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ===== USER ROUTES =====
  
  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Don't send password to client
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // Create user (registration)
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      const { password, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
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
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const { password: _, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
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
