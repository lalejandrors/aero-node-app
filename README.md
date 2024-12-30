# Aero Node App API

This is a REST API about info of flights built with Node.js, Express, and TypeScript, connected to a PostgreSQL database hosted on AWS. Prisma ORM is used for database management.

## Features

- **TypeScript**: Ensures type safety and better code maintainability.
- **Express**: Handles routing and middleware.
- **Prisma**: Simplifies database interactions.
- **AWS RDS PostgreSQL**: Relational database for persistent storage.
- **Docker**: Containerized deployment (optional).

## Table of Contents

1. [Requirements](#requirements)
2. [Setup](#setup)
3. [Scripts](#scripts)
4. [Environment Variables](#environment-variables)
5. [Database Management](#database-management)
6. [Project Structure](#project-structure)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

## Requirements

- Node.js (LTS version recommended)
- npm or yarn
- PostgreSQL database (AWS RDS recommended)
- Docker (optional, for deployment)

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lalejandrors/aero-node-app.git
   cd your-repo-name
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a .env file in the root directory and add the following variables:

   ```env
   DATABASE_URL=postgresql://username:password@aws-instance-url:port/dbname
   PORT=3000
   ```

4. **Run the application**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Scripts

- **npm run dev**: Starts the server in development mode with hot reload.
- **npm run build**: Builds the TypeScript project.
- **npm start**: Starts the server in production mode.
- **npm run prisma:generate**: Generates Prisma client.
- **npm run prisma:migrate**: Applies migrations.

## Environment Variables

| Variable      | Description                      | Example                                |
|---------------|----------------------------------|----------------------------------------|
| `DATABASE_URL`| Connection string for PostgreSQL DB | `postgresql://user:pass@host:port/dbname` |
| `PORT`        | Port for the server              | `3000`    

## Database management

1. **Generate Prisma Client:**:

   ```bash
   npx prisma generate
   ```

2. **Run Migrations:**:

   ```bash
   npx prisma migrate deploy
   ```

3. **Access Prisma Studio (Optional GUI for database):**:

   ```bash
   npx prisma studio
   ```

## Deployment

1. **Build the Project:**:

   ```bash
   npm run build
   ```

2. **Deploy to AWS Lambda with Docker:**:
   Ensure the Dockerfile is correctly configured, then build and push your Docker image:

   ```bash
   docker build -t your-image-name .
   docker push your-docker-repo/your-image-name
   ```

   Update your AWS Lambda function to use the new image.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.