import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "./dtos/order.dto";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guard/auth.guard";

@Controller('orders')
export class OrderController {
    constructor (private readonly orderService: OrderService) {};

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create new order' })
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() orderDto: CreateOrderDto) {
        return this.orderService.addOrder(orderDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get order by id' })
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.getOrder(id);
    }
}
