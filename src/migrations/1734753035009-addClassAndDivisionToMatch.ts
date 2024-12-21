import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClassAndDivisionToMatch1734753035009 implements MigrationInterface {
    name = 'AddClassAndDivisionToMatch1734753035009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match_classification" ("id" SERIAL NOT NULL, "classification" character varying NOT NULL, "matchId" integer, CONSTRAINT "PK_733b8cd34b2d54b868c3d618875" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match_division" ("id" SERIAL NOT NULL, "division" character varying NOT NULL, "matchId" integer, CONSTRAINT "PK_22e877d847b794b8afa632a11fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD "classificationId" integer`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD "divisionId" integer`);
        await queryRunner.query(`ALTER TABLE "match_classification" ADD CONSTRAINT "FK_0e61e81d67494d809e6e682b2d1" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_division" ADD CONSTRAINT "FK_6ce74c79df6472f6118abd0b237" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD CONSTRAINT "FK_f7fa0a79951facdd9c4f14fd7a1" FOREIGN KEY ("classificationId") REFERENCES "match_classification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD CONSTRAINT "FK_8365c406f89fcbdcc65c1357a25" FOREIGN KEY ("divisionId") REFERENCES "match_division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP CONSTRAINT "FK_8365c406f89fcbdcc65c1357a25"`);
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP CONSTRAINT "FK_f7fa0a79951facdd9c4f14fd7a1"`);
        await queryRunner.query(`ALTER TABLE "match_division" DROP CONSTRAINT "FK_6ce74c79df6472f6118abd0b237"`);
        await queryRunner.query(`ALTER TABLE "match_classification" DROP CONSTRAINT "FK_0e61e81d67494d809e6e682b2d1"`);
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP COLUMN "divisionId"`);
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP COLUMN "classificationId"`);
        await queryRunner.query(`DROP TABLE "match_division"`);
        await queryRunner.query(`DROP TABLE "match_classification"`);
    }

}
