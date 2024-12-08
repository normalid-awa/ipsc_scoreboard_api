import { MigrationInterface, QueryRunner } from "typeorm";

export class InvertCascadeStage1733655009554 implements MigrationInterface {
    name = 'InvertCascadeStage1733655009554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stage_attachment" DROP CONSTRAINT "FK_10785b96c21c074dc9ef1df0cc0"`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" DROP CONSTRAINT "FK_1b20ef841e44db3592662a27c69"`);
        await queryRunner.query(`ALTER TABLE "paper_target" DROP CONSTRAINT "FK_7e6b50e593726bed07755b65aa7"`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" ADD CONSTRAINT "FK_10785b96c21c074dc9ef1df0cc0" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" ADD CONSTRAINT "FK_1b20ef841e44db3592662a27c69" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paper_target" ADD CONSTRAINT "FK_7e6b50e593726bed07755b65aa7" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paper_target" DROP CONSTRAINT "FK_7e6b50e593726bed07755b65aa7"`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" DROP CONSTRAINT "FK_1b20ef841e44db3592662a27c69"`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" DROP CONSTRAINT "FK_10785b96c21c074dc9ef1df0cc0"`);
        await queryRunner.query(`ALTER TABLE "paper_target" ADD CONSTRAINT "FK_7e6b50e593726bed07755b65aa7" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" ADD CONSTRAINT "FK_1b20ef841e44db3592662a27c69" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stage_attachment" ADD CONSTRAINT "FK_10785b96c21c074dc9ef1df0cc0" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
