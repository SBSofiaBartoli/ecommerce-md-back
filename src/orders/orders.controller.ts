import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "./dtos/order.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guard/auth.guard";
import { Roles } from "src/common/decorator/roles.decorator";
import { Rol } from "src/common/enum/roles.enum";
import { RolesGuard } from "src/common/guard/roles.guard";

@ApiTags("Orders")
@ApiBearerAuth()
@Controller("orders")
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: "Create new order" })
  @Post()
  @HttpCode(201)
  addOrder(@Body() orderDto: CreateOrderDto) {
    return this.orderService.addOrder(orderDto);
  }

  @ApiOperation({ summary: "Get order by id" })
  @Get(":id")
  getOrder(@Param("id", ParseUUIDPipe) id: string) {
    return this.orderService.getOrder(id);
  }

  @ApiOperation({ summary: "Get all orders for a user [Admin]" })
  @Get("user/:userId")
  @Roles(Rol.Admin)
  @UseGuards(RolesGuard)
  getOrdersByUser(@Param("userId", ParseUUIDPipe) userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }
}
