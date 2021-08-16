import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1629123007057 implements MigrationInterface {
    name = 'Initial1629123007057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "address" text`);
        await queryRunner.query(`ALTER TABLE "question" ADD "bountyAmount" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "bountyAmount"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "address"`);
    }

}
