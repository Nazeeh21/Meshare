import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@Entity()
export class Upvote extends BaseEntity {

  @Column({type: 'int'})
  value: number;

  @PrimaryColumn()
  githubId: number;

  @ManyToOne(() => User, user => user.upvotes)
  user: User;

  @PrimaryColumn()
  questionId: number;

  @ManyToOne(() => Question, question => question.upvotes, {
    onDelete: 'CASCADE'
  })
  question: Question
}
