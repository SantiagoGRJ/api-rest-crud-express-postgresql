# API REST CRUD with Express and PostgreSQL

This project is an API REST implementation using PostgreSQL as the database, Express (version 5) as the web framework, and TypeScript for type safety. It also includes Zod for schema validation and `pg-promise` for database interaction.

## Features
- CRUD operations for managing resources.
- PostgreSQL database integration.
- Input validation using Zod.
- Authentication and password hashing with `jsonwebtoken` and `bcrypt`.
- Rate limiting for enhanced security.

## Prerequisites
- Node.js (>= 16.x)
- PostgreSQL (>= 13.x)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SantiagoGRJ/api-rest-crud-express-postgresql.git
   cd api-rest-crud-express-postgresql
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your PostgreSQL credentials and other configurations.

4. Set up the database:
   - Create a PostgreSQL database.
   - Import the `DB.sql` file into your database:
     ```bash
     psql -U <username> -d <database_name> -f DB.sql
     ```

## Running the Application

### Development Mode
To run the application in development mode with hot-reloading:
```bash
npm run dev
```

### Production Mode
To build and start the application in production mode:
```bash
npm run build
npm start
```

## Scripts
- `npm run dev`: Starts the application in development mode.
- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm start`: Runs the compiled JavaScript code in production mode.

## Dependencies
- `express`: Web framework for Node.js.
- `pg-promise`: PostgreSQL client for Node.js.
- `zod`: Schema validation.
- `bcrypt`: Password hashing.
- `jsonwebtoken`: Token-based authentication.

## Dev Dependencies
- `typescript`: TypeScript compiler.
- `ts-node-dev`: Development server with hot-reloading.
- `dotenv`: Environment variable management.

## License
This project is licensed under the ISC License.

---

Feel free to contribute or report issues in the repository.