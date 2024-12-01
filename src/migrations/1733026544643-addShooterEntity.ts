import { MigrationInterface, QueryRunner } from "typeorm";

export class AddShooterEntity1733026544643 implements MigrationInterface {
    name = 'AddShooterEntity1733026544643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shooter" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4697339e92d84886fd397458c69" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shooter"`);
    }

}
