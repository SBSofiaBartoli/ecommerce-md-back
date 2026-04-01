import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../categories/entities/categories.entity";
import { OrderDetail } from "../../orders/entities/orderDetails.entity";

@Entity({
    name: 'products',
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'int', nullable: false })
    stock: number;

    @Column({
        type: 'text',
        nullable: true,
        default: 'https://via.placeholder.com/300',
    })
    imgUrl?: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id'})
    category: Category;

    @ManyToMany(() => OrderDetail, (detail) => detail.products)
    orderDetail: OrderDetail[];
}
