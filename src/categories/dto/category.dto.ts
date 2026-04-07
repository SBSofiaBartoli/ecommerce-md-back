import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategoryDto {
  @ApiProperty({
    example: "Tote",
    description: "Category name (e.g. Tote, Clutch, Crossbody, Mochila)",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example:
      "Bolsos de cuero grandes con asas largas, ideales para el día a día.",
    description: "Brief category description",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
