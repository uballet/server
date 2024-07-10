import { MigrationInterface, QueryRunner } from "typeorm";

export class StamperIdAndValue1720498935665 implements MigrationInterface {
    name = 'StamperIdAndValue1720498935665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stamper" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stamper" DROP CONSTRAINT "PK_3530404c5ef3fc4f84f60c8a78b"`);
        await queryRunner.query(`ALTER TABLE "stamper" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "stamper" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stamper" ADD CONSTRAINT "PK_3530404c5ef3fc4f84f60c8a78b" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stamper" DROP CONSTRAINT "PK_3530404c5ef3fc4f84f60c8a78b"`);
        await queryRunner.query(`ALTER TABLE "stamper" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "stamper" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stamper" ADD CONSTRAINT "PK_3530404c5ef3fc4f84f60c8a78b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "stamper" DROP COLUMN "value"`);
    }

}
