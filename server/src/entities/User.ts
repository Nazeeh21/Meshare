import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column("text", { nullable: true})
  name: String;

  @PrimaryColumn("text", {unique: true})
  githubId: String;

  @Column("text", { nullable: true})
  avatarUrl: String;
}