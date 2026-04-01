import { Rol } from "src/common/enum/roles.enum";
import { Order } from "../../orders/entities/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false, })
    name: string;
    
    @Column({ 
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    password: string;

    @Column('text')
    address: string;

    @Column({ type: 'bigint' })
    phone: number;

    @Column({ type: 'varchar', length: 50, })
    country: string;

    @Column({ type: 'varchar', length: 50, })
    city: string;

    @Column({
        type: 'enum',
        enum : Rol,
        default: Rol.User,
        nullable: true,
    })
    isAdmin: Rol;

    @OneToMany(() => Order, (order) => order.users)
    orders: Order[];
}
