import { MigrationInterface, QueryRunner } from "typeorm";

export class JoinBelonngsUserColumnFromShooterEntity1733026666660
	implements MigrationInterface
{
	name = "JoinBelonngsUserColumnFromShooterEntity1733026666660";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "shooter" ADD "belongsToUserId" integer`,
		);
		await queryRunner.query(
			`ALTER TABLE "shooter" ADD CONSTRAINT "UQ_ac4e43d37f4f2839f6dfd387023" UNIQUE ("belongsToUserId")`,
		);
		await queryRunner.query(
			`ALTER TABLE "shooter" ADD CONSTRAINT "FK_ac4e43d37f4f2839f6dfd387023" FOREIGN KEY ("belongsToUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "shooter" DROP CONSTRAINT "FK_ac4e43d37f4f2839f6dfd387023"`,
		);
		await queryRunner.query(
			`ALTER TABLE "shooter" DROP CONSTRAINT "UQ_ac4e43d37f4f2839f6dfd387023"`,
		);
		await queryRunner.query(
			`ALTER TABLE "shooter" DROP COLUMN "belongsToUserId"`,
		);
	}
}
