import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageEntity1733624379025 implements MigrationInterface {
	name = "AddImageEntity1733624379025";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "image" ADD CONSTRAINT "FK_132fcc8d44e719a21ac7a372c33" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "image" DROP CONSTRAINT "FK_132fcc8d44e719a21ac7a372c33"`,
		);
		await queryRunner.query(`DROP TABLE "image"`);
	}
}
