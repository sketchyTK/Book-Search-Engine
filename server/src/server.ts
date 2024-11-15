import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import type { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 10000;
  const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
app.use(cors());
  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your client URL
}));
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
