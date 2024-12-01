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

import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HttpResponseHelper } from 'src/helpers/http-response.helper';

import { RolesService } from './roles.service';

import { VerifyNameSiteRoleDto } from './dto/verify-name-site-role.dto';
import { CreateSiteRoleDto } from './dto/create-site-role.dto';
import { UpdateSiteRoleDto } from './dto/update-site-role.dto';

/**
 *
 */
@Controller('roles')
export class RolesController {
  /**
   * @ignore
   * @param rolesService
   */
  constructor(private readonly rolesService: RolesService) {}

  /**
   *
   * @param request
   * @param response
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getReturnAllRoles(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.rolesService.getAllRoles(
            request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
          ),
          '/roles',
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
  @Get('/role/:id')
  private async getRoleById(
    @Req() request,
    @Res() response,
    @Param('id') id: string,
  ) {
    const role = await this.rolesService.getRoleById(
      id,
      request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
    );
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          role,
          '/roles/role/{id}',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   *
   * @param response
   * @param createSiteRoleDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post()
  private async postAddRole(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    createSiteRoleDto: CreateSiteRoleDto,
  ) {
    await this.rolesService.createRole(createSiteRoleDto);
    return response
      .status(HttpStatus.CREATED)
      .json(
        HttpResponseHelper.successResponse(
          { message: 'Role has been created successfully' },
          '/roles',
          HttpResponseHelper.POST,
        ),
      );
  }

  /**
   *
   * @param response
   * @param verifyNameSiteRoleDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post('/verify_name')
  private async postVerifyRoleByName(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    verifyNameSiteRoleDto: VerifyNameSiteRoleDto,
  ) {
    if (!(await this.rolesService.existRoleName(verifyNameSiteRoleDto))) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/roles/verify_name',
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
   * @param updateSiteRoleDto
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  private async putEditRole(
    @Res() response,
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateSiteRoleDto: UpdateSiteRoleDto,
  ) {
    if (await this.rolesService.updateRole(id, updateSiteRoleDto)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Role has been edited successfully' },
            '/roles/{id}',
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
  private async patchDisableRole(@Res() response, @Param('id') id: string) {
    if (await this.rolesService.disableRole(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Role Disabled' },
            '/roles/disable/{id}',
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
  private async patchEnableRole(@Res() response, @Param('id') id: string) {
    if (await this.rolesService.enableRole(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'Role Enabled' },
            '/roles/enable/{id}',
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
  private async deleteRole(@Res() response, @Param('id') id: string) {
    if (await this.rolesService.removeRole(id)) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/roles/{id}',
            HttpResponseHelper.DELETE,
          ),
        );
    }
    throw new InternalServerErrorException();
  }
}
