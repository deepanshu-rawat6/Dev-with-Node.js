# API-Design-in-Node.js

## Prisma

### Databases

A mechanism to store data in our disks. In order to store items in the DB, we are required to either write DB specific queries or some logic in the native API language to define models.

### Introduction to ORMs

Interacting with DB can be really challenging sometimes, so to reduce the complexity and extra efforts we use a ORM. ORM stands for **Object Relational Mapping**.

ORM reduce the complexity of defining models and schemas manually, and make it look like a function call.

### Introduction to Prisma

### Designing Schema

### Product Model

### Migrations

Let's say when we have to scale, and if we add some more functionalities or checks or new fields in our schema(for SQL databases), then we have to migrate our whole data accordingly to the new standards. Here, using prisma, we can use the ORM, `primsa/client`, an actual SDK to talk to the DB.

To run the migration:

```bash
npx prisma migrate dev --name init
```

Good practice: To name in order to save the migration, to be used by other team team members


## Routes and Middleware

## Middlewares

Using a module named `morgan`, which just logs out information. Also, we have to specify the type of logging we want. Here, we've used `dev` for logging

## Authentication

