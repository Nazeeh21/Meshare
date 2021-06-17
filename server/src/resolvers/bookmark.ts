import { Bookmark } from '../entities/Bookmark';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { Question } from '../entities/Question';

@InputType()
class BookmarkInput {
  @Field()
  questionId: number;
}

@Resolver(Bookmark)
export class BookmarkResolver {
  @FieldResolver(() => User)
  creator(@Root() bookmark: Bookmark, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(bookmark.githubId);
  }

  @FieldResolver(() => Question)
  question(@Root() bookmark: Bookmark, @Ctx() { questionLoader }: MyContext) {
    return questionLoader.load(bookmark.questionId);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createBookmark(
    @Arg('input') input: BookmarkInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { githubId } = req.session;

    const bookmark = await Bookmark.findOne({
      where: { questionId: input.questionId, githubId },
    });

    if (bookmark !== null && bookmark !== undefined) {
      await Bookmark.delete({ githubId, questionId: input.questionId });
      return true;
    }
    await Bookmark.create({ ...input, githubId }).save();
    return true;
  }

  @Query(() => [Bookmark])
  @UseMiddleware(isAuth)
  async bookmarks(@Ctx() { req }: MyContext): Promise<[Bookmark]> {
    const bookmarks = await getConnection().query(
      `
      select b.*
      from bookmark b
      where 
      "githubId" = '${req.session.githubId}'
      order by b."createdAt" ASC
      `
    );
    return bookmarks;
  }
}
