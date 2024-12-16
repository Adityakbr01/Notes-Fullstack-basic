# Ebook Management System

A MERN stack application for managing ebooks.

## Table of Contents

* [Overview](#overview)
* [Technologies Used](#technologies-used)
* [Endpoints](#endpoints)
* [Database Schema](#database-schema)
* [Authentication](#authentication)
* [Deployment](#deployment)
* [Getting Started](#getting-started)
* [Contributing](#contributing)

## Overview

This application allows users to upload, manage, and view ebooks. It is built using the MERN stack (MongoDB, Express, React, Node.js).

## Technologies Used

* Frontend:
	+ React
	+ Redux tool kit (for state management)
	+ React Router (for client-side routing)
* Backend:
	+ Node.js
	+ Express.js (as the web framework)
	+ MongoDB (as the database)
	+ Mongoose (as the ORM for MongoDB)
* Authentication:
	+ JSON Web Tokens (JWT) for authentication

## Endpoints

### Ebook Endpoints

* `POST /ebooks/add`: Creates a new ebook
* `GET /ebooks`: Retrieves a list of all ebooks
* `GET /ebooks/:id`: Retrieves a single ebook by ID
* `PUT /ebooks/:id`: Updates an existing ebook
* `DELETE /ebooks/:id`: Deletes an ebook

### User Endpoints

* `POST /register`: Creates a new user
* `POST /login`: Logs in an existing user
* `GET /profile`: Retrieves the current user's profile
* `GET /logout`: Logs out the current user

### Other Endpoints

* `GET /`: Retrieves the homepage
* `GET /detail/:id`: Retrieves a detailed page for an ebook

## Database Schema

The database schema is defined in `Backend/src/models/EbookModels.js` and `Backend/src/models/UserModel.js`. The ebook schema has the following fields:

* `name`: String
* `image`: String
* `pdfFile`: String
* `description`: String
* `language`: String
* `price`: Number

The user schema has the following fields:

* `name`: String
* `email`: String
* `password`: String

## Authentication

The application uses JSON Web Tokens (JWT) for authentication. When a user logs in, a JWT token is generated and sent to the client. The client then sends this token in the `Authorization` header of subsequent requests to authenticate the user.

## Deployment

The deployment process is not specified in this README, but it's likely that the application is deployed on a cloud platform or using a containerization tool like Docker.

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository: `git clone https://github.com/Adityakbr01/Notes-Fullstack-basic.git`
2. Install dependencies: `npm install`
3. Start the backend: `npm start`
4. Start the frontend: `npm start` (in a separate terminal window)
5. Open the application in your browser: `http://localhost:3000`
