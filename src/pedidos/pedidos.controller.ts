import { Controller, Get, Param } from '@nestjs/common';

enum PaymentMethod {
  CREDIT = 'CREDIT',
  CASH = 'CASH',
  TC = 'TC'
}

interface Pedido {
  id: number;
  payment_method: PaymentMethod

}

@Controller('pedidos')
export class PedidosController {

  private pedidos: Pedido[] = [
    { id: 1, payment_method: PaymentMethod.CREDIT },
    { id: 2, payment_method: PaymentMethod.CASH },
    { id: 3, payment_method: PaymentMethod.TC },
    { id: 4, payment_method: PaymentMethod.CASH },
    { id: 5, payment_method: PaymentMethod.CREDIT },
    { id: 6, payment_method: PaymentMethod.CASH },
    { id: 7, payment_method: PaymentMethod.CASH },
    { id: 8, payment_method: PaymentMethod.CASH },
    { id: 9, payment_method: PaymentMethod.TC },
    { id: 10, payment_method: PaymentMethod.TC },
    { id: 11, payment_method: PaymentMethod.CASH },
    { id: 12, payment_method: PaymentMethod.TC },
    { id: 13, payment_method: PaymentMethod.CREDIT },
    { id: 14, payment_method: PaymentMethod.CREDIT },
    { id: 15, payment_method: PaymentMethod.TC },
    { id: 16, payment_method: PaymentMethod.CREDIT },
    { id: 17, payment_method: PaymentMethod.CREDIT },
  ];

  @Get('/all')
  findAll(): Pedido[] {
    return this.pedidos;
  }

  @Get('/credito')
  listCredit() {
    const pedidos = this.pedidos.filter(p => p.payment_method === PaymentMethod.CREDIT);
    return {
      data: pedidos,
      message: pedidos.length === 0 ? 'No hay pedidos con este metodo de pago' : 'Pedido de credito',
    }
  }

  @Get('/cash')
  listCash() {
    const pedidos = this.pedidos.filter(p => p.payment_method === PaymentMethod.CASH);
    return {
      data: pedidos,
      message: pedidos.length === 0 ? 'No hay pedidos con este metodo de pago' : 'Pedido de TC',
    }
  }

  @Get('/tc')
  listTc() {
    const pedidos = this.pedidos.filter(p => p.payment_method === PaymentMethod.TC);
    return {
      data: pedidos,
      message: pedidos.length === 0 ? 'No hay pedidos con este metodo de pago' : 'Pedido de TC',
    }
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    const pedido = this.pedidos.find(p => p.id === Number(id));
    return {
      data: pedido,
      message: pedido ? 'Pedido encontrado' : 'Pedido no encontrado',
    }
  }
}
