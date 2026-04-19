import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { OrderItemDto } from "./order.item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {
  @ApiProperty({
    example: "3a5d7af6-14ea-42d4-bb46-b53c65631765",
    description: "It must contain a user's UUID",
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: [OrderItemDto],
    description: "List of items to purchase",
    example: [
      { productId: "a5f97951-...", colorId: "f1d2c3b4-...", quantity: 1 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
