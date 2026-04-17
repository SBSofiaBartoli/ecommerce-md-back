import { Column } from "typeorm";
import { ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Physical dimensions of a bag model.
 * All measurements in centimeters, weight in grams.
 */
export class Dimensions {
  @ApiPropertyOptional({ example: 35, description: "Width in centimeters" })
  @Column({ type: "decimal", precision: 6, scale: 2, nullable: true })
  widthCm: number;

  @ApiPropertyOptional({ example: 28, description: "Height in centimeters" })
  @Column({ type: "decimal", precision: 6, scale: 2, nullable: true })
  heightCm: number;

  @ApiPropertyOptional({ example: 12, description: "Depth in centimeters" })
  @Column({ type: "decimal", precision: 6, scale: 2, nullable: true })
  depthCm: number;

  @ApiPropertyOptional({ example: 650, description: "Weight in grams" })
  @Column({ type: "int", nullable: true })
  weightGrams: number;
}
