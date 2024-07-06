import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDbSchema1720293559705 implements MigrationInterface {
    name = 'InitialDbSchema1720293559705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passkey" ("id" character varying NOT NULL, "name" character varying NOT NULL, "appUserId" character varying NOT NULL, "webAuthnUserId" character varying NOT NULL, "publicKey" character varying NOT NULL, "aaguid" character varying NOT NULL, "registeredAt" TIMESTAMP NOT NULL, "deviceType" character varying NOT NULL, "backedUp" boolean NOT NULL, "userVerified" boolean NOT NULL, "transports" character varying array NOT NULL, "userId" uuid, CONSTRAINT "PK_783e2060d8025abd6a6ca45d2c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email_verification_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "code" character varying NOT NULL, "expiresAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "PK_7fc72ac16aeeab466c48748221c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passkey_challenge" ("id" character varying NOT NULL, "appUserId" character varying, "webAuthnUserId" character varying, "type" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_aea61bf645973e49c770a7f4203" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "passkey" ADD CONSTRAINT "FK_c36f303905314ea9ead857b6268" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "email_verification_code" ADD CONSTRAINT "FK_cace043f9e8bee80c2dd5c66ccc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email_verification_code" DROP CONSTRAINT "FK_cace043f9e8bee80c2dd5c66ccc"`);
        await queryRunner.query(`ALTER TABLE "passkey" DROP CONSTRAINT "FK_c36f303905314ea9ead857b6268"`);
        await queryRunner.query(`DROP TABLE "passkey_challenge"`);
        await queryRunner.query(`DROP TABLE "email_verification_code"`);
        await queryRunner.query(`DROP TABLE "passkey"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
