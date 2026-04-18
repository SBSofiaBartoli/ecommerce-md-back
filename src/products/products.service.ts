import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/categories/entities/categories.entity";
import { Repository } from "typeorm";
import { Product } from "./entities/products.entity";
import { CreateProductDto } from "./dtos/product.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import { ProductColor } from "./entities/product-color.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductColor)
    private readonly colorsRepository: Repository<ProductColor>,
  ) {}

  private calcTotalStock(colors: { stock: number }[]): number {
    return colors.reduce((sum, c) => sum + c.stock, 0);
  }

  async getProducts(page: number, limit: number) {
    try {
      const [products, total] = await this.productsRepository.findAndCount({
        where: { isActive: true },
        relations: { category: true, colors: true },
        order: { name: "ASC" },
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        data: products,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    } catch (error) {
      throw new InternalServerErrorException("The products couldn't be loaded");
    }
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id, isActive: true },
      relations: {
        category: true,
        colors: true,
      },
    });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

  async getProductBySku(sku: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { sku, isActive: true },
      relations: { category: true, colors: true },
    });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const [skuExists, nameExists, category] = await Promise.all([
      this.productsRepository.findOneBy({ sku: dto.sku }),
      this.productsRepository.findOneBy({ name: dto.name }),
      this.categoriesRepository.findOneBy({ id: dto.categoryId }),
    ]);

    if (skuExists)
      throw new ConflictException(`SKU "${dto.sku}" is already in use`);
    if (nameExists)
      throw new ConflictException(
        `Product name "${dto.name}" is already in use`,
      );
    if (!category) throw new NotFoundException("Category not found");

    try {
      const { colors, categoryId, dimensions, ...rest } = dto;

      const product = this.productsRepository.create({
        ...rest,
        category,
        dimensions: dimensions ?? {},
        totalStock: this.calcTotalStock(colors),
      });
      const saved = await this.productsRepository.save(product);
      const colorEntities = colors.map((c) =>
        this.colorsRepository.create({ ...c, product: saved }),
      );
      await this.colorsRepository.save(colorEntities);

      return this.getProductById(saved.id);
    } catch (error) {
      throw new InternalServerErrorException("Error creating product");
    }
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { colors: true },
    });
    if (!product) throw new NotFoundException("ProductId not found");
    try {
      const { colors, categoryId, dimensions, ...rest } = data;
      if (categoryId) {
        const category = await this.categoriesRepository.findOneBy({
          id: categoryId,
        });
        if (!category) throw new NotFoundException("Category not found");
        product.category = category;
      }
      if (dimensions) {
        product.dimensions = { ...product.dimensions, ...dimensions };
      }
      if (colors) {
        await this.colorsRepository.delete({ product: { id } });
        const colorEntities = colors.map((c) =>
          this.colorsRepository.create({ ...c, product }),
        );
        await this.colorsRepository.save(colorEntities);
        rest["totalStock"] = this.calcTotalStock(colors);
      }
      Object.assign(product, rest);
      await this.productsRepository.save(product);
      return this.getProductById(id);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Product update error");
    }
  }

  async deleteProduct(id: string): Promise<{ id: string; message: string }> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new NotFoundException("ProductId not found");
    try {
      await this.productsRepository.softDelete(id);
      return { id, message: "Product deleted successfully" };
    } catch (error) {
      throw new InternalServerErrorException("Error deleting product");
    }
  }

  async restoreProduct(id: string): Promise<Product> {
    await this.productsRepository.restore(id);
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }
}
