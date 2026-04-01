import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity";
import { Product } from "../../products/entities/products.entity";

@Entity({
    name: 'order-details'
})
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToOne(() => Order, (order) => order.orderDetails)
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetail)
    @JoinTable({ name: 'order_details_products' })
    products: Product[];
}
