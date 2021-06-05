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
  githubId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  creator: User;

  @Field()
  @Column('text', { nullable: true })
  avatarUrl: String;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
