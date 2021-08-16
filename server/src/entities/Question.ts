import { Field, Float, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  // UpdateDateColumn,
} from 'typeorm';
import { Upvote } from './Upvote';
import { User } from './User';
import {Comment} from './Comment'
import { Bookmark } from './Bookmark';

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
  text!: string;

  @Field()
  @Column()
  html!: string;

  @Field(() => [String])
  @Column("text", {nullable: true, array: true})
  tags!: string[];

  @Field(() => [String])
  @Column("text", {nullable: true, array: true})
  imageUrls: string[] | null;

  @Field(() => Float, {nullable: true})
  @Column({ type: "float", default: null})
  bountyAmount!: number | null;

  @Field(() => Int, {nullable: true})
  @Column({ type: 'int', default: null})
  answerId!: number | null;

  @Field(() => Comment, { nullable: true})
  @OneToOne(() => Comment, (comment) => comment.acceptedByQuestion)
  acceptedAnswer: Comment | null;

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null; // 1 or -1 or null

  @Field(() => Boolean, { defaultValue: false })
  bookmarkStatus: boolean;

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

  // Bookmark fields
  @Field(() => Bookmark, {nullable: true})
  @OneToMany(() => Bookmark, bookmark => bookmark.question)
  bookmarks: Bookmark;
}
