import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  // UpdateDateColumn,
} from 'typeorm';
import { Upvote } from './Upvote';
import { User } from './User';

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number; // string is also supported

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => [String])
  @Column("text", {nullable: true, array: true})
  tags!: string[];

  @Field(() => [String])
  @Column("text", {nullable: true, array: true})
  imageUrls: string[] | null;

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; // 1 or -1 or null

  @Field()
  @Column()
  githubId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.questions)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // TODO: To add upvotes field
  @OneToMany(() => Upvote, (upvote) => upvote.question)
  upvotes: Upvote[];


}
