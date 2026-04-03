import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dtos/product.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: "Get products with pagination" })
  @Get()
  @HttpCode(200)
  getProductsController(
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    if (page && limit) {
      return this.productsService.getProducts(+page, +limit);
    }
    return this.productsService.getProducts(1, 5);
  }

  @ApiOperation({ summary: "Get product by id" })
  @Get(":id")
  @HttpCode(200)
  getUserControllerById(@Param("id", ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Create  new product" })
  @Post("/create")
  @HttpCode(201)
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createProductController(@Body() product: ProductDto) {
    return this.productsService.createProduct(product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Update product by id" })
  @Put(":id")
  @HttpCode(200)
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProductController(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete product by id" })
  @Delete(":id")
  @HttpCode(200)
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteProductController(@Param("id", ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
