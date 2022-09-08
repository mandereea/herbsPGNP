//The GraphQL context is an object which is shared across all the resolvers, 
// the GraphQL server creates and destroys a new instance between each request.
// To create a context open the api/db.ts file.

import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();