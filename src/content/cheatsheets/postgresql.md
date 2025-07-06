---
title: postgresql
description: Common SQL queries and commands for working with PostgreSQL databases and schemas.
updatedAt: 2025-03-23 01:27:02
groups:
  - title: User Authentication
    description: Commands for logging into PostgreSQL and managing sessions.
    items:
      - label: Login to PostgreSQL
        description: Login using the `psql` cli.
        code: psql -U username -d database_name
        codeLang: sh
        comment: "Replace `username` with your PostgreSQL user and `database_name` with your desired database."
  - title: Permissions
    description: Commands for managing user roles and permissions in PostgreSQL.
    items:
      - label: Create a user
        description: Creates a new user in PostgreSQL with a password.
        code: CREATE USER username WITH PASSWORD 'password';
        codeLang: sql
        comment: "Replace `username` with the PostgreSQL user and `password` with their password."
      - label: Grant privileges to a user
        description: Grants specific permissions to a user on a database.
        code: GRANT privilege_type ON table_name TO username;
        codeLang: sql
        comment: "Replace `privilege_type` with desired permissions (e.g., SELECT, INSERT, UPDATE)."
      - label: Grant all privileges to a user
        description: Grants all privileges on a database to a user.
        code: GRANT ALL PRIVILEGES ON DATABASE database_name TO username;
        codeLang: sql
        comment: "This gives the user full control over the database."
      - label: Grant privileges on all tables in a schema
        description: Grants specific privileges on all tables in a schema.
        code: GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO username;
        codeLang: sql
        comment: "Replace `public` with the target schema if needed."
      - label: Grant role to another user
        description: Assigns a role to a user.
        code: GRANT role_name TO username;
        codeLang: sql
        comment: "This allows the user to inherit the granted role's privileges."
      - label: Revoke privileges from a user
        description: Revokes specific permissions from a user.
        code: REVOKE privilege_type ON table_name FROM username;
        codeLang: sql
      - label: Drop a user
        description: Deletes a user from PostgreSQL.
        code: DROP USER username;
        codeLang: sql
  - title: Database Management
    description: Commands related to database creation, deletion and listing.
    items:
      - label: Create a database
        description: Creates a new database in PostgreSQL.
        code: CREATE DATABASE database_name;
        codeLang: sql
        comment: "Ensure the database name is unique."
      - label: Drop a database
        description: Deletes a database from PostgreSQL.
        code: DROP DATABASE database_name;
        codeLang: sql
        comment: "Be cautious, as this will permanently delete the database."
      - label: List all databases
        description: Lists all databases in PostgreSQL.
        code: \l
        codeLang: sh
        comment: "You can also use `SELECT database_name FROM pg_database;` for a more detailed output."
  - title: Schema Management
    description: Commands related to managing schemas in PostgreSQL.
    items:
      - label: Create a schema
        description: Defines a new schema in the database.
        code: CREATE SCHEMA schema_name;
        codeLang: sql
        comment: "Schemas help organize database objects."
      - label: Drop a schema
        description: Removes a schema and all objects within it.
        code: DROP SCHEMA schema_name CASCADE;
        codeLang: sql
        comment: "Use `CASCADE` to remove dependent objects."
  - title: Table Management
    description: Commands related to table creation, modification and deletion.
    items:
      - label: Create a table
        description: Creates a new table in the database.
        code: |
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100),
            created_at TIMESTAMP
          );
        codeLang: sql
        comment: "Ensure the column data types and constraints match your needs."
      - label: List all tables
        description: Shows all tables in the current database.
        code: \dt
        codeLang: sh
        comment: "You can also use `SELECT * FROM information_schema.tables;` for more info."
      - label: Drop a table
        description: Deletes a table from the database.
        code: DROP TABLE users;
        codeLang: sql
        comment: "This will permanently remove the table and its data."
  - title: Querying Data
    description: Commands for querying and manipulating data in PostgreSQL.
    items:
      - label: Select all data from a table
        description: Retrieves all rows from a specific table.
        code: "SELECT * FROM users;"
        codeLang: sql
        comment: "Be cautious with large tables, as this may return a lot of data."
      - label: Select specific columns
        description: Retrieves specific columns from a table.
        code: "SELECT username, created_at FROM users;"
        codeLang: sql
        comment: "Avoid using `SELECT *` unless necessary for performance reasons."
      - label: Insert data into a table
        description: Inserts a new row of data into a table.
        code: |
          INSERT INTO users (username, created_at)
          VALUES ('john_doe', NOW());
        codeLang: sql
        comment: "Make sure values match the column data types."
      - label: Insert multiple rows
        description: Inserts multiple rows in a single query.
        code: |
          INSERT INTO users (username, created_at)
          VALUES
          ('john_doe', NOW()),
          ('jane_smith', NOW());
        codeLang: sql
        comment: "Efficient way to insert multiple records at once."
      - label: Update a row in a table
        description: Modifies data in a specific row.
        code: UPDATE users SET username = 'new_name' WHERE id = 1;
        codeLang: sql
        comment: "Ensure the WHERE clause is used to avoid updating all rows."
  - title: Indexing
    description: Commands for creating and managing indexes.
    items:
      - label: Create an index
        description: Creates an index on a specific column to speed up queries.
        code: CREATE INDEX index_name ON table_name (column_name);
        codeLang: sql
        comment: "Indexes improve query performance but may slow down inserts/updates."
      - label: Drop an index
        description: Deletes an index.
        code: DROP INDEX index_name;
        codeLang: sql
---
