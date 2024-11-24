import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';

import { HttpResponseHelper } from 'src/helpers/http-response.helper';

@Controller('security')
export class SecurityController {
  @Post('')
  async getSecurity(@Req() request, @Res() response) {
    console.log(request);
    return response.status(HttpStatus.OK).json(
      HttpResponseHelper.successResponse(
        {
          response: 'secret',
        },
        '/security',
        HttpResponseHelper.GET,
      ),
    );
  }
}
