import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../../categories/entities/categories.entity";
import { OrderDetail } from "../../orders/entities/orderDetails.entity";
import { Dimensions } from "./dimensions.embedded";
import { ProductColor } from "./product-color.entity";

export enum LeatherType {
  FULL_GRAIN = "full_grain", // Cuero flor entera - máxima calidad
  TOP_GRAIN = "top_grain", // Cuero nobuck/corregido
  NUBUCK = "nubuck",
  SUEDE = "suede",
}

@Entity({
  name: "products",
})
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 20, nullable: false, unique: true })
  sku: string;

  @Index()
  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  careInstructions: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: "int", default: 0 })
  totalStock: number;

  @Column({
    type: "enum",
    enum: LeatherType,
    default: LeatherType.FULL_GRAIN,
  })
  leatherType: LeatherType;

  @Column({
    type: "text",
    nullable: true,
    default: "https://via.placeholder.com/300",
  })
  imgUrl?: string;

  @Column({ type: "text", array: true, default: () => "'{}'", nullable: true })
  gallery: string[];

  @Column(() => Dimensions)
  dimensions: Dimensions;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToMany(() => OrderDetail, (detail) => detail.products)
  orderDetail: OrderDetail[];

  @OneToMany(() => ProductColor, (color) => color.product, {
    cascade: true,
    eager: true,
  })
  colors: ProductColor[];
}
