import {  Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./categories.service";
import { CategoryDto } from "./dto/category.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";

@Controller('categories')
export class CategoryController {
    constructor (private readonly categoryService: CategoryService) {};

    @ApiOperation({ summary: 'Get categories' })
    @Get()
    getCategoriesController() {
        return this.categoryService.getCategories();
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new category' })
    @Post('create')
    @Roles(Rol.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addCategoriesController(@Body() categoryDto: CategoryDto) {
        return this.categoryService.addCategories(categoryDto);
    }
}
