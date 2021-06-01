import { User } from '../entities/User';
import { MyContext } from '../types';
import { Ctx, Query, Resolver } from 'type-graphql';

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
}
