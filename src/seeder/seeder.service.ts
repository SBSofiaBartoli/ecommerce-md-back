import { Injectable, OnModuleInit } from "@nestjs/common";
import { CategoryService } from "src/categories/categories.service";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        private readonly categoriesService: CategoryService,
        private readonly productsService: ProductsService,
    ) {}

    async onModuleInit() {
        await this.categoriesService.seeder();
        await this.productsService.seeder();

        return 'Precarga completa';
    }
}
