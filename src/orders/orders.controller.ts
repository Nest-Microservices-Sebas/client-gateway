import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id })
      .pipe(
        catchError(err => { throw new RpcException(err) })
      );
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {

    return this.ordersClient.send('findAllOrders', {
      ...paginationDto,
      status: statusDto.status
    });
  }
}
