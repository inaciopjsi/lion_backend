import {
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
  HttpStatus,
  Body,
  ConflictException,
  Delete,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { Roles } from 'src/decorators/roles.decorator';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { HttpResponseHelper } from 'src/helpers/http-response.helper';

import { ItemsService } from './items.service';

import { CreateSiteItemDto } from './dto/create-site-item.dto';
import { UpdateSiteItemDto } from './dto/update-site-item.dto';
import { VerifyNameSiteItemDto } from './dto/verify-name-site-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getReturnAllItems(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.itemsService.getAllItems(
            request.user.roles
              .map((role) => role.name)
              .includes('SUPER_ADMIN'),
          ),
          '/items',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   *
   * @param request
   * @param response
   * @param id
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get('/item/:id')
  private async getItemById(
    @Req() request,
    @Res() response,
    @Param('id') id: string,
  ) {
    const item = await this.itemsService.getItemById(
      id,
      request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
    );
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          item,
          '/items/item/{id}',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   *
   * @param response
   * @param createSiteItemDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post()
  private async postAddItem(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    createSiteItemDto: CreateSiteItemDto,
  ) {
    await this.itemsService.createItem(createSiteItemDto);
    return response
      .status(HttpStatus.CREATED)
      .json(
        HttpResponseHelper.successResponse(
          { message: 'Item has been created successfully' },
          '/items',
          HttpResponseHelper.POST,
        ),
      );
  }

  /**
   *
   * @param response
   * @param verifyNameSiteItemDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post('/verify_name')
  private async postVerifyItemByName(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    verifyNameSiteItemDto: VerifyNameSiteItemDto,
  ) {
    if (!(await this.itemsService.existItemName(verifyNameSiteItemDto))) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/items/verify_name',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new ConflictException();
    }
  }

  /**
   *
   * @param response
   * @param id
   * @param updateSiteItemDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  private async putEditItem(
    @Res() response,
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateSiteItemDto: UpdateSiteItemDto,
  ) {
    if (await this.itemsService.updateItem(id, updateSiteItemDto)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Item has been edited successfully' },
            '/items/{id}',
            HttpResponseHelper.PUT,
          ),
        );
    }
    throw new InternalServerErrorException();
  }

  /**
   *
   * @param response
   * @param id
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch('/disable/:id')
  private async patchDisableItem(@Res() response, @Param('id') id: string) {
    if (await this.itemsService.disableItem(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Item Disabled' },
            '/items/disable/{id}',
            HttpResponseHelper.PATCH,
          ),
        );
    }
    throw new InternalServerErrorException();
  }

  /**
   *
   * @param response
   * @param id
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch('/enable/:id')
  private async patchEnableItem(@Res() response, @Param('id') id: string) {
    if (await this.itemsService.enableItem(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Item Enabled' },
            '/items/enable/{id}',
            HttpResponseHelper.PATCH,
          ),
        );
    }
    throw new InternalServerErrorException();
  }

  /**
   *
   * @param response
   * @param id
   * @returns
   */
  @Roles('SUPER_ADMIN')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  private async deleteItem(@Res() response, @Param('id') id: string) {
    if (await this.itemsService.removeItem(id)) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/items/{id}',
            HttpResponseHelper.DELETE,
          ),
        );
    }
    throw new InternalServerErrorException();
  }
}
