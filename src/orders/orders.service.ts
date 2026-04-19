import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/products/entities/products.entity";
import { User } from "src/users/entities/users.entity";
import { DataSource, Repository } from "typeorm";
import { CreateOrderDto } from "./dtos/order.dto";
import { OrderDetail } from "./entities/orderDetails.entity";
import { Order } from "./entities/orders.entity";
import { ProductColor } from "src/products/entities/product-color.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductColor)
    private readonly colorRepository: Repository<ProductColor>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  async addOrder(orderDto: CreateOrderDto): Promise<Order> {
    const user: User | null = await this.userRepository.findOneBy({
      id: orderDto.userId,
    });
    if (!user) throw new NotFoundException("User not found");

    //transaction to guarantee stock consistency
    return this.dataSource.transaction(async (manager) => {
      let total = 0;
      const products: Product[] = [];

      for (const item of orderDto.items) {
        const product = await manager.findOne(Product, {
          where: { id: item.productId, isActive: true },
        });
        if (!product)
          throw new NotFoundException(`Product ${item.productId} not found`);

        const color = await manager.findOne(ProductColor, {
          where: { id: item.colorId, product: { id: item.productId } },
        });
        if (!color)
          throw new NotFoundException(
            `Color ${item.colorId} not found for product "${product.name}"`,
          );

        if (color.stock < item.quantity)
          throw new BadRequestException(
            `Insufficient stock for "${product.name}" in color "${color.name}". ` +
              `Available: ${color.stock}, requested: ${item.quantity}`,
          );

        // Discount color stock and update product totalStock
        await manager.decrement(
          ProductColor,
          { id: color.id },
          "stock",
          item.quantity,
        );
        await manager.decrement(
          Product,
          { id: product.id },
          "totalStock",
          item.quantity,
        );

        total += Number(product.price) * item.quantity;

        // Add product once per unit for the ManyToMany relation
        for (let i = 0; i < item.quantity; i++) {
          products.push(product);
        }
      }

      const order = manager.create(Order, {
        user,
        date: new Date(),
      });
      const savedOrder = await manager.save(Order, order);

      const detail = manager.create(OrderDetail, {
        price: Number(total.toFixed(2)),
        products,
        order: savedOrder,
      });
      await manager.save(OrderDetail, detail);

      return manager.findOne(Order, {
        where: { id: savedOrder.id },
        relations: {
          orderDetails: { products: { colors: true, category: true } },
        },
      }) as Promise<Order>;
    });
  }

  async getOrder(id: string) {
    try {
      const order: Order | null = await this.orderRepository.findOne({
        where: { id },
        relations: {
          users: true,
          orderDetails: {
            products: { colors: true, category: true },
          },
        },
      });
      if (!order) throw new NotFoundException("Order not found");
      const { password, ...userWithoutPassword } = order.users as any;
      (order as any).user = userWithoutPassword;
      return order;
    } catch (error) {
      throw new InternalServerErrorException("The order couldn't be loaded");
    }
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException("User not found");

    return this.orderRepository.find({
      where: { users: { id: userId } },
      relations: { orderDetails: { products: true } },
      order: { date: "DESC" },
    });
  }
}
