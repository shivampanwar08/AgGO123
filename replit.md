# AgGo - Agriculture Rental & Marketplace

## Overview
AgGo is a comprehensive agriculture rental and marketplace mobile application featuring dual-mode functionality (Hire/Buy vs Sell/Rent) and role-based views. Built as a mobile-first PWA with full backend integration.

## Current Status
**Full-stack application with PostgreSQL database backend**
- Frontend: Complete visual prototype with mobile-first PWA design
- Backend: RESTful API with PostgreSQL database integration
- Database: Fully configured with Drizzle ORM

## Recent Changes
**January 5, 2026**
- ✅ Database schema implemented with 5 main tables (users, equipment, lands, marketplaceItems, products)
- ✅ Complete RESTful API endpoints for all resources
- ✅ Backend storage layer using Drizzle ORM with PostgreSQL
- ✅ Image upload method changed from URL input to direct mobile camera/gallery for crop listings
- ✅ Land rental marketplace expanded with "Workers/Renters" section showing profiles, pricing per acre, and extra requirements.

## Project Architecture

### Backend Stack
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon-backed)
- **ORM**: Drizzle ORM
- **Validation**: Zod schemas
- **API Routes**: RESTful endpoints prefixed with `/api`

### Database Schema

#### Users Table
- `id` (varchar, UUID, PK)
- `username` (text, unique)
- `password` (text)
- `phone` (text)
- `role` (text) - equipment-renter, land-owner, shopper, user
- `name` (text)
- `village` (text)
- `createdAt` (timestamp)

#### Equipment Table
- `id` (varchar, UUID, PK)
- `userId` (varchar, FK → users.id)
- `name` (text)
- `pricePerDay` (integer)
- `available` (boolean)
- `createdAt` (timestamp)

#### Lands Table
- `id` (varchar, UUID, PK)
- `userId` (varchar, FK → users.id)
- `size` (text)
- `location` (text)
- `soilType` (text)
- `waterSource` (text)
- `pricePerMonth` (integer)
- `available` (boolean)
- `createdAt` (timestamp)

#### Marketplace Items Table
- `id` (varchar, UUID, PK)
- `userId` (varchar, FK → users.id)
- `name` (text)
- `quantity` (text)
- `pricePerUnit` (decimal)
- `image` (text)
- `buyersInterested` (integer)
- `createdAt` (timestamp)

#### Products Table
- `id` (varchar, UUID, PK)
- `userId` (varchar, FK → users.id)
- `name` (text)
- `price` (integer)
- `category` (text)
- `inStock` (boolean)
- `createdAt` (timestamp)

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login

#### Users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (registration)
- `PATCH /api/users/:id` - Update user

#### Equipment
- `GET /api/equipment` - Get all equipment
- `GET /api/users/:userId/equipment` - Get equipment by user
- `POST /api/equipment` - Create equipment listing
- `PATCH /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

#### Lands
- `GET /api/lands` - Get all lands
- `GET /api/users/:userId/lands` - Get lands by user
- `POST /api/lands` - Create land listing
- `PATCH /api/lands/:id` - Update land
- `DELETE /api/lands/:id` - Delete land

#### Marketplace
- `GET /api/marketplace` - Get all marketplace items
- `GET /api/users/:userId/marketplace` - Get marketplace items by user
- `POST /api/marketplace` - Create marketplace item
- `PATCH /api/marketplace/:id` - Update marketplace item
- `DELETE /api/marketplace/:id` - Delete marketplace item

#### Products
- `GET /api/products` - Get all products
- `GET /api/users/:userId/products` - Get products by user
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React Context (useApp)
- **Form Handling**: React Hook Form with Zod validation

### Key Features
1. **Role-Based Views**
   - Equipment Renter: Manage and list agricultural equipment
   - Land Owner: List and manage farmland for rent
   - Shopper: Browse and purchase agricultural products
   - User: Browse available equipment and land

2. **Marketplace**
   - Browse crops and products from farmers
   - Sell crops with buyer interest tracking
   - Real-time buyer offers and connections

3. **Mobile-First PWA**
   - Installable on iOS/Android
   - Constrained layout matching phone dimensions (max-w-md)
   - Bottom navigation with absolute positioning

4. **Multi-Language Support**
   - English and Hindi translations
   - User preference storage

## User Preferences
- Mobile-first design with constrained layout (max-w-md container)
- Bottom navigation uses absolute positioning within mobile container
- All pages use h-full flex layout with scrollable content
- Shops content excluded from Browse Farmers section (farmers/crops only)
- Smaller calendar in AgGo Garage modal for proper fit

## Development Guidelines

### Running the Application
```bash
npm run dev  # Start full-stack application (frontend + backend)
```

### Database Operations
```bash
npm run db:push         # Push schema changes to database
npm run db:push --force # Force push if conflicts occur
```

### Adding New Features
1. Define data model in `shared/schema.ts`
2. Update storage interface in `server/storage.ts`
3. Implement API routes in `server/routes.ts`
4. Update frontend to consume new APIs

## File Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   └── lib/        # Utilities and context
│   ├── ReactNativeExport.js  # React Native version
├── server/             # Backend Express application
│   ├── db.ts          # Database connection
│   ├── storage.ts     # Storage interface & implementation
│   ├── routes.ts      # API endpoints
│   └── index.ts       # Server entry point
├── shared/            # Shared types and schemas
│   └── schema.ts      # Drizzle schema & Zod validation
└── drizzle.config.ts  # Drizzle configuration
```

## Next Steps for Integration
1. Replace localStorage with API calls in frontend components
2. Implement user authentication flow
3. Add TanStack Query for data fetching
4. Implement real-time updates for marketplace items
5. Add booking/transaction functionality
6. Implement image upload for marketplace items
