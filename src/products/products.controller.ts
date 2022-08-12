import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from 'src/interfaces/product.interface';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Post()
    async createProduct(
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        const product = await this.productsService.insertProduct(
            createProductDto,
        );
        return product;
    }

    @Get()
    async getProducts(): Promise<Product[]> {
        const products = await this.productsService.getDataBaseProducts(null);
        return products;
    }
}
