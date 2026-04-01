import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import data from '../data/data.json';
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/categories/entities/categories.entity";
import { Repository } from "typeorm";
import { Product } from "./entities/products.entity";
import { ProductDto } from "./dtos/product.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";

@Injectable()
export class ProductsService {
    constructor (
        @InjectRepository(Category) 
        private readonly categoriesRepository: Repository<Category>,
        @InjectRepository(Product) 
        private readonly productsRepository: Repository<Product>
    ) {};

    async seeder() {
        const categories: Category[] = await this.categoriesRepository.find();
        if (!categories) throw new NotFoundException('Categories not found');

        try {
            const products: Product[] = data.map(product => {
            const category: Category | undefined = categories.find(category => product.category === category.name);

            const newProduct = new Product();
            newProduct.name = product.name;
            newProduct.description = product.description;
            newProduct.price = product.price;
            newProduct.stock = product.stock;
            newProduct.imgUrl = product?.imgUrl;
            newProduct.category = category!;
            if (!newProduct) throw new NotFoundException('Product not found');

            return newProduct;
            })
            await this.productsRepository.upsert(products, ['name']);
            return 'Products added';
        } catch (error) {
            throw new InternalServerErrorException('Product loadinf error');
        }
    }

    async getProducts(page: number, limit: number) {
        try {
            let products = await this.productsRepository.find({
                relations: { category: true },
            });
            const start = (page -1) * limit;
            const end = start + limit;
            return (products.slice(start, end));
        } catch (error) {
            throw new InternalServerErrorException("The products couldn't be loaded");
        }
    }
    
    async getProductById(id: string) {
        const product =  await this.productsRepository.findOne({ 
            where: { id },
            relations: {
                category: true,
            }
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }
    
    async createProduct(product: ProductDto) {
        const category = await this.categoriesRepository.findOne({
        where: { id: product.categoryId },
        });
        if (!category) throw new NotFoundException('Category not found');

        try {
            const newProduct: Product = this.productsRepository.create({ ...product, category});
            return await this.productsRepository.save(newProduct);
        } catch (error) {
            throw new InternalServerErrorException('Error creating product');
        }
    }
    
    async updateProduct(id: string, data: UpdateProductDto) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) throw new NotFoundException('ProductId not found');
        try {
            await this.productsRepository.update({ id }, data);
            return await this.productsRepository.findOneBy({ id });
        } catch (error) {
            throw new InternalServerErrorException('Product update error');
        }
    }
    
    async deleteProduct(id: string) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) throw new NotFoundException('ProductId not found');
        try {
            await this.productsRepository.delete(id);
            return{ id, message: 'Product deleted successfully' };
        } catch (error) {
            throw new InternalServerErrorException('Error deleting product')
        }
    }
}
