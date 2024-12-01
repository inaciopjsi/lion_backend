import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  Req,
  Body,
  Delete,
  Param,
  ValidationPipe,
  Put,
  Patch,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HttpResponseHelper } from 'src/helpers/http-response.helper';

import { CreateSiteMenuDto } from './dto/create-site-menu.dto';
import { UpdateSiteMenuDto } from './dto/update-site-menu.dto';
import { VerifyNameSiteMenuDto } from './dto/verify-name-site-menu.dto';
import { MenusService } from './menus.service';
import { RolesService } from '../roles/roles.service';

@Controller('menus')
export class MenusController {
  constructor(
    private readonly menusService: MenusService,
    private readonly rolesService: RolesService,
  ) {}

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getReturnAllMenus(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.menusService.getAllMenus(
            request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
          ),
          '/menus',
          HttpResponseHelper.GET,
        ),
      );
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get('parents')
  async getReturnAllParents(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.menusService.getAllMenusToMenu(),
          '/menus/parents',
          HttpResponseHelper.GET,
        ),
      );
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get('roles')
  async getReturnAllRoles(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.rolesService.getAllRolesToMenu(
            request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
          ),
          '/menus/roles',
          HttpResponseHelper.GET,
        ),
      );
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get('/menu/:id')
  private async getReturnMenuById(
    @Req() request,
    @Res() response,
    @Param('id') id: string,
  ) {
    const menu = await this.menusService.getMenuById(
      id,
      request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
    );
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          menu,
          '/menus/menu/{id}',
          HttpResponseHelper.GET,
        ),
      );
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post()
  private async postAddMenu(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    createSiteMenuDto: CreateSiteMenuDto,
  ) {
    await this.menusService.createMenu(createSiteMenuDto);
    return response
      .status(HttpStatus.CREATED)
      .json(
        HttpResponseHelper.successResponse(
          { message: 'Menu has been created successfully' },
          '/menus',
          HttpResponseHelper.POST,
        ),
      );
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post('/verify_name')
  private async postVerifyMenuByName(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    verifyNameSiteMenuDto: VerifyNameSiteMenuDto,
  ) {
    if (!(await this.menusService.existMenuName(verifyNameSiteMenuDto))) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/menus/verify_name',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new ConflictException();
    }
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  private async putEditMenu(
    @Res() response,
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateSiteMenuDto: UpdateSiteMenuDto,
  ) {
    if (await this.menusService.updateMenu(id, updateSiteMenuDto)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Menu has been edited successfully' },
            '/menus/{id}',
            HttpResponseHelper.PUT,
          ),
        );
    }
    throw new BadRequestException();
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch('/disable/:id')
  private async patchDisableMenu(@Res() response, @Param('id') id: string) {
    if (await this.menusService.disableMenu(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Menu Disabled' },
            '/menus/disable/{id}',
            HttpResponseHelper.PATCH,
          ),
        );
    }
    throw new BadRequestException();
  }

  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch('/enable/:id')
  private async patchEnableMenu(@Res() response, @Param('id') id: string) {
    if (await this.menusService.enableMenu(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Menu Enabled' },
            '/menus/enable/{id}',
            HttpResponseHelper.PATCH,
          ),
        );
    }
    throw new BadRequestException();
  }

  @Roles('SUPER_ADMIN')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  private async deleteMenu(@Res() response, @Param('id') id: string) {
    if (await this.menusService.removeMenu(id)) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/menus/{id}',
            HttpResponseHelper.DELETE,
          ),
        );
    }
    throw new BadRequestException();
  }
}
