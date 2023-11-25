User-Order - user data and order management (Node.js Express application with TypeScript)

<h1>Instructions to setup project locally</h1>

- Step 1: clone the repository <code>https://github.com/WakilMahmud/user-order.git</code>
- Step 2: Install the required Node.js packages using npm: <code>npm install</code>
- Step 3: Build the project: <code>npm run build</code>
- Step 4: Create a .env file in root:

```env
NODE_ENV=development
PORT=<port number>
DATABASE_URL=mongodb+srv://<admin>:<password>@cluster0.hgdpfd2.mongodb.net/user-order?retryWrites=true&w=majority
BCRYPT_SALT_ROUNDS=<salt round number>
```

- Step 5: Run the application: <code>npm run start:dev</code>
