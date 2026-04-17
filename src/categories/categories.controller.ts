import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./categories.service";
import { CategoryDto } from "./dto/category.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Get all categories" })
  @Get()
  getCategoriesController() {
    return this.categoryService.getCategories();
  }

  @ApiOperation({ summary: "Get category by id (includes products)" })
  @Get(":id")
  getCategoryById(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Create new category" })
  @Post("create")
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addCategoriesController(@Body() categoryDto: CategoryDto) {
    return this.categoryService.addCategories(categoryDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a category [Admin]" })
  @Put(":id")
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateCategory(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: Partial<CategoryDto>,
  ) {
    return this.categoryService.updateCategory(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a category [Admin]" })
  @Delete(":id")
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteCategory(@Param("id", ParseUUIDPipe) id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
