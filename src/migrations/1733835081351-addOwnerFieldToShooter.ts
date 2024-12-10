import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOwnerFieldToShooter1733835081351 implements MigrationInterface {
    name = 'AddOwnerFieldToShooter1733835081351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7b1518c41e2de87cbd4177d8822"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_7b1518c41e2de87cbd4177d882"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "shooterId"`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD "sport" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD CONSTRAINT "FK_4d19e8dcdcb6c127a8054ff8bae" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooter" DROP CONSTRAINT "FK_4d19e8dcdcb6c127a8054ff8bae"`);
        await queryRunner.query(`ALTER TABLE "shooter" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "shooter" DROP COLUMN "sport"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "shooterId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_7b1518c41e2de87cbd4177d882" UNIQUE ("shooterId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7b1518c41e2de87cbd4177d8822" FOREIGN KEY ("shooterId") REFERENCES "shooter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
