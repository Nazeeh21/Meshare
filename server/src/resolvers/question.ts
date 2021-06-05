import { Question } from '../entities/Question';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { isAuth } from '../middleware/isAuth';

@InputType()
class QuestionInput {
  @Field()
  title: string;

  @Field()
  description: string;

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
  
  @Mutation(() => Question)
  @UseMiddleware(isAuth)
  async createQuestion(
    @Arg('input') input: QuestionInput,
    @Ctx() { req }: MyContext
  ): Promise<Question> {
    return Question.create({ ...input, githubId: req.session.githubId }).save();
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
      ${cursor ? `where p."createdAt" < $2` : ''}
      order by p."createdAt" DESC
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
