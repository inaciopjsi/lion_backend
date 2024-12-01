import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Put,
  InternalServerErrorException,
  Body,
  ValidationPipe,
  Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HttpResponseHelper } from 'src/helpers/http-response.helper';
import { UpdateSiteMeDto } from './dto/update-site-user.dto';
import { MyPasswordChange } from './dto/my-password-change';
/**
 * Controller for session user data
 */
@Controller('user')
export class UserController {
  /**
   * @ignore
   * @param userService
   * @param menusService
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Gets data from the user making the request
   * @param {any} request Extracts data from the customer request
   * @param {any} response Extracts the `Response` from the requested controller
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getMyData(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.userService.getMyData(request.user.id),
          '/user',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   * Gets data from the user making the request
   * @param {any} request Extracts data from the customer request
   * @param {any} response Extracts the `Response` from the requested controller
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Put('')
  async setMyData(
    @Req() request,
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    updateSiteMeDto: UpdateSiteMeDto,
  ) {
    if (await this.userService.updateMe(request.user.id, updateSiteMeDto)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'My information was edited successfully' },
            '/user',
            HttpResponseHelper.PUT,
          ),
        );
    }
    throw new InternalServerErrorException();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/password-change')
  private async postUserChangePassword(
    @Req() request,
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    myPasswordChange: MyPasswordChange,
  ) {
    if (
      await this.userService.changePassword(request.user.id, myPasswordChange)
    ) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { changed: true },
            '/user/password-change',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Gets data from the user making the request
   * @param {any} request Extracts data from the customer request
   * @param {any} response Extracts the `Response` from the requested controller
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('my_self')
  async getMySelf(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.userService.getMySelf(request.user.id),
          '/user/my_self',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   * Gets menu data from the user making the request
   * @param {any} request Extracts data from the customer request
   * @param {any} response Extracts the `Response` from the requested controller
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('my_menus_tree')
  async getMyMenus(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.userService.getMyMenus(request.user.roles),
          '/user/my_menus_tree',
          HttpResponseHelper.GET,
        ),
      );
  }
}
