import { Module } from "@nestjs/common";
import { CategoryModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { SeederService } from './seeder.service';

@Module({
    imports: [CategoryModule, ProductsModule],
    providers: [SeederService],
    exports: [SeederService]
})
export class SeederModule {}
