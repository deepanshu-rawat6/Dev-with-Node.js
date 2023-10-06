# API-Design-in-Node.js

## Prisma

### Databases

A mechanism to store data in our disks. In order to store items in the DB, we are required to either write DB specific queries or some logic in the native API language to define models.

### Introduction to ORMs

Interacting with DB can be really challenging sometimes, so to reduce the complexity and extra efforts we use a ORM. ORM stands for **Object Relational Mapping**.

ORM reduce the complexity of defining models and schemas manually, and make it look like a function call.

### Introduction to Prisma

### Designing Schema

To get started with Prisma, using the following command: 

```bash
npx primsa init
```

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

### bcrypt

## Routes and Error Handlers

### Error Handlers

By default the handlers don't have next in the call stack. This means nothing was next the handlers and it was like a final destination for our route. But we can use `next` in handlers to handle error.

An example code snippet:

```js
app.get('/test-error', (req, res, next) => {
   setTimeout(() => {
    next(new Error('Test error'))
   }, 1)
})
```

Here, anything as of parameter of the `next()` would be treated as an error.

**Note** : Explore transactions

For using error handling in routes, we can't access directly to the error log in `server.ts` file. Because of the `router` being a subrouter of the `app`. So, to handle error we need to specify the error handler(or maybe middleware) reachable to the subrouter.

### Processes

Process in JS represents the current process in which we're in. This can be used to catch error in Node.js.

Example for using `Processes`:

```js
setTimeout(() => {
    throw new Error('oops')
}, 300)

process.on('uncaughtException', () => {

})

process.on('unhandledException', () => {
    
})
```

## Config, Performance, and Testing