import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameImageEntityToFileEntity1733643646899
	implements MigrationInterface
{
	name = "RenameImageEntityToFileEntity1733643646899";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "files" ADD CONSTRAINT "FK_a23484d1055e34d75b25f616792" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "files" DROP CONSTRAINT "FK_a23484d1055e34d75b25f616792"`,
		);
		await queryRunner.query(`DROP TABLE "files"`);
	}
}
