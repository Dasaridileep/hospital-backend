Healthcare Backend API

A backend system for a healthcare management application, built with Node.js, Express.js, and Prisma.
It provides a secure RESTful API for managing users, patients, doctors, and their relationships, with data stored in PostgreSQL.

Features
Authentication: User registration & login with JWT and password hashing using bcryptjs.

Patient Records: Full CRUD operations, scoped to authenticated users.

Doctor Records: Authenticated users can manage doctor records; all users can view doctors.

Patient–Doctor Mapping: Assign and manage doctors for patients.

Validation: Input validation with Joi.

Error Handling: Centralized middleware for consistent error responses.

Tech Stack
Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Prisma

Auth: JWT, bcryptjs

Validation: Joi
