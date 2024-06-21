import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationV11719220037932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          CREATE TABLE person
          (
              id           SERIAL NOT NULL PRIMARY KEY,
              last_name    TEXT   NOT NULL,
              phone_number TEXT   NOT NULL,
              location     TEXT   NOT NULL
          );
          INSERT INTO person (last_name, phone_number, location)
          VALUES ('Bob', '0609052403', 'Paris'),
                 ('Doe', '0687134508', 'Lyon');
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE person;');
  }
}
