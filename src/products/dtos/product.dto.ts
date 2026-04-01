import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class ProductDto {
    @ApiProperty({
        example: 'Iphone 17 Pro Max',
        description: 'It must contain the product name'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'The new and improved smartphone, the best in the universe',
        description: 'It must contain the product description'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        example: 1500.00,
        description: 'It must contain the price'
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        example: 1,
        description: 'It must contain the product stock'
    })
    @IsNotEmpty()
    @IsInt()
    stock: number;

    @ApiProperty({
        example: 'https://cdn.billowshop.com/9ef84dda-32dd-4016-7da3-1c0a824fffb4/img/Producto/0f0ca041-07a9-265c-b85c-e1fdc27d5c3f/Diseno-sin-titulo-2025-10-24T140245-706-68fbbf613541d-O.png',
        description: 'It may contain the image URL'
    })
    @IsString()
    @IsOptional()
    imgUrl: string;

    @ApiProperty({
        example: 'b6739b1e-cb6e-4754-9aaa-2c814ac4f355',
        description: "It must contain the product category's UUID"
    })
    @IsUUID()
    categoryId: string;
}
