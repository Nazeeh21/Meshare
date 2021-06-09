import { Comment } from '../entities/Comment';
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
import { User } from '../entities/User';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { isAuth } from '../middleware/isAuth';
import { Question } from '../entities/Question';

@InputType()
class CommentInput {
  @Field()
  text: string;
}

@ObjectType()
class PaginatedComments {
  @Field(() => [Comment])
  comments: Comment[];

  @Field()
  hasMore: boolean;
}

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => User)
  creator(@Root() comment: Comment, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(comment.githubId);
  }

  @Query(() => PaginatedComments)
  async comments(
    @Arg('questionId', () => Int) questionId: number,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedComments> {
    const realLimit = Math.min(50, limit);

    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(+cursor));
    }

    const comments = await getConnection().query(
      `
      select c.*
      from comment c
      where 
      ${cursor ? `c."createdAt" < $2 and` : ''}
      "questionId" = ${questionId}
      order by c."createdAt" ASC
      limit $1
      `, replacements
    )

    return {
      comments: comments.slice(0, realLimit),
      hasMore: comments.length === realLimitPlusOne
    }
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg('input') input: CommentInput,
    @Arg('questionId', () => Int) questionId: number,
    @Ctx() {req} : MyContext
  ): Promise<Comment | null> {
    const question = await Question.find({ where: {id: questionId}})

    if(question.length === 0) {
      console.log('--------------question does not exist of might got deleted-------------------');  
      return null;
    }

    console.log('--------------creating comments-------------------');

    return Comment.create({
      ...input,
      githubId: req.session.githubId,
      questionId,
    }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Comment.delete({ id, githubId: req.session.githubId });
    return true;
  }
}
