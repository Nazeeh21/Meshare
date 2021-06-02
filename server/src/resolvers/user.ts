import { User } from '../entities/User';
import { MyContext } from '../types';
import { Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { COOKIE_NAME } from '../constants';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  getUser(@Ctx() { req }: MyContext) {
    const githubId = req.session.githubId;
    console.log('githubId: ', githubId);
    
    // you are not logged in
    if (!githubId) {
      return null;
    }

    return User.findOne({ where: { githubId } });
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        res.clearCookie(COOKIE_NAME);
        resolve(true);
        return;
      })
    );
  }
}
