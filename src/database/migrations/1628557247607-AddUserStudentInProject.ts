import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddUserStudentInProject1628557247607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        "projects",
        new TableColumn({
          name: "student_id",
          type: "uuid",
          isNullable: true,
        })
      );


      await queryRunner.createForeignKey('projects', new TableForeignKey({
        name: 'ProjectStudentFk',
        columnNames: ['student_id'],
        referencedColumnNames:['id'],
        referencedTableName:'student',
        onDelete:'SET NULL',
        onUpdate: 'CASCADE'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('projects','student_id')
      await queryRunner.dropForeignKey('projects','ProjectStudentFk' )
    }

}
