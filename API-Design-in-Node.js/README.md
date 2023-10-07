# API-Design-in-Node.js

### Access API L1 at: https://simple-crud-api-urht.onrender.com/ 
### Access API L2 at: https://excited-erin-cow.cyclic.app/

## Structure

Making API in Node.js can be overwhelming, but following a clean stucture can help in doing so:

1. Create a basic server using express in `index.ts` and `server.ts`
2. Have setup the ORM, `prisma` in this case
3. Make the **skeleton** of the required routes, along with the **middleware** required between routes and the handlers functions
4. Making the user auth on a seperate route for sign up for the user, also make a route for signin for the user.
5. Make the `protect` middleware, for all the routes requiring the user to be *authenticated* or maybe *authorized* 
6. Completing the routes, with `validation` checks using another middleware.
7. Debug and adding error handlers for the handlers function, such that if they throw an error, our server doesn't crashes.
8. Making a `dev`, `prod` and `testing` profiles to quickly switch between these modes.
9. Writing units and integration tests
10. Finally, deployment!!!

## Modules

### Typescript, ts node

```bash
npm i typescript ts-node @types/node prisma --save-dev
```

### Prisma

```bash
```

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

```ts
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

### Performance management with async

#### Blocking code

Blocking code can be a usual piece of code with heavy load or longer execution time, keeping the section of code unreachable.

Example of a blocking code:

```js
const me = 'deepanshu'
console.log(me)
```

A better example could be a heavy computation, maybe a maths algorithm, some sort of file operation

```js
const fs = require('fs');
const path = require('path');   

const result = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');

console.log(result)
```

Now, to resolve this issue we can have an `async` way to handling the blocking code

```js
const fs = require('fs/promises');
const path = require('path');   

const read = async () => {
    const result = fs.readFile(path.join(__dirname, '../package.json'), 'utf8');
    return result;  
}

read().then(f => console.log(f));

console.log('start');
```

### Tests

#### Setup

For the setup of our unit tests and integration tests, we need to install some of the packages:

```bash
npm i supertest @types/supertest jest @types/jest ts-jest
```

Now, we have create a config file for jest using:

```bash
npx ts-jest config:init
```

#### Defination: Unit Tests

Unit Test is all about testing the individual pieces of logic independently from each other. Now, before writing a unit test, we need to check whether our code is testable or not:

##### Non-Testable Code

```js
const value = 100;
const action = () => {
    console.log(value)
};
```

Here, is the version of a non-testable code. It's non-testable because of:

1. Not being exported, so we can't really refernce this function
2. Depending on a variable outside it's scope, it creates a closure.

##### Testable Code

```js
export const action = (value) => {
    console.log(value)
};
```

#### Sample Unit Test

Create a `__tests__` folder in root of the folder structure or in the module we can we to test the files. And then, create a `<something>.test.ts` file for the package/module to be tested. 

**Note**: For unit testing we have used `jest`
 
For example, we test the `user.ts` in the `./src/handlers/` directory.

```ts
describe('user handler', () => {
    it('it should do something when something happens', () => {
        expect(1).toBe(1);
    })
});

// Test Suite: user handler
// Tests: it section
```

#### Integration Tests

Integration test would how the multiple uints are summing up, whether its okay or something's wrong.

#### Sample Integration Test

Create a `__tests__` folder in the root of the `src` directory. Then similarly, create a `<something>.test.ts` file for the package/module to be tested.

**Note**: For integration testing we have used `supertest`

For example, we test the a route for `GET /`:

```ts
import app from '../server';
import supertest from 'supertest';

describe('GET /', () => {
    it('should send back some data', async () => {
        const res = await supertest(app).get('/');

        expect(res.body.message).toBe('hello');
    })
})
```

#### Customized Unit Testing

Let's test for creating a user, from the `user.ts` file. In the `test/it` section we made a **callback** which we create a newUser using the `createNewUser` function which requires a **req,res,next**. In order to have these parameters, we can either mock these out the respone, by using `spys`.

A spy is a mocked piece of functionality that will tell that some other peice of code interacted with it.

The example unit test:

```ts
import * as user from '../user';

describe('user handler', () => {
    it('should create a new user', async () => {
        const req = {
            body: {
                username: 'test',
                password: 'test',
                email: 'test@abc.com',
            }
        }
        const res = {
            json({ token }) {
                console.log(token)
                expect(token).toBeTruthy()
            }
        }

        await user.createNewUser(req, res, () => { });
    })
})
```

## Deployment

For the deployment, we need some changes in our `package.json` file. Like, in the **development** mode, we used `ts-node` which uses a overhead memory to run the `ts` files, but in production we need no overload on our resources beacuse of additional costs and requirement of high spec machine. In order to do so we need to convert our `ts` files to `js` files. 

Here are the scripts we need to add in the `package.json`:

```json
"scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js" //OR we can use this variant: nodemon -L dist/index.js
}
```

In order to compile the `ts` files, we need to update our `tsconfig.json` file, with:

```json
{
    "compilerOptions": {
      "sourceMap": true,
      "outDir": "./dist",
      "rootDir": "./src",
      "strict": false,
      "lib": ["esnext"],
      "esModuleInterop": true,
      "declaration": true
    },
    "include": ["src/**/*.ts", "src/blocking.js"],
    "exclude": ["node_modules"]
  }
  
```