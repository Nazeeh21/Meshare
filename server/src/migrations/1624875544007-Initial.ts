import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1624875544007 implements MigrationInterface {
    name = 'Initial1624875544007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "html" character varying NOT NULL, "githubId" character varying NOT NULL, "questionId" integer NOT NULL, "isAccepted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorGithubId" text, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("name" text, "githubId" text NOT NULL, "avatarUrl" text, "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_0d84cc6a830f0e4ebbfcd6381dd" PRIMARY KEY ("githubId"))`);
        await queryRunner.query(`CREATE TABLE "upvote" ("value" integer NOT NULL, "githubId" integer NOT NULL, "questionId" integer NOT NULL, "userGithubId" text, CONSTRAINT "PK_18b2dc1db36a5f8b084ea82cedf" PRIMARY KEY ("githubId", "questionId"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "html" character varying NOT NULL, "tags" text array, "imageUrls" text array, "answerId" integer, "points" integer NOT NULL DEFAULT '0', "githubId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorGithubId" text, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmark" ("questionId" integer NOT NULL, "githubId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_99ebfb3e1c018d23b4a6569355f" PRIMARY KEY ("questionId", "githubId"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c1ec8acc87fe2a931ca06145703" FOREIGN KEY ("creatorGithubId") REFERENCES "user"("githubId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upvote" ADD CONSTRAINT "FK_f2a523fa71a6a26b34a16c4ac41" FOREIGN KEY ("userGithubId") REFERENCES "user"("githubId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upvote" ADD CONSTRAINT "FK_4afb966c43854a24bbec5d9bcfd" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_aa06f3d3f6ade0797e89acb27d6" FOREIGN KEY ("creatorGithubId") REFERENCES "user"("githubId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_74dc299f65fd243ff96fa84276f" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_74dc299f65fd243ff96fa84276f"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_aa06f3d3f6ade0797e89acb27d6"`);
        await queryRunner.query(`ALTER TABLE "upvote" DROP CONSTRAINT "FK_4afb966c43854a24bbec5d9bcfd"`);
        await queryRunner.query(`ALTER TABLE "upvote" DROP CONSTRAINT "FK_f2a523fa71a6a26b34a16c4ac41"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c1ec8acc87fe2a931ca06145703"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "upvote"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
