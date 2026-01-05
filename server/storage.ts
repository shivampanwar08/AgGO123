// Blueprint reference: javascript_database
import { 
  users, 
  equipment, 
  lands, 
  marketplaceItems, 
  products,
  type User, 
  type InsertUser,
  type Equipment,
  type InsertEquipment,
  type Land,
  type InsertLand,
  type MarketplaceItem,
  type InsertMarketplaceItem,
  type Product,
  type InsertProduct
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Equipment
  getEquipment(id: string): Promise<Equipment | undefined>;
  getEquipmentByUserId(userId: string): Promise<Equipment[]>;
  getAllEquipment(): Promise<Equipment[]>;
  createEquipment(equipment: InsertEquipment): Promise<Equipment>;
  updateEquipment(id: string, updates: Partial<InsertEquipment>): Promise<Equipment | undefined>;
  deleteEquipment(id: string): Promise<boolean>;
  
  // Lands
  getLand(id: string): Promise<Land | undefined>;
  getLandsByUserId(userId: string): Promise<Land[]>;
  getAllLands(): Promise<Land[]>;
  createLand(land: InsertLand): Promise<Land>;
  updateLand(id: string, updates: Partial<InsertLand>): Promise<Land | undefined>;
  deleteLand(id: string): Promise<boolean>;
  
  // Marketplace Items
  getMarketplaceItem(id: string): Promise<MarketplaceItem | undefined>;
  getMarketplaceItemsByUserId(userId: string): Promise<MarketplaceItem[]>;
  getAllMarketplaceItems(): Promise<MarketplaceItem[]>;
  createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem>;
  updateMarketplaceItem(id: string, updates: Partial<InsertMarketplaceItem>): Promise<MarketplaceItem | undefined>;
  deleteMarketplaceItem(id: string): Promise<boolean>;
  
  // Products
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByUserId(userId: string): Promise<Product[]>;
  getAllProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Equipment
  async getEquipment(id: string): Promise<Equipment | undefined> {
    const [item] = await db.select().from(equipment).where(eq(equipment.id, id));
    return item || undefined;
  }

  async getEquipmentByUserId(userId: string): Promise<Equipment[]> {
    return await db.select().from(equipment).where(eq(equipment.userId, userId)).orderBy(desc(equipment.createdAt));
  }

  async getAllEquipment(): Promise<Equipment[]> {
    return await db.select().from(equipment).orderBy(desc(equipment.createdAt));
  }

  async createEquipment(insertEquipment: InsertEquipment): Promise<Equipment> {
    const [item] = await db
      .insert(equipment)
      .values(insertEquipment)
      .returning();
    return item;
  }

  async updateEquipment(id: string, updates: Partial<InsertEquipment>): Promise<Equipment | undefined> {
    const [item] = await db
      .update(equipment)
      .set(updates)
      .where(eq(equipment.id, id))
      .returning();
    return item || undefined;
  }

  async deleteEquipment(id: string): Promise<boolean> {
    const result = await db.delete(equipment).where(eq(equipment.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Lands
  async getLand(id: string): Promise<Land | undefined> {
    const [land] = await db.select().from(lands).where(eq(lands.id, id));
    return land || undefined;
  }

  async getLandsByUserId(userId: string): Promise<Land[]> {
    return await db.select().from(lands).where(eq(lands.userId, userId)).orderBy(desc(lands.createdAt));
  }

  async getAllLands(): Promise<Land[]> {
    return await db.select().from(lands).orderBy(desc(lands.createdAt));
  }

  async createLand(insertLand: InsertLand): Promise<Land> {
    const [land] = await db
      .insert(lands)
      .values(insertLand)
      .returning();
    return land;
  }

  async updateLand(id: string, updates: Partial<InsertLand>): Promise<Land | undefined> {
    const [land] = await db
      .update(lands)
      .set(updates)
      .where(eq(lands.id, id))
      .returning();
    return land || undefined;
  }

  async deleteLand(id: string): Promise<boolean> {
    const result = await db.delete(lands).where(eq(lands.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Marketplace Items
  async getMarketplaceItem(id: string): Promise<MarketplaceItem | undefined> {
    const [item] = await db.select().from(marketplaceItems).where(eq(marketplaceItems.id, id));
    return item || undefined;
  }

  async getMarketplaceItemsByUserId(userId: string): Promise<MarketplaceItem[]> {
    return await db.select().from(marketplaceItems).where(eq(marketplaceItems.userId, userId)).orderBy(desc(marketplaceItems.createdAt));
  }

  async getAllMarketplaceItems(): Promise<MarketplaceItem[]> {
    return await db.select().from(marketplaceItems).orderBy(desc(marketplaceItems.createdAt));
  }

  async createMarketplaceItem(insertItem: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const [item] = await db
      .insert(marketplaceItems)
      .values(insertItem)
      .returning();
    return item;
  }

  async updateMarketplaceItem(id: string, updates: Partial<InsertMarketplaceItem>): Promise<MarketplaceItem | undefined> {
    const [item] = await db
      .update(marketplaceItems)
      .set(updates)
      .where(eq(marketplaceItems.id, id))
      .returning();
    return item || undefined;
  }

  async deleteMarketplaceItem(id: string): Promise<boolean> {
    const result = await db.delete(marketplaceItems).where(eq(marketplaceItems.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Products
  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductsByUserId(userId: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.userId, userId)).orderBy(desc(products.createdAt));
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export const storage = new DatabaseStorage();
