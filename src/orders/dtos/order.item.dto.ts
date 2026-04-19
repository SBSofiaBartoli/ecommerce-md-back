import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsUUID, Min } from "class-validator";

export class OrderItemDto {
  @ApiProperty({
    example: "a5f97951-e892-42ab-bc3c-123b2a0afd37",
    description: "Product UUID",
  })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: "f1d2c3b4-e5f6-7890-abcd-ef1234567890",
    description:
      "ProductColor UUID — specifies which color variant to purchase",
  })
  @IsNotEmpty()
  @IsUUID()
  colorId: string;

  @ApiProperty({
    example: 2,
    description: "Quantity to purchase for this color variant (min 1)",
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
