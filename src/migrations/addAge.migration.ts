// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class AddAgeColumn1764194858800 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     // query Runer me permite ejecutar sql
//     await queryRunner.query('ALTER TABLE "USERS" ADD COLUMN age integer;');
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query('ALTER TABLE "USERS" DROP COLUMN age');
//   }
// }