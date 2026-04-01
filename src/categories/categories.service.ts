import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import data from '../data/data.json';
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/categories.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
    constructor (@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) {};

    seeder() {
        const categoriesMap: Set<string> = new Set(data.map(product => product.category));
        const categoriesArray: string[] = Array.from(categoriesMap);
        const categories = categoriesArray.map(category => ({ name: category, }));
        this.categoriesRepository.upsert(categories, ['name']);
        return 'Categories added';
    }

    async getCategories() {
        try {
            const categories = await this.categoriesRepository.find();
            if (!categories) throw new NotFoundException('Categories not found');
            return categories;
        } catch (error) {
            throw new InternalServerErrorException('Error loeading categories');
        }
        
    };

    async addCategories(category: CategoryDto) {
        try {
            const newCategory: Category = this.categoriesRepository.create({ ...category});
            return await this.categoriesRepository.save(newCategory);
        } catch (error) {
            throw new InternalServerErrorException('Error creating category');
        }
    }
}
