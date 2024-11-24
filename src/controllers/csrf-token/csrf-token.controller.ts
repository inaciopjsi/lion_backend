import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';

import { HttpResponseHelper } from 'src/helpers/http-response.helper';

@Controller('csrf-token')
export class CsrfTokenController {
  @Public()
  @Get('')
  async getCsrfTtoken(@Req() request: Request, @Res() response) {
    return response.status(HttpStatus.OK).json(
      HttpResponseHelper.successResponse(
        {
          token: request.csrfToken(),
        },
        '/csrf-token',
        HttpResponseHelper.GET,
      ),
    );
  }
}
