# Batch Break

A full-stack logistics and inventory management system designed to streamline warehouse operations, shipment processing, and quality control through real-time barcode/QR code scanning.

## 📋 Overview

Batch Break is a production-ready application that enables warehouse teams to manage shipments, track article inventory, scan items during processing, and report issues with role-based access control. The system provides real-time updates, comprehensive tracking, and an intuitive interface for operators, managers, and administrators.

### Key Features

- **Shipment Management** – Create, track, and manage shipments with automatic status transitions
- **Real-time Scanning** – Barcode (EAN-13) and QR code scanning for article verification
- **Issue Reporting** – Report and track shipment issues with severity levels
- **Article Inventory** – Comprehensive article management with bulk import capabilities
- **Role-Based Access Control** – Four-tier permission system (Admin, Manager, Operator, Basic User)
- **Employee Management** – User administration with role assignment
- **Data Tables** – Advanced filtering, sorting, and pagination for all entities
- **Theme Support** – Light/dark mode toggle with system preference detection
- **API Documentation** – Interactive Swagger/OpenAPI documentation

---

## 🏗️ Architecture

### Backend

**Purpose**: RESTful API server providing authentication, data persistence, and business logic for warehouse operations.

**Technology Stack**:

- **Framework**: NestJS 11 with Fastify HTTP adapter
- **Language**: TypeScript 5.7
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: TypeORM 0.3.28
- **Authentication**: Passport.js with JWT strategy
- **Password Security**: bcrypt 6.0.0
- **API Documentation**: Swagger/OpenAPI 11.2.4
- **Validation**: class-validator & class-transformer
- **Logging**: nestjs-pino 4.5.0

### Frontend

**Purpose**: Modern web application providing an intuitive interface for warehouse operations, scanning, and management tasks.

**Technology Stack**:

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5.9
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.1.18
- **Component Library**: Radix UI (comprehensive primitives)
- **State Management**: Zustand 5.0.10
- **Data Fetching**: TanStack React Query 5.90.18
- **Tables**: TanStack React Table 8.21.3
- **Scanner**: @yudiel/react-qr-scanner 2.5.1
- **Notifications**: sonner 2.0.7
- **Icons**: Lucide React 0.562.0
- **Theme**: next-themes 0.4.6

### Development Tools

- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7.4
- **Git Hooks**: Husky 9.1.7 + lint-staged 16.2.7
- **Testing**: Jest (backend) with TypeScript support
- **Dependency Analysis**: Knip 5.81.0

---

## 📁 Project Structure

```
batch_break/
├── backend/              # NestJS REST API
│   ├── src/
│   │   ├── main.ts      # Application entry point (Fastify on port 8000)
│   │   ├── app.module.ts
│   │   ├── commons/     # Shared utilities, filters, interceptors
│   │   └── modules/     # Feature modules
│   │       ├── auth/              # JWT authentication (login, signup)
│   │       ├── database/          # TypeORM configuration
│   │       ├── roles/             # Role entity (1-4: Admin to Basic)
│   │       ├── users/             # User CRUD operations
│   │       ├── articles/          # Article inventory management
│   │       ├── shipments/         # Shipment lifecycle management
│   │       ├── shipment-item/     # Shipment items with articles
│   │       └── issues/            # Issue reporting system
│   ├── test/            # E2E tests
│   └── package.json
│
├── frontend/            # Next.js web application
│   ├── src/
│   │   ├── app/        # Next.js App Router pages
│   │   │   ├── login/                   # Authentication pages
│   │   │   ├── signup/
│   │   │   └── dashboard/               # Protected routes
│   │   │       ├── page.tsx             # Dashboard home
│   │   │       ├── articles/            # Article inventory table
│   │   │       ├── shipments/           # Shipment management
│   │   │       │   ├── page.tsx         # Shipments list
│   │   │       │   └── issues/          # Issue management
│   │   │       ├── scan/                # Barcode/QR scanning
│   │   │       │   ├── qr/              # QR code scanner
│   │   │       │   └── barcode/         # Barcode scanner
│   │   │       └── management/          # Employee management
│   │   ├── api/
│   │   │   ├── config/               # API client & endpoints
│   │   │   ├── services/             # Service classes
│   │   │   │   ├── auth/
│   │   │   │   ├── users/
│   │   │   │   ├── articles/
│   │   │   │   ├── shipments/
│   │   │   │   └── issues/
│   │   │   └── responses/            # Response types
│   │   ├── components/
│   │   │   ├── features/             # Feature components
│   │   │   │   ├── scanner/          # Code scanner implementation
│   │   │   │   ├── report-issue/     # Issue reporting form
│   │   │   │   ├── data-table/       # Reusable table components
│   │   │   │   └── tables/           # Domain-specific tables
│   │   │   ├── layout/               # Sidebar, navigation
│   │   │   ├── ui/                   # Radix-based UI components
│   │   │   └── providers/            # Theme & query providers
│   │   ├── types/                    # TypeScript type definitions
│   │   ├── hooks/                    # Custom React hooks
│   │   └── lib/                      # Utilities & config
│   └── next.config.ts
│
├── .husky/              # Git hooks
├── start.bat            # Windows startup script
├── start.sh             # Unix/macOS startup script
├── package.json         # Root workspace configuration
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v10 or higher
- **PostgreSQL**: v14 or higher (or Neon serverless account)

### Backend Setup

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the `backend` directory:

   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

   # JWT Configuration
   JWT_SECRET=your-secure-jwt-secret-key-here

   # Application Environment
   NODE_ENV=development
   ```

4. **Start the development server**:

   ```bash
   npm run start:dev
   ```

   The backend API will be available at `http://localhost:8000`

5. **Access API documentation**:

   Navigate to `http://localhost:8000/api-docs` for interactive Swagger UI

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables** (optional):

   Create a `.env.local` file in the `frontend` directory:

   ```env
   # API URL (defaults to localhost:8000 via next.config.ts rewrites)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The frontend application will be available at `http://localhost:3000`

### Quick Start (Both Services)

Use the provided startup scripts to run both frontend and backend simultaneously:

**Windows:**

```bash
# Development mode
start.bat -d

# Production mode
start.bat
```

**Unix/macOS:**

```bash
# Make executable (first time only)
chmod +x start.sh

# Development mode
./start.sh -d

# Production mode
./start.sh
```

---

## 🔑 Authentication & Authorization

### User Roles

The system includes four predefined roles with different permission levels:

| Role ID | Role Name  | Permissions                                |
| ------- | ---------- | ------------------------------------------ |
| 1       | Admin      | Full system access, user management        |
| 2       | Operator   | Scanning, issue reporting, view access     |
| 3       | Manager    | Shipment/article CRUD, employee management |
| 4       | Basic User | Read-only access                           |

### First User Setup

1. Register a new account via `/signup`
2. Default role assigned: Basic User (4)
3. Manually update the role in the database to Admin (1) for the first user:
   ```sql
   UPDATE users SET role_id = 1 WHERE email = 'your-email@example.com';
   ```

### Role-Based Endpoint Protection

Endpoints are protected using `@Roles()` decorators:

- **Admin (1)**: User creation, full access
- **Manager (3)**: Shipment/article management, user updates
- **Operator (2)**: Scanning operations, issue reporting
- **Basic User (4)**: Read-only access

---

## 📡 API Endpoints

### Authentication

```
POST /auth/login      - User login with email/password
POST /auth/signup     - User registration
```

### Users (JWT Required)

```
GET    /users                    - Fetch all users
GET    /users/:id                - Get user by ID
GET    /users?email=...          - Find user by email
GET    /users/exists?email=...   - Check if email exists
POST   /users                    - Create user (Admin only)
PATCH  /users/:id                - Update user (Admin/Manager)
DELETE /users/:id                - Delete user (Admin/Manager)
```

### Articles

```
GET    /articles                 - Get paginated articles (supports search)
GET    /articles/:id             - Get article by ID
POST   /articles                 - Create article (Admin/Manager)
POST   /articles/bulk            - Bulk create articles (Admin/Manager)
PATCH  /articles/:id             - Update article (Admin/Manager)
DELETE /articles/:id             - Delete article (Admin/Manager)
```

### Shipments

```
GET    /shipments                - Get paginated shipments (search, status filter)
GET    /shipments/:id            - Get shipment details with items
POST   /shipments                - Create shipment (Admin/Manager)
POST   /shipments/scan/:barcode  - Scan article barcode (Admin/Manager/Operator)
PATCH  /shipments/:id            - Update shipment status (Admin/Manager)
PATCH  /shipments/:shipmentId/items/:itemId - Update item quantity
DELETE /shipments/:id            - Delete shipment (Admin/Manager)
```

### Issues

```
GET    /issues                   - Get all issues
GET    /issues/:id               - Get issue by ID
POST   /issues                   - Report issue (Admin/Manager/Operator)
PATCH  /issues/:id               - Update issue status (Admin/Manager/Operator)
DELETE /issues/:id               - Delete issue (Admin/Manager/Operator)
```

**Full API documentation**: Visit `/api-docs` when the backend server is running for interactive Swagger documentation.

---

## 🗄️ Database Schema

### Core Entities

**Users**

- UUID primary key
- Authentication credentials with bcrypt hashing
- Foreign key relationship to Roles
- Tracks issue reporters

**Roles**

- Predefined roles (1-4: Admin, Operator, Manager, Basic User)
- One-to-many relationship with Users

**Articles**

- Auto-increment primary key
- Unique barcode (EAN-13 format)
- Product information (name, manufacturer, category, price)
- Scan count tracking
- One-to-many relationship with ShipmentItems

**Shipments**

- Auto-generated shipment numbers (`SHP-{timestamp}-{random}`)
- Status tracking (DRAFT, IN_PROGRESS, COMPLETED)
- Article count tracking (total, different, scanned)
- Progress calculation based on scanned items
- One-to-many relationships with ShipmentItems and Issues

**ShipmentItem**

- Links articles to shipments with quantities
- Tracks scanned vs. total quantities per article
- Per-item completion status (PENDING, COMPLETED)
- Many-to-one relationships to Shipment and Article

**Issue**

- Issue reporting against shipments
- Severity levels (LOW=1, MEDIUM=2, HIGH=3)
- Status tracking (RESOLVED, UNRESOLVED, DISMISSED)
- Foreign keys to User (reporter) and Shipment
- Timestamp tracking (createdAt, updatedAt)

---

## ▶️ Running the Application

### Development Mode

**Backend:**

```bash
cd backend
npm run start:dev    # Hot reload enabled
```

**Frontend:**

```bash
cd frontend
npm run dev          # Fast refresh enabled
```

### Production Mode

**Backend:**

```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**

```bash
cd frontend
npm run build
npm run start
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test          # Run unit tests
npm run test:watch    # Watch mode
npm run test:cov      # Generate coverage report
npm run test:e2e      # Run end-to-end tests
```

### Code Quality

The project uses automated code quality tools via git hooks:

```bash
# Root-level commands
npm run knip          # Check for unused dependencies

# Frontend linting
cd frontend && npm run lint

# Backend linting
cd backend && npm run lint
```

**Pre-commit hooks** automatically run ESLint and Prettier on staged files to ensure code quality.

---

## 🚢 Deployment

### Production Environment

The application is currently deployed on:

- **Backend**: Railway ([batch-break-production.up.railway.app](https://batch-break-production.up.railway.app))
- **Frontend**: Vercel (with API rewrites to Railway backend)
- **Database**: Neon serverless PostgreSQL

### Environment Variables (Production)

**Backend (Railway)**:

```env
DATABASE_URL=postgresql://...?sslmode=require
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

**Frontend (Vercel)**:

- No environment variables required (API URL configured via rewrites in `next.config.ts`)

### Deployment Configuration

**Backend build command**:

```bash
npm run build
```

**Backend start command**:

```bash
npm run start:prod
```

**Frontend** is automatically built and deployed by Vercel on push to main branch.

---

## 🔧 Troubleshooting

### Common Issues

**Database Connection Errors**

- Verify `DATABASE_URL` is correctly formatted with proper credentials
- Ensure PostgreSQL server is running and accessible
- Check SSL mode requirements (`?sslmode=require` for Neon serverless)
- Verify network/firewall settings

**JWT Authentication Failures**

- Confirm `JWT_SECRET` is set in backend `.env`
- Check token expiration settings
- Verify `Authorization: Bearer {token}` header format
- Clear browser cookies and localStorage

**CORS Errors**

- Backend CORS is enabled for all origins in development
- For production, ensure frontend domain is whitelisted
- Check `next.config.ts` rewrites configuration

**Scanner Not Working**

- Ensure HTTPS is enabled (required for camera access)
- Grant camera permissions in browser settings
- Verify @yudiel/react-qr-scanner is properly installed
- Test in a different browser to rule out compatibility issues

**Build Failures**

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility (v18+ required)
- Verify TypeScript version matches across monorepo
- Delete `.next` folder and rebuild frontend

**Port Already in Use**

```bash
# Windows
netstat -ano | findstr :8000

# Unix/macOS
lsof -i :8000
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Workflow

1. **Fork the repository** and create a feature branch

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Commit your changes** using conventional commit format

   ```bash
   git commit -m "feat: add your feature description"
   ```

   Commit types:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `refactor:` - Code refactoring
   - `test:` - Test additions or updates
   - `chore:` - Build process or auxiliary tool changes

4. **Push to your fork**

   ```bash
   git push origin feat/your-feature-name
   ```

5. **Submit a pull request** with a clear description of changes

### Code Style

- ESLint and Prettier configurations are enforced via pre-commit hooks
- Follow existing patterns and conventions
- Ensure all tests pass before submitting
- Add tests for new features
- Update documentation as needed

---

## 🔄 Recent Updates

- ✅ **QR & Barcode Scanner** (Latest) – Integrated real-time scanning functionality for shipment processing
- ✅ **Issues Management** – Added comprehensive issue reporting and tracking system with severity levels
- ✅ **Employee Management** – Implemented user management table with role-based controls
- ✅ **Shipment Details** – Enhanced shipment view with detailed item tracking and progress calculation
- ✅ **Authorization** – Protected critical endpoints with role-based guards (Admin, Manager, Operator)
- ✅ **Railway Deployment** – Backend deployed to Railway with PostgreSQL integration
- ✅ **Articles Management** – CRUD operations with bulk import and search capabilities
- ✅ **UI Improvements** – Minor UI fixes and enhanced user experience

---

## 📄 License

This project is **UNLICENSED** – private and proprietary.

---

## 📞 Support

For issues, questions, or contributions:

- **Issues**: Report bugs or request features via GitHub Issues
- **API Documentation**: Refer to Swagger docs at `/api-docs`
- **Code Review**: All pull requests are reviewed before merging

---

## 🔗 Related Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Neon Serverless PostgreSQL](https://neon.tech/docs)

---

**Built with ❤️ for efficient warehouse operations**
