import { Question } from '../entities/Question';
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
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { isAuth } from '../middleware/isAuth';
import { Upvote } from '../entities/Upvote';
import { User } from '../entities/User';
import { Comment } from '../entities/Comment';

@InputType()
class QuestionInput {
  @Field()
  text: string;

  @Field()
  html: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  imageUrls: string[];
}

@ObjectType()
class PaginatedQuestions {
  @Field(() => [Question])
  questions: Question[];

  @Field()
  hasMore: Boolean;
}

@Resolver(Question)
export class QuestionResolver {
  @FieldResolver(() => User)
  creator(@Root() question: Question, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(question.githubId);
  }

  @FieldResolver(() => Comment, { nullable: true })
  acceptedAnswer(
    @Root() question: Question,
    @Ctx() { commentLoader }: MyContext
  ) {
    if (!question.answerId) {
      return null;
    }
    return commentLoader.load(question.answerId);
  }

  @FieldResolver(() => Int)
  async voteStatus(
    @Root() question: Question,
    @Ctx() { upvoteLoader, req }: MyContext
  ) {
    if (!req.session.githubId) {
      return null;
    }

    const upvote = await upvoteLoader.load({
      questionId: question.id,
      githubId: req.session.githubId,
    });

    return upvote ? upvote.value : null;
  }

  @FieldResolver(() => Boolean)
  async bookmarkStatus(
    @Root() question: Question,
    @Ctx() { bookmarkLoader, req }: MyContext
  ) {
    if (!req.session.githubId) {
      return null;
    }

    const bookmark = await bookmarkLoader.load({
      questionId: question.id,
      githubId: req.session.githubId,
    });

    return bookmark ? true : false;
  }

  @Mutation(() => Question)
  @UseMiddleware(isAuth)
  async createQuestion(
    @Arg('input') input: QuestionInput,
    @Ctx() { req }: MyContext
  ): Promise<Question> {
    return Question.create({ ...input, githubId: req.session.githubId }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async acceptAnswer(
    @Arg('questionId', () => Int) questionId: number,
    @Arg('answerId', () => Int) answerId: number,
    @Ctx() { req }: MyContext
  ) {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Question)
        .set({ answerId })
        .where('id = :id and "githubId" = :githubId', {
          id: questionId,
          githubId: req.session.githubId,
        })
        .returning('*')
        .execute();

      await getConnection()
        .createQueryBuilder()
        .update(Comment)
        .set({ isAccepted: true })
        .where('id = :id and "githubId" = :githubId', {
          id: answerId,
          githubId: req.session.githubId,
        })
        .returning('*')
        .execute();
    } catch (e) {
      throw new Error(e);
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('questionId', () => Int) questionId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpvote = value !== -1;

    const realValue = isUpvote ? 1 : -1;

    const { githubId } = req.session;

    const upvote = await Upvote.findOne({ where: { questionId, githubId } });

    if (upvote && upvote.value === realValue) {
      // the user has has upvoted on the question before and they want to undo their vote
      await Upvote.delete({ githubId, questionId });

      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update question
          set points = points - $1
          where id = $2
          `,
          [upvote.value, questionId]
        );
      });
    } else if (upvote && upvote.value !== realValue) {
      // the user has voted on the question before and they are changing their vote
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          update upvote
          set value = $1
          where "questionId" = $2 and "githubId" = $3
          `,
          [realValue, questionId, githubId]
        );

        await tm.query(
          `
          update question
          set points = points + $1
          where id = $2
          `,
          [2 * realValue, questionId]
        );
      });
    } else if (!upvote) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into upvote ("githubId", "questionId", value)
          values ($1, $2, $3)
          `,
          [githubId, questionId, realValue]
        );

        await tm.query(
          `
          update question 
          set points = points + $1
          where id = $2
          `,
          [realValue, questionId]
        );
      });
    }
    return true;
  }

  @Query(() => PaginatedQuestions)
  async questions(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedQuestions> {
    const realLimit = Math.min(50, limit);

    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(+cursor));
    }

    const questions = await getConnection().query(
      `
      select q.*
      from question q
      ${cursor ? `where q."createdAt" < $2` : ''}
      order by q."createdAt" DESC
      limit $1
      `,
      replacements
    );

    return {
      questions: questions.slice(0, realLimit),
      hasMore: questions.length === realLimitPlusOne,
    };
  }

  @Query(() => Question, { nullable: true })
  question(
    @Arg('id', () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Question | undefined> {
    // console.log('session: ', req.session)
    const githubId = req.session.githubId;
    console.log('github Id: ', req.session);
    if (!githubId) {
      throw new Error('not authenticated');
    }
    return Question.findOne(id);
  }
}
