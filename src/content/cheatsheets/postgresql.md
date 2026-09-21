---
title: postgresql
description: Common SQL queries and commands for working with PostgreSQL databases and schemas.
updatedAt: 2026-09-20 20:06:04
groups:
  - title: User Authentication
    description: Commands for logging into PostgreSQL and managing sessions.
    items:
      - label: Login to PostgreSQL
        description: "Login using the `psql` cli."
        codeLang: "sh"
        code: "psql -U <username> -d <database_name>"
        example: "psql -U postgres -d my_database"
        comment: "Replace <username> with your PostgreSQL user and <database_name> with your desired database."
  - title: Permissions
    description: Commands for managing user roles and permissions in PostgreSQL.
    items:
      - label: Create a user
        description: "Creates a new user in PostgreSQL with a password."
        codeLang: "sql"
        code: "CREATE USER <username> WITH PASSWORD '<password>';"
        example: "CREATE USER john_doe WITH PASSWORD 'secret123';"
        comment: "Replace <username> with the PostgreSQL user and <password> with their password."
      - label: Grant privileges to a user
        description: "Grants specific permissions to a user on a database."
        codeLang: "sql"
        code: "GRANT <privilege_type> ON <table_name> TO <username>;"
        example: "GRANT SELECT ON users TO john_doe;"
        comment: "Replace <privilege_type> with desired permissions (e.g., SELECT, INSERT, UPDATE)."
      - label: Grant all privileges to a user
        description: "Grants all privileges on a database to a user."
        codeLang: "sql"
        code: "GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <username>;"
        example: "GRANT ALL PRIVILEGES ON DATABASE my_database TO john_doe;"
        comment: "This gives the user full control over the database."
      - label: Grant table privileges
        description: "Grants specific privileges on all tables in a schema."
        codeLang: "sql"
        code: "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA <schema_name> TO <username>;"
        example: "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO john_doe;"
        comment: "Replace public with the target schema if needed."
      - label: Grant role to a user
        description: "Assigns a role to a user."
        codeLang: "sql"
        code: "GRANT <role_name> TO <username>;"
        example: "GRANT db_admin TO john_doe;"
        comment: "This allows the user to inherit the granted role's privileges."
      - label: Revoke privileges from a user
        description: "Revokes specific permissions from a user."
        codeLang: "sql"
        code: "REVOKE <privilege_type> ON <table_name> FROM <username>;"
        example: "REVOKE SELECT ON users FROM john_doe;"
      - label: Drop a user
        description: "Deletes a user from PostgreSQL."
        codeLang: "sql"
        code: "DROP USER <username>;"
        example: "DROP USER john_doe;"
  - title: Database Management
    description: Commands related to database creation, deletion and listing.
    items:
      - label: Create a database
        description: "Creates a new database in PostgreSQL."
        codeLang: "sql"
        code: "CREATE DATABASE <database_name>;"
        example: "CREATE DATABASE my_database;"
        comment: "Ensure the database name is unique."
      - label: Drop a database
        description: "Deletes a database from PostgreSQL."
        codeLang: "sql"
        code: "DROP DATABASE <database_name>;"
        example: "DROP DATABASE my_database;"
        comment: "Be cautious, as this will permanently delete the database."
      - label: List all databases
        description: "Lists all databases in PostgreSQL."
        codeLang: "sh"
        code: "\\l"
        comment: "You can also use SELECT database_name FROM pg_database; for a more detailed output."
  - title: Schema Management
    description: Commands related to managing schemas in PostgreSQL.
    items:
      - label: Create a schema
        description: "Defines a new schema in the database."
        codeLang: "sql"
        code: "CREATE SCHEMA <schema_name>;"
        example: "CREATE SCHEMA analytics;"
        comment: "Schemas help organize database objects."
      - label: Drop a schema
        description: "Removes a schema and all objects within it."
        codeLang: "sql"
        code: "DROP SCHEMA <schema_name> CASCADE;"
        example: "DROP SCHEMA analytics CASCADE;"
        comment: "Use CASCADE to remove dependent objects."
  - title: Table Management
    description: Commands related to table creation, modification and deletion.
    items:
      - label: Create a table
        description: "Creates a new table in the database."
        codeLang: "sql"
        code: |
          CREATE TABLE <table_name> (
            id SERIAL PRIMARY KEY,
            column_name VARCHAR(100),
            created_at TIMESTAMP
          );
        example: |
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100),
            created_at TIMESTAMP
          );
        comment: "Ensure the column data types and constraints match your needs."
      - label: List all tables
        description: "Shows all tables in the current database."
        codeLang: "sh"
        code: "\\dt"
        comment: "You can also use SELECT * FROM information_schema.tables; for more info."
      - label: Drop a table
        description: "Deletes a table from the database."
        codeLang: "sql"
        code: "DROP TABLE <table_name>;"
        example: "DROP TABLE users;"
        comment: "This will permanently remove the table and its data."
  - title: Querying Data
    description: Commands for querying and manipulating data in PostgreSQL.
    items:
      - label: Select all table data
        description: "Retrieves all rows from a specific table."
        codeLang: "sql"
        code: "SELECT * FROM <table_name>;"
        example: "SELECT * FROM users;"
        comment: "Be cautious with large tables, as this may return a lot of data."
      - label: Select specific columns
        description: "Retrieves specific columns from a table."
        codeLang: "sql"
        code: "SELECT <column_name> FROM <table_name>;"
        example: "SELECT username, created_at FROM users;"
        comment: "Avoid using SELECT * unless necessary for performance reasons."
      - label: Insert table row
        description: "Inserts a new row of data into a table."
        codeLang: "sql"
        code: |
          INSERT INTO <table_name> (column_name, created_at)
          VALUES ('<value>', NOW());
        example: |
          INSERT INTO users (username, created_at)
          VALUES ('john_doe', NOW());
        comment: "Make sure values match the column data types."
      - label: Insert multiple rows
        description: "Inserts multiple rows in a single query."
        codeLang: "sql"
        code: |
          INSERT INTO <table_name> (column_name, created_at)
          VALUES
          ('<value_1>', NOW()),
          ('<value_2>', NOW());
        example: |
          INSERT INTO users (username, created_at)
          VALUES
          ('john_doe', NOW()),
          ('jane_smith', NOW());
        comment: "Efficient way to insert multiple records at once."
      - label: Update a table row
        description: "Modifies data in a specific row."
        codeLang: "sql"
        code: "UPDATE <table_name> SET <column_name> = '<value>' WHERE id = <id_value>;"
        example: "UPDATE users SET username = 'new_name' WHERE id = 1;"
        comment: "Ensure the WHERE clause is used to avoid updating all rows."
  - title: Indexing
    description: Commands for creating and managing indexes.
    items:
      - label: Create an index
        description: "Creates an index on a specific column to speed up queries."
        codeLang: "sql"
        code: "CREATE INDEX <index_name> ON <table_name> (<column_name>);"
        example: "CREATE INDEX idx_users_username ON users (username);"
        comment: "Indexes improve query performance but may slow down inserts/updates."
      - label: Drop an index
        description: "Deletes an index."
        codeLang: "sql"
        code: "DROP INDEX <index_name>;"
        example: "DROP INDEX idx_users_username;"
---
