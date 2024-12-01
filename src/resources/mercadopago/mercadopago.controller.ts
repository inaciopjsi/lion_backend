import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HttpResponseHelper } from 'src/helpers/http-response.helper';
import { CreateProcessPaymentDto } from './dto/create-process-payment.dto';
import { MercadopagoService } from './mercadopago.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('mp')
export class MercadopagoController {
  constructor(private mercadopagoService: MercadopagoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('process_payment')
  async postProcessPayment(
    @Req() request,
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    createProcessPaymentDto: CreateProcessPaymentDto,
  ) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.mercadopagoService.createProcessPayment(
            request.user.id,
            createProcessPaymentDto,
          ),
          '/mp/process_payment',
          HttpResponseHelper.POST,
        ),
      );
  }

  @Public()
  @Post('callback/webhook')
  async postCallbackWebhook(@Res() response, @Body() data: any) {
    await this.mercadopagoService.saveCallback(data);
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          null,
          '/mp/callback/webhook',
          HttpResponseHelper.POST,
        ),
      );
  }

  @Public()
  @Get('create/test/signature')
  async getCreateTestSignature(@Res() response) {
    await this.mercadopagoService.createTestSignature();
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          null,
          '/mp/create/test/signature',
          HttpResponseHelper.GET,
        ),
      );
  }
}
