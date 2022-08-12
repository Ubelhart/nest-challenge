import { Injectable } from '@nestjs/common';
import { mariadb } from '../options/mariaDB';
import { Product } from '../interfaces/product.interface';
import knex from 'knex';
const db = knex(mariadb);

@Injectable()
export class ProductsService {
    async createIfNotExist() {
        try {
            await db.schema.createTable('products', (table) => {
                table.string('title');
                table.string('thumbnail');
                table.float('price');
                table.increments('id');
            });
            console.log('Table products created');
        } catch (error) {
            console.log(error);
        }
    }

    async getDataBaseProducts({ field, value }): Promise<Product[]> {
        await this.createIfNotExist();

        if (field && value) {
            try {
                return await db
                    .from('products')
                    .select('*')
                    .where(field, value);
            } catch (error) {
                console.log(error);
            }
        }

        try {
            return await db.from('products').select('*');
        } catch (error) {
            console.log(error);
        }
    }

    async insertProduct(data): Promise<Product> {
        try {
            const res: number[] = await db('products').insert({ ...data });
            return { id: res[0], ...data };
        } catch (error) {
            console.log(error);
        }
    }
}
