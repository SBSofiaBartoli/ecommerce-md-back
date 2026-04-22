import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { MatchPassword } from "src/common/helper/matchPassword";

export class CreateUserDto {
  @ApiProperty({
    example: "apholo@gmail.com",
    description: "Must be a valid email",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "María García",
    description: "Full name (3–80 chars)",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    example: "Password123!",
    description:
      "Min 8 chars, max 15. Must include uppercase, lowercase, number and special character (@$!%*?&._-)",
  })
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  })
  password: string;

  @ApiProperty({
    example: "Password123!",
    description: "Must confirm the password you entered previously",
  })
  @Validate(MatchPassword, ["password"])
  confirmPassword: string;

  @ApiProperty({
    example: "Av. Colón 1234, piso 3",
    description: "Shipping address",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  address: string;

  @ApiProperty({
    example: 3517891302,
    description: "Phone number (digits only)",
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({
    example: "Argentina",
    description: "Country of residence",
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @ApiProperty({
    example: "Córdoba",
    description: "City of residence",
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
