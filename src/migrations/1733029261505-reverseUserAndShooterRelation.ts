import { MigrationInterface, QueryRunner } from "typeorm";

export class ReverseUserAndShooterRelation1733029261505
	implements MigrationInterface
{
	name = "ReverseUserAndShooterRelation1733029261505";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "shooter" DROP CONSTRAINT "FK_ac4e43d37f4f2839f6dfd387023"`,
		);
		await queryRunner.query(
			`ALTER TABLE "shooter" DROP CONSTRAINT "UQ_ac4e43d37f4f2839f6dfd387023"`,
		);
		await queryRunner.query(
			`ALTER TABLE "shooter" DROP COLUMN "belongsToUserId"`,
		);
		await queryRunner.query(`ALTER TABLE "user" ADD "shooterId" integer`);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "UQ_7b1518c41e2de87cbd4177d8822" UNIQUE ("shooterId")`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" ADD CONSTRAINT "FK_7b1518c41e2de87cbd4177d8822" FOREIGN KEY ("shooterId") REFERENCES "shooter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "FK_7b1518c41e2de87cbd4177d8822"`,
		);
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "UQ_7b1518c41e2de87cbd4177d8822"`,
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "shooterId"`);
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
}
