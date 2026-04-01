import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";


@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get users with pagination' })
    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Rol.Admin)
    getUsersController(@Query('page') page: string, @Query('limit') limit: string) {
        if (page && limit) {
            return this.usersService.getUsers(+page, +limit);
        }
        return this.usersService.getUsers(1, 5);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user by id' })
    @Get(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Rol.Admin)
    getUserByIdController(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user by id' })
    @Put(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    updateUserController(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user by id' })
    @Delete(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    deleteUserController(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }

    @ApiBearerAuth()
    @Put('change/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Rol.SuperAdmin)
    changeAdmin (@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.changeAdmin(id);
    }
}
