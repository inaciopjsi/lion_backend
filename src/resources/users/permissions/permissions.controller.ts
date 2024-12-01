import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Req,
  ValidationPipe,
  Delete,
  Param,
  Put,
  Patch,
  ConflictException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HttpResponseHelper } from 'src/helpers/http-response.helper';

import { PermissionsService } from './permissions.service';

import { VerifyNameSitePermissionDto } from './dto/verify-name-site-permission.dto';
import { CreateSitePermissionDto } from './dto/create-site-permission.dto';
import { UpdateSitePermissionDto } from './dto/update-site-permission.dto';
import { Roles } from 'src/decorators/roles.decorator';

/**
 *
 */
@Controller('permissions')
export class PermissionsController {
  /**
   * @ignore
   * @param permissionsService
   */
  constructor(private readonly permissionsService: PermissionsService) {}

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getReturnAllPermissions(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.permissionsService.getAllPermissions(
            request.user.permissions
              .map((permission) => permission.name)
              .includes('SUPER_ADMIN'),
          ),
          '/permissions',
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
  @Get('/permission/:id')
  private async getPermissionById(
    @Req() request,
    @Res() response,
    @Param('id') id: string,
  ) {
    const permission = await this.permissionsService.getPermissionById(
      id,
      request.user.permissions
        .map((permission) => permission.name)
        .includes('SUPER_ADMIN'),
    );
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          permission,
          '/permissions/permission/{id}',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   *
   * @param response
   * @param createSitePermissionDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post()
  private async postAddPermission(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    createSitePermissionDto: CreateSitePermissionDto,
  ) {
    await this.permissionsService.createPermission(createSitePermissionDto);
    return response
      .status(HttpStatus.CREATED)
      .json(
        HttpResponseHelper.successResponse(
          { message: 'Permission has been created successfully' },
          '/permissions',
          HttpResponseHelper.POST,
        ),
      );
  }

  /**
   *
   * @param response
   * @param verifyNameSitePermissionDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post('/verify_name')
  private async postVerifyPermissionByName(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    verifyNameSitePermissionDto: VerifyNameSitePermissionDto,
  ) {
    if (
      !(await this.permissionsService.existPermissionName(
        verifyNameSitePermissionDto,
      ))
    ) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/permissions/verify_name',
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
   * @param updateSitePermissionDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  private async putEditPermission(
    @Res() response,
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateSitePermissionDto: UpdateSitePermissionDto,
  ) {
    if (
      await this.permissionsService.updatePermission(
        id,
        updateSitePermissionDto,
      )
    ) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Permission has been edited successfully' },
            '/permissions/{id}',
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
  private async patchDisablePermission(
    @Res() response,
    @Param('id') id: string,
  ) {
    if (await this.permissionsService.disablePermission(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Permission Disabled' },
            '/permissions/disable/{id}',
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
  private async patchEnablePermission(
    @Res() response,
    @Param('id') id: string,
  ) {
    if (await this.permissionsService.enablePermission(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Permission Enabled' },
            '/permissions/enable/{id}',
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
  private async deletePermission(@Res() response, @Param('id') id: string) {
    if (await this.permissionsService.removePermission(id)) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/permissions/{id}',
            HttpResponseHelper.DELETE,
          ),
        );
    }
    throw new InternalServerErrorException();
  }
}
