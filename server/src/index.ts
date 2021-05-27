import 'dotenv-safe/config';
import 'dotenv-safe/config';
import { createConnection } from 'typeorm';
import { Question } from './entities/Question';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { QuestionResolver } from './resolvers/question';
import { MyContext } from './types';

const main = async () => {
  // command for generating tables: npx typeorm migration:generate -n Initial

  const conn = await createConnection({
    type: 'postgres',
    // url: process.env.DATABASE_URL,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Question],
  });

  await conn.runMigrations();

  // await Post.delete({})

  const app = express();

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [QuestionResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(+process.env.PORT, () => {
    console.log('server started on port localhost:4000');
  });
};

main().catch((e) => {
  console.log(e);
});
