import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/products.entity";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dtos/order.dto";
import { OrderDetail } from "./entities/orderDetails.entity";
import { Order } from "./entities/orders.entity";

@Injectable()
export class OrderService {
    constructor (
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) {}

    async addOrder(orderDto: CreateOrderDto) {
        const user: User | null = await this.userRepository.findOneBy({ id: orderDto.userId });
        if (!user) throw new NotFoundException('User not found');
        if (!orderDto.products || orderDto.products.length === 0) throw new BadRequestException('The order cannot be empty');

        const order: Order = new Order();
        order.date = new Date();
        order.users = user;
        const newOrder = await this.orderRepository.save(order);
        
        let total = 0;
        const productsArray: Product[] = await Promise.all(
            orderDto.products.map(async (item) => {
                const product: Product | null = await this.productRepository.findOne({ where: { id: item?.id }});
                if (!product) throw new NotFoundException('Product not found');

                if(product.stock <= 0) throw new BadRequestException('Product out of stock')

                total += Number(product.price);

                await this.productRepository.update(
                    { id: product.id },
                    { stock: product.stock - 1 },
                );

                return product;
            }),
        );
        const orderDetail = new OrderDetail();
        orderDetail.price = Number(total.toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.orderDetailRepository.save(orderDetail);
        
        return await this.orderRepository.find({
            where: { id: newOrder.id},
            relations: { orderDetails: true },
        });
    }

    async getOrder(id: string) {
        try {
            const order: Order | null = await this.orderRepository.findOne({
            where: { id },
            relations: { 
                orderDetails: {
                    products: true,
                }},
            });
            if (!order) throw new NotFoundException('Order not found');
            return order;
        } catch (error) {
            throw new InternalServerErrorException("The order couldn't be loaded");
        }
    }
}
