import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSystemAdminColumToUser1732629472943
	implements MigrationInterface
{
	name = "AddSystemAdminColumToUser1732629472943";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isSystemAdmin" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" DROP COLUMN "isSystemAdmin"`,
		);
	}
}
