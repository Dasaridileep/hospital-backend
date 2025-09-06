Healthcare Backend API
This project is a robust backend system for a healthcare management application, built with Node.js, Express.js, and Prisma. It provides a secure, RESTful API for managing user authentication, patient records, doctor records, and the relationships between them. The data is stored in a PostgreSQL database.

This project was developed as a Node.js implementation of the requirements outlined in the original Django-based assignment.

Features
Secure User Authentication: User registration and login functionality using JSON Web Tokens (JWT) for secure, stateless authentication.

Patient Record Management: Authenticated users can perform full CRUD (Create, Read, Update, Delete) operations on their own patient records.

Doctor Record Management: Authenticated users can add, update, and delete doctor records, while all users can view the list of doctors.

Patient-Doctor Mapping: Functionality to assign doctors to patients and manage these relationships.

Input Validation: All incoming request data is validated to ensure data integrity and prevent common errors.

Centralized Error Handling: A robust error-handling middleware provides consistent error responses and logging.

Technology Stack
Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Prisma

Authentication: JSON Web Tokens (jsonwebtoken), bcryptjs for password hashing

Validation: Joi

Development: nodemon for automatic server restarts, dotenv for environment variable management
