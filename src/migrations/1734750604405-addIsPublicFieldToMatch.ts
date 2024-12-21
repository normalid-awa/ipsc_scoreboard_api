import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsPublicFieldToMatch1734750604405 implements MigrationInterface {
    name = 'AddIsPublicFieldToMatch1734750604405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "isPublic" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "isPublic"`);
    }

}
