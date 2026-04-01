import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsObject, IsUUID } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        example: '3a5d7af6-14ea-42d4-bb46-b53c65631765',
        description: "It must contain a user's UUID"
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        example: 'a5f97951-e892-42ab-bc3c-123b2a0afd37',
        description: "It must contain the added products"
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsObject({ each: true })
    products: { id: string }[];
}
