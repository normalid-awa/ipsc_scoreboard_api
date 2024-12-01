import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeamsEntity1733060370924 implements MigrationInterface {
	name = "AddTeamsEntity1733060370924";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "REL_49a22109d0b97611c07768e37f" UNIQUE ("ownerId"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "team" ADD CONSTRAINT "FK_49a22109d0b97611c07768e37f1" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE SET NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "team" DROP CONSTRAINT "FK_49a22109d0b97611c07768e37f1"`,
		);
		await queryRunner.query(`DROP TABLE "team"`);
	}
}
