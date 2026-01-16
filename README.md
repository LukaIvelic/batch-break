# Batch Break

A full-stack web application built with **NestJS** (backend) and **Next.js** (frontend), featuring user authentication with role-based access control, dashboard functionality, and a modern UI component library.

---

## 📁 Project Structure

```
batch_break/
├── backend/          # NestJS REST API
├── frontend/         # Next.js application
├── .husky/           # Git hooks for code quality
├── start.bat         # Windows startup script
├── start.sh          # Unix/macOS startup script
└── package.json      # Root workspace configuration
```

---

## ✨ Features

- **User Authentication** – JWT-based login and signup with session management
- **Role-Based Access Control** – User roles with database-level relationships
- **User Management** – Full CRUD operations for user accounts
- **Dashboard** – Protected dashboard with collapsible sidebar navigation
- **Theme Support** – Light/dark mode toggle with system preference detection
- **API Documentation** – Swagger/OpenAPI integration
- **Type Safety** – Full TypeScript support across the stack
- **Code Quality** – Pre-commit hooks with Husky and lint-staged
- **Dependency Analysis** – Knip integration for detecting unused dependencies

---

## 🛠 Tech Stack

### Backend

| Dependency      | Purpose                    |
| --------------- | -------------------------- |
| NestJS 11       | Node.js framework          |
| Fastify         | HTTP adapter               |
| TypeORM         | Database ORM               |
| PostgreSQL      | Database (Neon serverless) |
| Passport + JWT  | Authentication             |
| bcrypt          | Password hashing           |
| Swagger         | API documentation          |
| class-validator | Request validation         |

### Frontend

| Dependency               | Purpose               |
| ------------------------ | --------------------- |
| Next.js 16               | React framework       |
| React 19                 | UI library            |
| Tailwind CSS 4           | Styling               |
| Radix UI                 | Accessible components |
| Lucide React             | Icons                 |
| next-themes              | Theme management      |
| class-variance-authority | Component variants    |

### Development Tools

| Tool         | Purpose                     |
| ------------ | --------------------------- |
| TypeScript 5 | Type safety                 |
| ESLint       | Linting                     |
| Prettier     | Code formatting             |
| Husky        | Git hooks                   |
| lint-staged  | Pre-commit formatting       |
| Knip         | Unused dependency detection |
| Jest         | Testing (backend)           |

---

## 📋 Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- **PostgreSQL** database (or Neon serverless account)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd batch_break
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
JWT_SECRET=your-secure-jwt-secret-key
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory (optional):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## ▶️ Running the Application

### Quick Start (Recommended)

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

### Manual Start

#### Backend

```bash
cd backend

# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:8000`

Swagger documentation: `http://localhost:8000/api`

#### Frontend

```bash
cd frontend

# Development mode
npm run dev

# Production build
npm run build
npm run start
```

The application will be available at `http://localhost:3000`

---

## 🧪 Testing

### Backend

```bash
cd backend

# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/auth/login`  | User login        |
| POST   | `/auth/signup` | User registration |

### Users

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/users`               | Create user          |
| GET    | `/users`               | Get all users        |
| GET    | `/users/:id`           | Get user by ID       |
| GET    | `/users?email=`        | Get user by email    |
| GET    | `/users/exists?email=` | Check if user exists |
| PATCH  | `/users/:id`           | Update user          |
| DELETE | `/users/:id`           | Delete user          |

---

## 📂 Backend Architecture

```
backend/src/
├── main.ts                    # Application entry point
├── app.module.ts              # Root module
├── commons/
│   ├── setup.ts               # App configuration (CORS, Swagger, validation)
│   ├── filters/               # Exception filters
│   └── interceptors/          # Response interceptors
└── modules/
    ├── auth/                  # Authentication module (login, signup)
    ├── database/              # Database configuration
    ├── roles/                 # Role management module
    └── users/                 # User management module
```

---

## 📂 Frontend Architecture

```
frontend/src/
├── app/                       # Next.js App Router pages
│   ├── actions/               # Server actions
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   └── dashboard/             # Protected dashboard
├── api/
│   ├── config/                # API client configuration
│   ├── responses/             # Response type definitions
│   └── services/              # API service functions
├── components/
│   ├── features/              # Reusable feature components
│   ├── layout/                # Layout components (sidebar, header, footer)
│   ├── pages/                 # Page-level components
│   ├── providers/             # React context providers (theme)
│   └── ui/                    # Base UI components (Radix-based)
├── hooks/                     # Custom React hooks
├── lib/                       # Utilities and configuration
└── styles/                    # Component-specific CSS styles
```

---

## 🔧 Available Scripts

### Root

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run prepare` | Install Husky git hooks      |
| `npm run knip`    | Detect unused dependencies   |
| `start.bat`       | Start both apps (Windows)    |
| `start.sh`        | Start both apps (Unix/macOS) |

### Backend

| Command              | Description               |
| -------------------- | ------------------------- |
| `npm run start:dev`  | Start in development mode |
| `npm run start:prod` | Start in production mode  |
| `npm run build`      | Build for production      |
| `npm run lint`       | Run ESLint                |
| `npm run format`     | Format code with Prettier |
| `npm run test`       | Run tests                 |

### Frontend

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🔒 Environment Variables

### Backend

| Variable       | Required | Description                  |
| -------------- | -------- | ---------------------------- |
| `DATABASE_URL` | Yes      | PostgreSQL connection string |
| `JWT_SECRET`   | Yes      | Secret key for JWT signing   |

### Frontend

| Variable              | Required | Description                                        |
| --------------------- | -------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | No       | Backend API URL (default: `http://localhost:8000`) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### Code Style

- Code is automatically formatted on commit via Husky + lint-staged
- Follow existing patterns and conventions
- Ensure all tests pass before submitting

---

## 📄 License

This project is **UNLICENSED** – private and proprietary.

---

## � Troubleshooting

### Common Issues

**Port already in use**

```bash
# Check which process is using the port
# Windows
netstat -ano | findstr :8000

# Unix/macOS
lsof -i :8000
```

**Database connection errors**

- Verify `DATABASE_URL` is correctly formatted
- Ensure PostgreSQL server is running
- Check network/firewall settings for Neon serverless

**JWT authentication issues**

- Ensure `JWT_SECRET` is set in the backend `.env`
- Clear browser cookies and local storage
- Verify token expiration settings

**Frontend build errors**

- Delete `node_modules` and `.next` folders, then reinstall
- Ensure all environment variables are set
- Check for TypeScript errors with `npm run lint`

---

## 🔗 Related Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [Neon Serverless PostgreSQL](https://neon.tech/docs)
