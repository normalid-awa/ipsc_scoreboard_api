import { MigrationInterface, QueryRunner } from "typeorm";

export class Reinit1733654004171 implements MigrationInterface {
    name = 'Reinit1733654004171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shooter" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4697339e92d84886fd397458c69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "isSystemAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "shooterId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_7b1518c41e2de87cbd4177d882" UNIQUE ("shooterId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stage" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "noShooots" integer NOT NULL, "popper" integer NOT NULL, "walkthroughTime" integer NOT NULL, "briefing" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "designerId" integer, CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stage_attachment" ("id" SERIAL NOT NULL, "fileId" uuid, "stageId" integer, CONSTRAINT "PK_65320b01831c13713924a8f657f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paper_target" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "requiredHits" integer NOT NULL, "stageId" integer, CONSTRAINT "PK_d5d1adc14fd5dacf51d070e6a01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "REL_49a22109d0b97611c07768e37f" UNIQUE ("ownerId"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7b1518c41e2de87cbd4177d8822" FOREIGN KEY ("shooterId") REFERENCES "shooter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_34c5a7443f6f1ab14d73c5d0549" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage" ADD CONSTRAINT "FK_6a67f94efb8b7c7fc0d98abf61a" FOREIGN KEY ("designerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" ADD CONSTRAINT "FK_10785b96c21c074dc9ef1df0cc0" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" ADD CONSTRAINT "FK_1b20ef841e44db3592662a27c69" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paper_target" ADD CONSTRAINT "FK_7e6b50e593726bed07755b65aa7" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_49a22109d0b97611c07768e37f1" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_49a22109d0b97611c07768e37f1"`);
        await queryRunner.query(`ALTER TABLE "paper_target" DROP CONSTRAINT "FK_7e6b50e593726bed07755b65aa7"`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" DROP CONSTRAINT "FK_1b20ef841e44db3592662a27c69"`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" DROP CONSTRAINT "FK_10785b96c21c074dc9ef1df0cc0"`);
        await queryRunner.query(`ALTER TABLE "stage" DROP CONSTRAINT "FK_6a67f94efb8b7c7fc0d98abf61a"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_34c5a7443f6f1ab14d73c5d0549"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7b1518c41e2de87cbd4177d8822"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "paper_target"`);
        await queryRunner.query(`DROP TABLE "stage_attachment"`);
        await queryRunner.query(`DROP TABLE "stage"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "shooter"`);
    }

}
