# Batch Break

A full-stack web application built with **NestJS** (backend) and **Next.js** (frontend), featuring user authentication, dashboard functionality, and a modern UI component library.

---

## 📁 Project Structure

```
batch_break/
├── backend/          # NestJS REST API
├── frontend/         # Next.js application
├── .husky/           # Git hooks for code quality
└── package.json      # Root workspace configuration
```

---

## ✨ Features

- **User Authentication** – JWT-based login and session management
- **User Management** – Full CRUD operations for user accounts
- **Dashboard** – Protected dashboard with sidebar navigation
- **API Documentation** – Swagger/OpenAPI integration
- **Type Safety** – Full TypeScript support across the stack
- **Code Quality** – Pre-commit hooks with Husky and lint-staged

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
| class-variance-authority | Component variants    |

### Development Tools

| Tool         | Purpose               |
| ------------ | --------------------- |
| TypeScript 5 | Type safety           |
| ESLint       | Linting               |
| Prettier     | Code formatting       |
| Husky        | Git hooks             |
| lint-staged  | Pre-commit formatting |
| Jest         | Testing (backend)     |

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
API_ENDPOINT=http://localhost:8000
```

---

## ▶️ Running the Application

### Backend

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

### Frontend

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

| Method | Endpoint      | Description |
| ------ | ------------- | ----------- |
| POST   | `/auth/login` | User login  |

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
    ├── auth/                  # Authentication module
    ├── database/              # Database configuration
    └── users/                 # User management module
```

---

## 📂 Frontend Architecture

```
frontend/src/
├── app/                       # Next.js App Router pages
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   └── dashboard/             # Protected dashboard
├── api/
│   ├── config/                # API client configuration
│   └── services/              # API service functions
├── components/
│   ├── features/              # Reusable feature components
│   ├── layout/                # Layout components (sidebar, header)
│   ├── pages/                 # Page-level components
│   └── ui/                    # Base UI components
├── hooks/                     # Custom React hooks
└── lib/                       # Utilities and types
```

---

## 🔧 Available Scripts

### Root

| Command           | Description             |
| ----------------- | ----------------------- |
| `npm run prepare` | Install Husky git hooks |

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

| Variable       | Required | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| `API_ENDPOINT` | No       | Backend API URL (default: `http://localhost:8000`) |

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

## 🔗 Related Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
