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
2. [Setup for localhost](#setup)
3. [Scripts](#scripts)
4. [Environment Variables](#environment-variables)
5. [Contributing](#contributing)
6. [License](#license)

## Requirements

- Node.js (LTS version recommended)
- npm or yarn
- PostgreSQL database (AWS RDS recommended)
- Docker (optional, for deployment)

## Setup for localhost

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
- Duplicate .env.template and set it as .env in the root directory
- Comment the section called 'AWS RDS' and uncomment the section 'CONTAINER IN LOCALHOST'

4. **Create the docker image with postgres and a database**:
- Run the following command: 

    ```bash
    docker compose up -d
    ```

5. **Run the Prisma commands**:
- Run the following commands in order to generate the database

    ```bash
    npx prisma migrate dev --name init
    ```

6. **Run the application**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Scripts

- **npm run dev**: Starts the server in development mode with hot reload.
- **npm run build**: Builds the TypeScript project.
- **npm run start**: Starts the server in production mode.
- **npm run test**: Starts the unit tests.
- **npm run test:watch**: Starts the unit tests in watch mode.
- **npm run test:coverage**: Starts the unit tests with coverage.

## Environment Variables

| Variable      | Description                      | Example                                |
|---------------|----------------------------------|----------------------------------------|
| `POSTGRES_URL`| Connection string for PostgreSQL DB | `postgresql://user:pass@host:port/dbname` |
| `PORT`| Port for the server | `8080`    
| `POSTGRES_USER`| User for PostgreSQL DB | `userdb` |
| `POSTGRES_DB`| Name of the PostgreSQL DB | `mydbname` 
| `POSTGRES_PORT`| Port for PostgreSQL DB | `5432` |
| `POSTGRES_PASSWORD`| Password of the PostgreSQL DB | `abc123` 
| `NODE_ENV`| Mode of the env | `production` |
| `JWT_SECRET`| The secret for JWT | `0ee80b6f3bd822ef3238c5` 
| `JWT_EXPIRES_IN`| Life time of the token | `1h` |
| `REQUIRED_FIELDS_GET_FLIGHTS`| Required fields for Get Flights | `identification` 
| `REQUIRED_FIELDS_LOGIN`| Required fields for Login | `identification,password` |
| `REQUIRED_FIELDS_HASH`| Required fields for Hashing | `password` 

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.