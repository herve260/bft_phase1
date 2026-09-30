# Build Future Tourism — Phase 3 Final

A database-backed tourism and career platform for Rwanda. This version intentionally uses **MySQL + mysql2** and has **no Prisma dependency**.

## Main capabilities

### Public / user experience
- Browse destinations, categories and destination galleries
- Search and filter tourism locations
- View destination maps and details
- Register and login securely
- JWT access tokens + HTTP-only refresh cookie
- Apply for internships with CV upload
- Paid internships with registration fee + payment reference submission
- Track application status
- Register for training programs
- Submit feedback and comments for moderation
- Contact the platform
- Receive in-app notifications
- Responsive mobile/desktop interface

### Admin control center
- Dashboard statistics
- Add/edit/delete tourism destinations
- Upload destination photos locally (JPG/PNG/WebP)
- Maintain destination coordinates and featured status
- Create/manage internships
- Set paid internship registration fees and payment notes
- Review applications and update status
- Verify/reject/refund internship payments
- Manage training programs and registrations
- Moderate feedback/comments
- Read contact messages
- Manage users, roles and account status

## Architecture

```text
bft_phase1/
├── src/                 # React + Vite frontend
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── utils/
├── server/              # Express + TypeScript backend
│   ├── src/
│   │   ├── config/      # MySQL + environment
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── services/
│   └── uploads/
└── README.md
```

## Requirements

- Node.js 22 LTS or newer
- MySQL 8+ or MariaDB
- npm

## Backend setup — Windows

Open Terminal 1:

```bat
cd C:\Users\Student\Downloads\bft_phase3_mysql_final\bft_phase1\server
copy .env.example .env
npm install
```

Edit `.env` and set your MySQL password and JWT secrets. Example:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=YOUR_MYSQL_PASSWORD
DATABASE_NAME=build_future_tourism

JWT_ACCESS_SECRET=replace_with_a_long_random_secret_at_least_32_chars
JWT_REFRESH_SECRET=replace_with_another_long_random_secret_at_least_32_chars

SEED_ADMIN_EMAIL=admin@buildfuturetourism.rw
SEED_ADMIN_PASSWORD=ChangeMe123!
```

Start MySQL before seeding. The application automatically creates the `build_future_tourism` database and tables when it connects, provided the MySQL account has permission to create databases.

Then run:

```bat
npm run db:seed
npm run dev
```

Backend:

- API: `http://localhost:5000`
- Health: `http://localhost:5000/api/health`
- Swagger: `http://localhost:5000/api/docs`

## Frontend setup — Windows

Open Terminal 2:

```bat
cd C:\Users\Student\Downloads\bft_phase3_mysql_final\bft_phase1
npm install
npm run dev
```

Vite will show the actual local URL. Usually it is `http://localhost:5173`.

If Vite selects another port, the backend CORS configuration accepts localhost development ports.

## Admin account

The seed creates/updates the admin using the values in `server/.env`:

```text
Email:    admin@buildfuturetourism.rw
Password: ChangeMe123!
```

Change the password before production use.

## File uploads

Destination photos are stored locally under:

```text
server/uploads/destinations/
```

CV files are handled under the existing CV service and are limited to PDF/DOC/DOCX with a 5 MB limit.

Cloudinary is optional and is not required for the normal local development flow.

## Database

The database contains separate records for:

- users and refresh tokens
- categories
- destinations and destination images
- internships
- internship applications
- internship payments
- training programs and registrations
- feedback
- contact messages
- notifications
- audit logs

## Security and reliability

- Password hashing with bcrypt
- JWT access token authentication
- HTTP-only refresh cookie
- Role-based authorization
- Helmet security headers
- CORS restrictions for allowed localhost development origins
- API rate limiting
- Zod request validation
- File type and size validation
- Foreign keys and unique constraints
- Account status controls
- Payment status workflow
- Moderated feedback
- Automatic database/table initialization
- Graceful server shutdown

## Important development note

Do **not** run Prisma commands in this version. Prisma has been completely removed.

Do not use `npm audit fix --force` while setting up the project. First get the application running and verify the dependency versions. Forced major upgrades can introduce unrelated compatibility problems.
