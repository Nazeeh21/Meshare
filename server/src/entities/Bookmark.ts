import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@ObjectType()
@Entity()
export class Bookmark extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number; // string is also supported

  @Field(() => Question)
  @ManyToOne(() => Question, question => question.bookmarks, {
    onDelete: 'CASCADE'
  })
  question: Question;

  @Field()
  @Column()
  questionId: number;

  @Field()
  @Column()
  githubId: string;


  @Field(() => User)
  @ManyToOne(() => User, user => user.bookmarks)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}    