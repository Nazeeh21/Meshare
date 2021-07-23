import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  html!: string;

  @Field()
  @Column()
  githubId: string;

  @Field()
  @Column()
  questionId: number;

  @Field(() => String, {nullable: true})
  @Column({ type: "text", default: null})
  address!: string | null;

  @Field()
  @Column({ type: "boolean", default: false })
  isAccepted: boolean;

  @Field(() => Question, { nullable: true })
  @OneToOne(() => Question, (question) => question.acceptedAnswer)
  acceptedByQuestion: Question | null;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
