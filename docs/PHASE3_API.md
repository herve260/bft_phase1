# Phase 3 Feature API Quick Reference

## Auth

`POST /api/auth/register`

```json
{"name":"Jane Doe","email":"jane@example.com","phone":"0780000000","password":"StrongPass123!"}
```

`POST /api/auth/login`

```json
{"email":"jane@example.com","password":"StrongPass123!"}
```

The response returns a short-lived access token. The refresh token is stored in an HttpOnly cookie and rotated through `POST /api/auth/refresh`.

`POST /api/auth/logout` clears/revokes the refresh token.

`GET /api/auth/me` requires `Authorization: Bearer <accessToken>`.

## Internship application

`POST /api/internships/:id/apply`

Authenticated multipart/form-data fields:

- `fullName`
- `email`
- `phone`
- `school`
- `course`
- `level`
- `coverLetter`
- `cv` (PDF/DOC/DOCX, max 5MB)

The CV is stored by the backend and the URL is stored with the application. A user cannot submit the same internship twice.

`GET /api/applications/me`

Returns the authenticated user's applications and statuses.

## Training

`GET /api/training`

`GET /api/training/:id`

`POST /api/training/:id/register` requires authentication.

`GET /api/training/registrations/me` requires authentication.

## Notifications

`GET /api/notifications` requires authentication.

`PATCH /api/notifications/:id/read` marks a notification as read.

Applications and training registrations automatically create in-app notifications. Optional email delivery is enabled when SMTP variables are configured.

## Admin

All `/api/admin/*` endpoints require an access token and role `ADMIN` or `SUPER_ADMIN`.

- `GET /api/admin/dashboard`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`
- `GET/POST /api/admin/destinations`
- `PUT/DELETE /api/admin/destinations/:id`
- `GET/POST /api/admin/internships`
- `PUT/DELETE /api/admin/internships/:id`
- `GET /api/admin/applications`
- `PATCH /api/admin/applications/:id/status`
- `GET/POST /api/admin/training`
- `PUT/DELETE /api/admin/training/:id`
- `GET /api/admin/training/registrations`
- `PATCH /api/admin/training/registrations/:id/status`

Important admin mutations create audit-log records.

## Local setup order

1. Create `build_future_tourism` in MySQL.
2. Copy `server/.env.example` to `server/.env`.
3. Set JWT secrets, MySQL credentials and a new seed-admin password.
4. From `server/`, run `npm install`.
5. Do not run Prisma commands; this version uses mysql2 directly.
6. Run `npm run db:migrate`.
7. Run `npm run db:seed`.
8. Run `npm run dev`.
9. Use Swagger at `http://localhost:5000/api/docs`.
