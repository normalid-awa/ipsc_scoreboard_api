import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveLocationFromMatch1734154870119 implements MigrationInterface {
    name = 'RemoveLocationFromMatch1734154870119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "location"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "location" point NOT NULL`);
    }

}
