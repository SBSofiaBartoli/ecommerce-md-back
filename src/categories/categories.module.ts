import { Module } from "@nestjs/common";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/categories.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService, TypeOrmModule],
})
export class CategoryModule {}
