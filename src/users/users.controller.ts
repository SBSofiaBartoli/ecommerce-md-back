import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Get users with pagination" })
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "limit", required: false, example: 10 })
  @Get()
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(Rol.Admin)
  getUsersController(@Query("page") page = 1, @Query("limit") limit = 10) {
    return this.usersService.getUsers(+page, +limit);
  }

  @ApiOperation({ summary: "Get user by id" })
  @Get(":id")
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles(Rol.Admin)
  getUserByIdController(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: "Update user by id" })
  @Put(":id")
  @HttpCode(200)
  updateUserController(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateDto);
  }

  @ApiOperation({ summary: "Delete user by id" })
  @Delete(":id")
  @HttpCode(200)
  deleteUserController(@Param("id", ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: "Change user role [SuperAdmin]" })
  @Put(":id/role")
  @UseGuards(RolesGuard)
  @Roles(Rol.SuperAdmin)
  changeRole(@Param("id", ParseUUIDPipe) id: string, @Body("role") role: Rol) {
    return this.usersService.changeAdmin(id, role);
  }
}
