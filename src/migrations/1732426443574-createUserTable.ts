import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1732426443574 implements MigrationInterface {
	name = "CreateUserTable1732426443574";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user" ("id" SERIAL NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "user"`);
	}
}
