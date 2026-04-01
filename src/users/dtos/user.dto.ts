import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "src/common/helper/matchPassword";

export class CreateUserDto {

    @ApiProperty({
        example: 'apholo@gmail.com',
        description: 'Must be a valid email'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Apholo',
        description: 'It must contain a minimum of 3 letters'
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'It must be a password with letters, uppercase letters, numbers, and symbols'
    })
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    password: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'Must confirm the password you entered previously'
    })
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @ApiProperty({
        example: 'Calle Falsa 123',
        description: 'It must contain a minimum of 3 letters'
    })
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({
        example: 3517891302,
        description: 'It must contain a valid telephone number'
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty({
        example: 'Argentina',
        description: 'It must contain a minimum of 5 letters'
    })
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @ApiProperty({
        example: 'Córdoba',
        description: 'It must contain a minimum of 3 letters'
    })
    @MinLength(5)
    @MaxLength(20)
    city: string;
}
