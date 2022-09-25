import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrdersItemTable1663463498701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_items',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'price',
                        type: 'double precision',
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                    },
                    {
                        name: 'order_id',
                        type: 'uuid',
                    },
                ]
            })
        );

        await queryRunner.createForeignKey(
            'order_items',
            new TableForeignKey({
                name: 'order_items_product_id_fk',
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products'
            })
        );

        await queryRunner.createForeignKey(
            'order_items',
            new TableForeignKey({
                name: 'order_items_order_id_fk',
                columnNames: ['order_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'orders'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_items', 'order_items_product_id_fk');
        await queryRunner.dropForeignKey('order_items', 'order_items_order_id_fk');
        await queryRunner.dropTable('order_items');
    }
}
