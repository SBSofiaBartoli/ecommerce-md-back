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
import { CreateProductDto } from "./dtos/product.dto";
import { UpdateProductDto } from "./dtos/updateProduct.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: "Get products with pagination" })
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "limit", required: false, example: 10 })
  @Get()
  @HttpCode(200)
  getProductsController(
    @Query("page") page = "1",
    @Query("limit") limit = "10",
  ) {
    return this.productsService.getProducts(+page, +limit);
  }

  @ApiOperation({ summary: "Get product by id" })
  @Get(":id")
  @HttpCode(200)
  getProductsControllerById(@Param("id", ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiOperation({ summary: "Get product by SKU" })
  @Get("sku/:sku")
  @HttpCode(200)
  getProductBySku(@Param("sku") sku: string) {
    return this.productsService.getProductBySku(sku);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Create  new product" })
  @Post("/create")
  @HttpCode(201)
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createProductController(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
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

  @ApiBearerAuth()
  @ApiOperation({ summary: "Restore a soft-deleted product [Admin]" })
  @Put(":id/restore")
  @HttpCode(200)
  @Roles(Rol.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  restoreProduct(@Param("id", ParseUUIDPipe) id: string) {
    return this.productsService.restoreProduct(id);
  }
}
