import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./products.entity";

@Entity({ name: "product_colors" })
export class ProductColor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  hexCode: string;

  @Column({ type: "int", default: 0 })
  stock: number;

  @Index()
  @ManyToOne(() => Product, (product) => product.colors, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: Product;
}
