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
SEED_ADMIN_PASSWORD=
```

Set `SEED_ADMIN_PASSWORD` to a unique password of at least 12 characters before starting or seeding the backend. The backend rejects blank values and placeholder passwords.

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
```

Set `SEED_ADMIN_PASSWORD` in `server/.env` before running the seed command. Do not reuse a development or example password in production.

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

## Recent improvements

- The public Destinations page now reads published destinations from the API, so locations created in the admin panel appear on the public site.
- Uploaded destination images are resolved against the backend API origin instead of the frontend origin. This fixes broken `/uploads/destinations/...` images when Vite/Netlify and the API run on different hosts.
- Destination cards and detail galleries include lazy loading and a safe fallback image. The admin payment list also includes online training-payment records.
- Added responsive motion effects, card transitions, focus-visible styles and a `prefers-reduced-motion` accessibility fallback.
- Expanded the built-in destination discovery catalogue to 20 locations across nature, culture, history, city experiences, lakes and adventure.
- Added a Flutterwave hosted-checkout integration for the tourism learning registration fee of **50,000 RWF**. The server verifies the transaction directly with Flutterwave before confirming the registration.

## Configure online training payments

Online checkout is optional until credentials are supplied. In `server/.env`, set:

```env
FLW_SECRET_KEY=your_flutterwave_secret_key
FLW_REDIRECT_URL=http://localhost:5173/payment-result
FRONTEND_URL=http://localhost:5173
```

Use Flutterwave **test credentials** while developing. For production, use your real merchant account's approved credentials and your deployed HTTPS frontend URL. Never put the secret key in the React `.env` or commit it to GitHub. The checkout endpoint is `POST /api/training/:id/checkout`; payment return verification is handled by `GET /api/training/payments/verify`. The configured database initialization creates the `training_payments` table automatically. Test a complete checkout and failed/cancelled checkout in the provider's test mode before accepting real payments.

If payment credentials are not configured, the app will show a clear API error instead of pretending that a payment succeeded. The built-in destination catalogue is a browsing fallback; admin-created destinations are stored in MySQL and shown publicly when published.


## Integrated tourism platform updates (October 2026)

- Added a persistent language selector for English, Kinyarwanda and French. The navigation, home-page highlights and destination explorer/map labels respond to the selected language. Destination names/descriptions and some specialist pages remain in the language supplied by the content administrator.
- The Rwanda map only plots destinations with valid latitude/longitude and safely handles missing photos. The map automatically fits the visible destinations.
- Destination creation now accepts destination fields and an optional image in one multipart request. The API stores the destination and its image-gallery record in one MySQL transaction; if the database save fails, the just-uploaded file is removed. This avoids reporting a successfully created destination when its selected image failed to save.
- The admin form shows an image preview and rejects unsupported types and files larger than 8 MB before upload. Backend validation remains authoritative.
- The frontend uses `lucide-react` version `^0.468.0`. If a prior install has a damaged package, remove `node_modules` and reinstall using the Windows steps below.

### Clean install on Windows

From the project root (the folder containing the frontend `package.json`), stop Vite and run:

```bat
rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache verify
npm install
npm run build
```

In a second terminal, configure and start the backend from `server`:

```bat
cd server
copy .env.example .env
```

Edit `server\.env`, start MySQL, then run `npm install`, `npm run db:seed`, and `npm run dev`. Return to the project root in the first terminal and run `npm run dev`.

### Image storage deployment note

Local image uploads are intended for local development. The files live in `server/uploads/destinations`. Hosts with ephemeral filesystems (including many free web-service deployments) may erase these files during redeploys or restarts. Before production deployment, use a persistent disk or configure an object-storage/image CDN such as Cloudinary and set backups/retention. Never assume local uploads persist on a host that documents an ephemeral filesystem.

## Deploy on Railway

The repository includes separate Dockerfiles for the frontend and API. In Railway, create two services from this repository:

- Frontend service root directory: `/`. Add `VITE_API_URL` as a build variable with the API's public URL followed by `/api`, for example `https://your-api-domain.up.railway.app/api`. The frontend listens on Railway's injected `PORT` and serves client-side routes through Nginx.
- API service root directory: `/server`. Set its health check path to `/api/health` and add a persistent volume mounted at `/app/uploads` if users will upload CVs or destination photos.

For reliable refresh-cookie behavior, use custom frontend and API domains under the same registered domain (for example, `www.example.com` and `api.example.com`). Set `CLIENT_URL` to the exact frontend origin, including `https://`. The API database user must be allowed to create the configured database and tables, or the database must already exist with suitable privileges.

Set these API service variables in Railway:

```env
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.up.railway.app
FRONTEND_URL=https://your-frontend-domain.up.railway.app
DATABASE_HOST=your-mysql-host
DATABASE_PORT=3306
DATABASE_USER=your-mysql-user
DATABASE_PASSWORD=your-mysql-password
DATABASE_NAME=build_future_tourism
JWT_ACCESS_SECRET=<unique random secret, at least 32 characters>
JWT_REFRESH_SECRET=<different unique random secret, at least 32 characters>
SEED_ADMIN_EMAIL=admin@your-domain.example
SEED_ADMIN_PASSWORD=<unique strong admin password>
```

Use the database provider's host and credentials; the backend currently reads the separate `DATABASE_*` variables, not `DATABASE_URL`. Set `FLW_SECRET_KEY` and `FLW_REDIRECT_URL` only when enabling production Flutterwave checkout. Never put production secrets in this repository. After setting variables and deploying the API, run `npm run db:seed:prod` once from the API service to create the initial admin account and seed data. Verify the API at `/api/health` before using its URL in `VITE_API_URL`.
