import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { Question } from './Question';
import { Upvote } from './Upvote';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Column('text', { nullable: true })
  name: String;

  @Field()
  @PrimaryColumn('text', { unique: true })
  githubId: String;

  @Field()
  @Column('text', { nullable: true })
  avatarUrl: String;

  @OneToMany(() => Question, (question) => question.creator)
  questions: Question[];

  // field for comment
  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];

  // TODO: field for upvotes
  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @Field(() => String)
  @CreateDateColumn({ type: 'date' })
  createdAt: Date;
}
