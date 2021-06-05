import 'dotenv-safe/config';
import { createConnection } from 'typeorm';
import { Question } from './entities/Question';
import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { QuestionResolver } from './resolvers/question';
import { MyContext } from './types';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { User } from './entities/User';
import { COOKIE_NAME, __prod__ } from './constants';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { UserResolver } from './resolvers/user';
import { Comment } from './entities/Comment';
import { Upvote } from './entities/Upvote';
import { createUserLoader } from './utils/createUserLoader';
import { createUpvoteLoader } from './utils/createUpvoteLoader';

const main = async () => {
  // command for generating tables: npx typeorm migration:generate -n Initial

  const conn = await createConnection({
    type: 'postgres',
    // url: process.env.DATABASE_URL,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // dropSchema: true,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Question, User, Comment, Upvote],
  });

  await conn.runMigrations();

  const app = express();

  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, //1 year
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__,
        // domain: undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  app.use(passport.initialize());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [QuestionResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      userLoader: createUserLoader(),
      upvoteLoader: createUpvoteLoader()
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  passport.serializeUser((user: any, done) => {
    done(null, user.accessToken);
  });

  passport.use(
    new GitHubStrategy(
      {
        // @ts-ignore
        clientID: process.env.GITHUB_CLIENT_ID,
        // @ts-ignore
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/github/callback',
      },
      async (_: any, __: any, profile: any, cb: any) => {
        console.log(profile);
        let user = await User.findOne({ where: { githubId: profile.id } });
        // console.log(profile.login);
        // console.log(profile.id);
        // console.log(profile.avatar_url);

        if (user) {
          user.name = profile.username;
          user.avatarUrl = profile.avatar_url;
          await user.save();
        } else {
          user = await User.create({
            name: profile.username,
            githubId: profile.id,
            avatarUrl: profile.photos[0].value,
          }).save();
        }

        cb(null, {
          accessToken: user.githubId,
        });
      }
    )
  );

  app.get('/auth/github', passport.authenticate('github', { session: false }));

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { session: true, failureRedirect: '/' }),
    (req: any, res) => {
      // Successful authentication, redirect home.
      const accessToken = req.user.accessToken;
      req.session.githubId = accessToken;
      res.redirect(`http://localhost:3000/`);
      // res.send('auth was successful')
      // res.send(req.user);
    }
  );

  app.listen(+process.env.PORT, () => {
    console.log('server started on port localhost:4000');
  });
};

main().catch((e) => {
  console.log(e);
});
