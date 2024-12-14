import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTeamToClubAndAddMatchEntity1734151793290 implements MigrationInterface {
    name = 'RenameTeamToClubAndAddMatchEntity1734151793290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooter" DROP CONSTRAINT "FK_926ab95a189313baf02603e8c12"`);
        await queryRunner.query(`ALTER TABLE "shooter" RENAME COLUMN "teamId" TO "clubId"`);
        await queryRunner.query(`CREATE TABLE "club" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "REL_ba3d31fd5c7bc1c7839ac87e25" UNIQUE ("ownerId"), CONSTRAINT "PK_79282481e036a6e0b180afa38aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying, "date" date NOT NULL, "location" point NOT NULL, "finished" boolean NOT NULL DEFAULT false, "sport" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "hostClubId" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match_stage" ("id" SERIAL NOT NULL, "matchId" integer, "stageId" integer, CONSTRAINT "PK_873d0b9da9a0f032d00fbfb89c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match_shooter" ("id" SERIAL NOT NULL, "matchId" integer, "shooterId" integer, CONSTRAINT "PK_55221f417bf004bef66c2db79d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "club" ADD CONSTRAINT "FK_ba3d31fd5c7bc1c7839ac87e25b" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD CONSTRAINT "FK_c2756a5e72aae407404ede32cb4" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_3c99dc076bbde0d40ba8c49ecce" FOREIGN KEY ("hostClubId") REFERENCES "club"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_stage" ADD CONSTRAINT "FK_e31f213ac952eb124fe47cf3949" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_stage" ADD CONSTRAINT "FK_7d948479e48bdd07cc26eadbe1a" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD CONSTRAINT "FK_b7824d9aa5f1e118d97f6b2ce6e" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_shooter" ADD CONSTRAINT "FK_298114b788079694dd673821fe6" FOREIGN KEY ("shooterId") REFERENCES "shooter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP CONSTRAINT "FK_298114b788079694dd673821fe6"`);
        await queryRunner.query(`ALTER TABLE "match_shooter" DROP CONSTRAINT "FK_b7824d9aa5f1e118d97f6b2ce6e"`);
        await queryRunner.query(`ALTER TABLE "match_stage" DROP CONSTRAINT "FK_7d948479e48bdd07cc26eadbe1a"`);
        await queryRunner.query(`ALTER TABLE "match_stage" DROP CONSTRAINT "FK_e31f213ac952eb124fe47cf3949"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_3c99dc076bbde0d40ba8c49ecce"`);
        await queryRunner.query(`ALTER TABLE "shooter" DROP CONSTRAINT "FK_c2756a5e72aae407404ede32cb4"`);
        await queryRunner.query(`ALTER TABLE "club" DROP CONSTRAINT "FK_ba3d31fd5c7bc1c7839ac87e25b"`);
        await queryRunner.query(`DROP TABLE "match_shooter"`);
        await queryRunner.query(`DROP TABLE "match_stage"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TABLE "club"`);
        await queryRunner.query(`ALTER TABLE "shooter" RENAME COLUMN "clubId" TO "teamId"`);
        await queryRunner.query(`ALTER TABLE "shooter" ADD CONSTRAINT "FK_926ab95a189313baf02603e8c12" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
