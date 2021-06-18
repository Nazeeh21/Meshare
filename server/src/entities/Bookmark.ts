import { Field, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Question } from "./Question";

@ObjectType()
@Entity()
export class Bookmark extends BaseEntity {
  @Field(() => Question)
  @ManyToOne(() => Question, question => question.bookmarks, {
    onDelete: 'CASCADE'
  })
  question: Question;
  
  @Field()
  @PrimaryColumn()
  questionId: number;

  @Field()
  @PrimaryColumn()
  githubId: string;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}    