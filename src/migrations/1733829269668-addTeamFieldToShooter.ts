import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeamFieldToShooter1733829269668 implements MigrationInterface {
    name = 'AddTeamFieldToShooter1733829269668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooter" ADD "teamId" integer`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD CONSTRAINT "FK_926ab95a189313baf02603e8c12" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooter" DROP CONSTRAINT "FK_926ab95a189313baf02603e8c12"`);
        await queryRunner.query(`ALTER TABLE "shooter" DROP COLUMN "teamId"`);
    }

}
