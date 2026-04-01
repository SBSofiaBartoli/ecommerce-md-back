import { User } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderDetails.entity";

@Entity({
    name: 'orders',
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "date"})
    date: Date;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id'})
    users: User;

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    @JoinColumn({ name: 'order_detail_id'})
    orderDetails: OrderDetail;
}
