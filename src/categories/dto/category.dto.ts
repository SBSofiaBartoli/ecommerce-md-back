import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        example: 'Headphones',
        description: 'It must contain a new product category'
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}