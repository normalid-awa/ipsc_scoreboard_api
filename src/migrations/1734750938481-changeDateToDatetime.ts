import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDateToDatetime1734750938481 implements MigrationInterface {
    name = 'ChangeDateToDatetime1734750938481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "date" date NOT NULL`);
    }

}
