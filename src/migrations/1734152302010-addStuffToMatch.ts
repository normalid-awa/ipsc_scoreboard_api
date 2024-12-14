import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStuffToMatch1734152302010 implements MigrationInterface {
    name = 'AddStuffToMatch1734152302010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_stage" DROP CONSTRAINT "FK_e31f213ac952eb124fe47cf3949"`);
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP CONSTRAINT "FK_b7824d9aa5f1e118d97f6b2ce6e"`);
        await queryRunner.query(`CREATE TABLE "match_stuff" ("id" SERIAL NOT NULL, "position" character varying NOT NULL, "matchId" integer, "userId" integer, CONSTRAINT "PK_cc2cb3beba83afbe369d01b9539" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match_stage" ADD CONSTRAINT "FK_e31f213ac952eb124fe47cf3949" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD CONSTRAINT "FK_b7824d9aa5f1e118d97f6b2ce6e" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_stuff" ADD CONSTRAINT "FK_9eecfd135b5f33e073ee0bc30da" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_stuff" ADD CONSTRAINT "FK_ae04659dfaf9edc8a0ca75b3103" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_stuff" DROP CONSTRAINT "FK_ae04659dfaf9edc8a0ca75b3103"`);
        await queryRunner.query(`ALTER TABLE "match_stuff" DROP CONSTRAINT "FK_9eecfd135b5f33e073ee0bc30da"`);
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP CONSTRAINT "FK_b7824d9aa5f1e118d97f6b2ce6e"`);
        await queryRunner.query(`ALTER TABLE "match_stage" DROP CONSTRAINT "FK_e31f213ac952eb124fe47cf3949"`);
        await queryRunner.query(`DROP TABLE "match_stuff"`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD CONSTRAINT "FK_b7824d9aa5f1e118d97f6b2ce6e" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_stage" ADD CONSTRAINT "FK_e31f213ac952eb124fe47cf3949" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
