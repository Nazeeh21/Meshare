import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

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
  githubId: string;

  @Field()
  @Column()
  questionId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
