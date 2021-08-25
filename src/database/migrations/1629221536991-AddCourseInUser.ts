import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCourseInUser1629221536991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
              name: "course_id",
              type: "uuid",
              isNullable: true,
            })
          );
    
    
          await queryRunner.createForeignKey('users', new TableForeignKey({
            name: 'UserCourseFk',
            columnNames: ['course_id'],
            referencedColumnNames:['id'],
            referencedTableName:'courses',
            onDelete:'CASCADE',
            onUpdate: 'CASCADE'
          }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users','course_id')
        await queryRunner.dropForeignKey('users','UserCourseFk' )
    }

}
