import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/categories.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find({
      order: { name: "ASC" },
    });
    if (!categories.length) throw new NotFoundException("Categories not found");
    return categories;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: { products: true },
    });
    if (!category) throw new NotFoundException("Category not found");
    return category;
  }

  async addCategories(category: CategoryDto): Promise<Category> {
    const exists = await this.categoriesRepository.findOneBy({
      name: category.name,
    });
    if (exists)
      throw new ConflictException(`Category "${category.name}" already exists`);
    try {
      const newCategory = this.categoriesRepository.create(category);
      return await this.categoriesRepository.save(newCategory);
    } catch (error) {
      throw new InternalServerErrorException("Error creating category");
    }
  }

  async updateCategory(
    id: string,
    dto: Partial<CategoryDto>,
  ): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) throw new NotFoundException("Category not found");
    try {
      await this.categoriesRepository.update(id, dto);
      return this.categoriesRepository.findOneBy({ id }) as Promise<Category>;
    } catch {
      throw new InternalServerErrorException("Error updating category");
    }
  }

  async deleteCategory(id: string): Promise<{ id: string; message: string }> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) throw new NotFoundException("Category not found");
    await this.categoriesRepository.delete(id);
    return { id, message: "Category deleted successfully" };
  }
}
