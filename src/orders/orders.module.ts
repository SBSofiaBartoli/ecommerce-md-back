import { Module } from "@nestjs/common";
import { OrderController } from "./orders.controller";
import { OrderService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/users.entity";
import { Order } from "./entities/orders.entity";
import { OrderDetail } from "./entities/orderDetails.entity";
import { Product } from "src/products/entities/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Order, OrderDetail, Product])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
