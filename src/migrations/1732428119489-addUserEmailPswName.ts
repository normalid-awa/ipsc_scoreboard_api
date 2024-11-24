import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEmailPswName1732428119489 implements MigrationInterface {
    name = 'AddUserEmailPswName1732428119489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashedPassword" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashedPassword"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
