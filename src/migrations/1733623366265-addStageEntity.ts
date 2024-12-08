import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStageEntity1733623366265 implements MigrationInterface {
	name = "AddStageEntity1733623366265";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "stage" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "noShooots" integer NOT NULL, "popper" integer NOT NULL, "walkthroughTime" integer NOT NULL, "briefing" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "designerId" integer, CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "paper_target" ("id" SERIAL NOT NULL, "requiredHits" integer NOT NULL, "stageId" integer, CONSTRAINT "PK_d5d1adc14fd5dacf51d070e6a01" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "stage" ADD CONSTRAINT "FK_6a67f94efb8b7c7fc0d98abf61a" FOREIGN KEY ("designerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "paper_target" ADD CONSTRAINT "FK_7e6b50e593726bed07755b65aa7" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "paper_target" DROP CONSTRAINT "FK_7e6b50e593726bed07755b65aa7"`,
		);
		await queryRunner.query(
			`ALTER TABLE "stage" DROP CONSTRAINT "FK_6a67f94efb8b7c7fc0d98abf61a"`,
		);
		await queryRunner.query(`DROP TABLE "paper_target"`);
		await queryRunner.query(`DROP TABLE "stage"`);
	}
}
