import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1593471058402 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('apointments', 'provider');
        await queryRunner.addColumn('apointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

        await queryRunner.createForeignKey('apointments', new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('apointment', 'AppointmentProvider');
        await queryRunner.dropColumn('apointments', 'provider_id');
        await queryRunner.addColumn('appointments', new TableColumn({
                name: 'provider',
                type: 'varchar',
        }))
    }

}
