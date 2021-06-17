import { Bookmark } from "../entities/Bookmark";
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { getConnection } from "typeorm";
import { User } from "../entities/User";

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

  @Mutation(() => Bookmark)
  @UseMiddleware(isAuth)
  async createBookmark(
    @Arg('input') input: BookmarkInput,
    @Ctx() { req }: MyContext
  ): Promise<Bookmark> {
    return Bookmark.create({ ...input, githubId: req.session.githubId }).save();
  }

  @Query(() => [Bookmark])
  async bookmarks(
    @Ctx() {req}: MyContext
  ): Promise<Bookmark[]> {
    const bookmarks = await getConnection().query(
      `
      select b.*
      from bookmark b
      where 
      "githubId" = ${req.session.githubId}
      order by b."createdAt" ASC
      `
    )

    return bookmarks
  }
}