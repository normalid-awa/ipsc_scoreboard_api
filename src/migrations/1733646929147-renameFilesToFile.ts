import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameFilesToFile1733646929147 implements MigrationInterface {
	name = "RenameFilesToFile1733646929147";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "file" ADD CONSTRAINT "FK_34c5a7443f6f1ab14d73c5d0549" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "file" DROP CONSTRAINT "FK_34c5a7443f6f1ab14d73c5d0549"`,
		);
		await queryRunner.query(`DROP TABLE "file"`);
	}
}
