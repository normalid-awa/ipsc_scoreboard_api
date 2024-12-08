import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPathFieldToFileEntity1733644269157
	implements MigrationInterface
{
	name = "AddPathFieldToFileEntity1733644269157";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "files" ADD "path" character varying NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "path"`);
	}
}
