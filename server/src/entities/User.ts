import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Column("text", { nullable: true})
  name: String;

  @Field()
  @PrimaryColumn("text", {unique: true})
  githubId: String;

  @Field()
  @Column("text", { nullable: true})
  avatarUrl: String;
}