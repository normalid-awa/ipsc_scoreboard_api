import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSportEnum1733835168040 implements MigrationInterface {
    name = 'UpdateSportEnum1733835168040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooter" DROP COLUMN "sport"`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD "sport" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooter" DROP COLUMN "sport"`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD "sport" integer NOT NULL`);
    }

}
