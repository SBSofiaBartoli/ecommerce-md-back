import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dtos/user.dto";
import { LoginUserDto } from "src/users/dtos/loginUser.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register new user" })
  @Post("signup")
  @HttpCode(201)
  createUserController(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @ApiOperation({ summary: "User login" })
  @Post("/signin")
  @HttpCode(200)
  LoginUserController(@Body() credentials: LoginUserDto) {
    return this.authService.loginUser(credentials);
  }
}
