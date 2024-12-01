import { Injectable, BadGatewayException, Inject } from '@nestjs/common';

import { v7 as uuidv7 } from 'uuid';
import mongoose from 'mongoose';
import { Payment, PreApprovalPlan, Payment as SDKPayment } from 'mercadopago';

import { CreateProcessPaymentDto } from 'src/resources/mercadopago/dto/create-process-payment.dto';

import { IOrder } from 'src/connections/mp/orders/orders.interface';
import { MpConfig } from 'src/configs/providers/mp/mp.config';

@Injectable()
export class MercadopagoService {
  constructor(
    @Inject('ORDER_MODEL')
    private orderModel: mongoose.Model<IOrder>,
    @Inject('PAYMENT_MODEL')
    private paymentModel: mongoose.Model<Payment>,
    private readonly mpConfig: MpConfig,
  ) {}

  async createProcessPayment(
    userId: string,
    createProcessPaymentDto: CreateProcessPaymentDto,
  ): Promise<any> {
    const insert = this._organizeDataToDb(userId, createProcessPaymentDto);
    const createdOrder = this.orderModel.create({
      data: insert,
    });
    return await createdOrder.then((orderData) => {
      if (orderData) {
        return this._processPayment(
          orderData,
          createProcessPaymentDto.formData,
        );
      } else {
        throw new BadGatewayException();
      }
    });
  }

  async saveCallback(callback: any): Promise<any> {
    /*return this.mercadopagoPrismaService.callbackMercadoPago.create({
      data: { callback: callback },
    });*/
  }

  createTestSignature() {
    const plan = {
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        repetitions: 12,
        billing_day: 10,
        billing_day_proportional: false,
        transaction_amount: 20.05,
        currency_id: 'BRL',
      },
      back_url: 'https://meumercadointeligente.com.br/',
      reason: 'Base Plan',
    };
    const preApprovalPlan = new PreApprovalPlan(this.mpConfig.startMP());
    preApprovalPlan
      .create({ body: plan })
      .then((res: any) => {
        console.log(res);
        /*this.mercadopagoPrismaService.callbackPlanMercadoPago.create({
          data: { callback: res },
        });*/
      })
      .catch(console.log);
  }

  private _organizeDataToDb(
    userId: string,
    createProcessPaymentDto: CreateProcessPaymentDto,
  ): IOrder {
    const newOrder = <any>{ ...createProcessPaymentDto.formData };
    newOrder.orderSource = userId;
    newOrder.uuidOrderToken = uuidv7();
    console.log(newOrder);
    return <IOrder>{};
  }

  private _processPayment(orderData: any, formData: any): any {
    const payment = new SDKPayment(this.mpConfig.startMP());
    const requestOptions = {
      idempotencyKey: this.mpConfig.idempotencyKey,
    };
    const body = {
      ...formData,
      three_d_secure_mode: 'optional',
    };
    return payment
      .create({ body, requestOptions })
      .then(async (paymentResponse) => {
        const insertPayment = { ...paymentResponse };
        console.log(insertPayment);
        const insertedPayment = this.paymentModel.create({
          data: <Payment>{},
        });
        return await insertedPayment.then((paymentData) => {
          if (paymentData) {
            return paymentData.id;
          } else {
            throw new BadGatewayException();
          }
        });
      })
      .catch((err) => {
        console.log('catch payment', err);
        throw new BadGatewayException();
      });
  }
}
