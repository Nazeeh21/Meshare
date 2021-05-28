import { Question } from "../entities/Question";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";

@InputType()
class QuestionInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
@Resolver(Question)
export class QuestionResolver {
  @Query(() => Question, {nullable: true})
  question(@Arg('id', () => Int) id: number): Promise<Question | undefined> {
    return Question.findOne(id);
  }

  @Mutation(() => Question)
  async createQuestion(@Arg('input') input: QuestionInput,
  // @ts-ignore
  @Ctx() {req}: MyContext): Promise<Question> {
    return Question.create({...input, creatorId: 1}).save();
  }
}