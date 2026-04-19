import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/products.entity";
import { Category } from "src/categories/entities/categories.entity";
import { ProductColor } from "./entities/product-color.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductColor, Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
