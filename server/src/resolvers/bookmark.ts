import { Bookmark } from '../entities/Bookmark';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
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

@ObjectType()
class PaginatedBookmarks {
  @Field(() => [Bookmark])
  bookmarks: Bookmark[];

  @Field()
  hasMore: Boolean;
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

  @Query(() => PaginatedBookmarks)
  @UseMiddleware(isAuth)
  async bookmarks(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedBookmarks> {
    const realLimit = Math.min(50, limit);

    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(+cursor));
    }
    const bookmarks = await getConnection().query(
      `
      select b.*
      from bookmark b
      where
      ${cursor ? ` q."createdAt" < $2 and` : ''}
      "githubId" = '${req.session.githubId}'
      order by b."createdAt" DESC
      limit $1
      `,
      replacements
    );
    return {
      bookmarks: bookmarks.slice(0, realLimit),
      hasMore: bookmarks.length === realLimitPlusOne,
    };
  }
}
