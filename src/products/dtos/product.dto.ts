import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { LeatherType } from "../entities/products.entity";

// ─── Color variant ───────────────────────────────────────────────────────────

export class ProductColorDto {
  @ApiProperty({ example: "Caramelo", description: "Color name" })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiPropertyOptional({
    example: "#C68642",
    description: "Hex color code for UI swatch",
  })
  @IsOptional()
  @IsString()
  hexCode?: string;

  @ApiProperty({ example: 5, description: "Units available for this color" })
  @IsInt()
  @Min(0)
  stock: number;
}

// ─── Dimensions ──────────────────────────────────────────────────────────────

export class DimensionsDto {
  @ApiPropertyOptional({ example: 35, description: "Width in cm" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  widthCm?: number;

  @ApiPropertyOptional({ example: 28, description: "Height in cm" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  heightCm?: number;

  @ApiPropertyOptional({ example: 12, description: "Depth in cm" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  depthCm?: number;

  @ApiPropertyOptional({ example: 650, description: "Weight in grams" })
  @IsOptional()
  @IsInt()
  @Min(0)
  weightGrams?: number;
}

// ─── Create Product ──────────────────────────────────────────────────────────

export class CreateProductDto {
  @ApiProperty({
    example: "TOTE-001",
    description: "Unique SKU code for this model",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  sku: string;

  @ApiProperty({ example: "Tote Nápoles", description: "Product name" })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example:
      "Tote confeccionada en cuero vacuno flor entera curtido al vegetal. " +
      "Interior forrado en tela de algodón con bolsillo con cierre y dos organizadores. " +
      "Asas reforzadas con doble costura. Herrajes bañados en oro viejo.",
    description: "Detailed product description",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  description: string;

  @ApiPropertyOptional({
    example:
      "Limpiar con paño seco o ligeramente húmedo. Aplicar crema hidratante para cuero cada 3 meses. " +
      "Evitar exposición directa al sol y humedad extrema. Guardar relleno con papel tissue.",
    description: "Care and maintenance instructions",
  })
  @IsOptional()
  @IsString()
  careInstructions?: string;

  @ApiProperty({ example: 125000.0, description: "Price in local currency" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    enum: LeatherType,
    example: LeatherType.FULL_GRAIN,
    description: "Type of bovine leather used",
  })
  @IsOptional()
  @IsEnum(LeatherType)
  leatherType?: LeatherType;

  @ApiPropertyOptional({
    example:
      "https://res.cloudinary.com/example/image/upload/v1/tote-napoles-main.jpg",
    description: "Main product image URL",
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ["https://...side.jpg", "https://...interior.jpg"],
    description: "Additional gallery image URLs",
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @ApiPropertyOptional({
    type: DimensionsDto,
    description: "Physical dimensions of the bag",
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;

  @ApiProperty({
    type: [ProductColorDto],
    description: "Available color variants with individual stock",
    example: [
      { name: "Negro", hexCode: "#1C1C1C", stock: 8 },
      { name: "Caramelo", hexCode: "#C68642", stock: 5 },
      { name: "Cognac", hexCode: "#9B4722", stock: 3 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductColorDto)
  colors: ProductColorDto[];

  @ApiProperty({
    example: "b6739b1e-cb6e-4754-9aaa-2c814ac4f355",
    description: "Category UUID",
  })
  @IsUUID()
  categoryId: string;
}
