import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  HttpStatus,
  UseGuards,
  Body,
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

import { UsersService } from './users.service';
import { RolesService } from '../roles/roles.service';

import { CreateSiteUserDto } from './dto/create-site-user.dto';
import { UpdateSiteUserDto } from './dto/update-site-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { VerifyEmailSiteUserDto } from './dto/verify-email-site-user.dto';
import { VerifyUserNameSiteUserDto } from './dto/verify-user-name-site-user.dto';

/**
 * Controller that returns data from different users (used by administrators)
 */
@Controller('users')
export class UsersController {
  /**
   * @ignore
   * @param usersService
   * @param rolesService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  /**
   * It takes the data of all registered users, whether active or inactive, and restricts the search to the role of the requester.
   * @param {any} request Extracts data from the customer request
   * @param {any} response Extracts the `Response` from the requested controller
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get()
  async postReturnAllUsers(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.usersService.getAllUsers(request.user),
          '/users',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   * Takes the roles of all registered users whether they are active or inactive, restricts the search to the role of the requester.
   * @param {any} request Extracts data from the customer request
   * @param {any} response Extracts the `Response` from the requested controller
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get('roles')
  async getReturnAllRoles(@Req() request, @Res() response) {
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.rolesService.getAllRolesToUsers(
            request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
          ),
          '/users/roles',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   * It takes the data of all a specific user, whether active or inactive, restricts the search to the role of the requester.
   * @param {any} request Extracts data from the customer request
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {string} id User ID whose data is being requested
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  private async getReturnUserById(
    @Req() request,
    @Res() response,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.getUserById(
      id,
      request.user.roles.map((role) => role.name).includes('SUPER_ADMIN'),
    );
    return response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          user,
          '/users/user/{id}',
          HttpResponseHelper.GET,
        ),
      );
  }

  /**
   * Insert a new user into the system, request depends on a form
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {CreateSiteUserDto} createSiteUserDto Validation of user creation data
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post()
  private async postAddUser(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    createSiteUserDto: CreateSiteUserDto,
  ) {
    await this.usersService.createSiteUser(createSiteUserDto);
    return response
      .status(HttpStatus.CREATED)
      .json(
        HttpResponseHelper.successResponse(
          { message: 'User has been created successfully' },
          '/users',
          HttpResponseHelper.POST,
        ),
      );
  }

  /**
   * Checks the existence of a specific email in the system
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {VerifyEmailSiteUserDto} verifyEmailSiteUserDto Validation of the email that will be verified
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post('/verify_email')
  private async postVerifyUserByEmail(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    verifyEmailSiteUserDto: VerifyEmailSiteUserDto,
  ) {
    if (!(await this.usersService.existUserEmail(verifyEmailSiteUserDto))) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/users/verify_email',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new ConflictException();
    }
  }

  /**
   * Checks the existence of a given username in the system
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {VerifyUserNameSiteUserDto} verifyUserNameSiteUserDto Validation of the username that will be verified
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Post('/verify_login')
  private async postVerifyUserByUserName(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    verifyUserNameSiteUserDto: VerifyUserNameSiteUserDto,
  ) {
    if (
      !(await this.usersService.existUserUserName(verifyUserNameSiteUserDto))
    ) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/users/verify_username',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new ConflictException();
    }
  }

  /**
   * Change a user's data based on their ID
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {string} id User ID whose data is being requested
   * @param {UpdateSiteUserDto} updateSiteUserDto Validation of user data that will be modified
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  private async putEditUser(
    @Res() response,
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true }))
    updateSiteUserDto: UpdateSiteUserDto,
  ) {
    if (await this.usersService.updateUser(id, updateSiteUserDto)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'User has been edited successfully' },
            '/users/{id}',
            HttpResponseHelper.PUT,
          ),
        );
    }
    throw new InternalServerErrorException();
  }

  /**
   * Disable a user from the system
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {string} id User ID whose data is being requested
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch('/disable/:id')
  private async patchDisableUser(@Res() response, @Param('id') id: string) {
    if (await this.usersService.disableUser(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'User Disabled' },
            '/users/disable/{id}',
            HttpResponseHelper.PATCH,
          ),
        );
    }
    throw new InternalServerErrorException();
  }

  /**
   * Enable a system user
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {string} id User ID whose data is being requested
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch('/enable/:id')
  private async patchEnableUser(@Res() response, @Param('id') id: string) {
    if (await this.usersService.enableUser(id)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { message: 'User Enabled' },
            '/users/enable/{id}',
            HttpResponseHelper.PATCH,
          ),
        );
    }
    throw new InternalServerErrorException();
  }

  /**
   * Change a user's password from their ID
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {UpdatePasswordUserDto} updatePasswordUserDto Validates the new password that will be assigned to a specific user
   * @param {string} id User ID whose data is being requested
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Patch('/change-password/:id')
  private async postEditPasswordData(
    @Res() response,
    @Body(new ValidationPipe({ transform: true }))
    updatePasswordUserDto: UpdatePasswordUserDto,
    @Param('id') id: string,
  ) {
    if (await this.usersService.changeUserPassword(id, updatePasswordUserDto)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/users/change-password/{id}',
            HttpResponseHelper.PATCH,
          ),
        );
    } else {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Remove a user from their ID
   * @param {any} response Extracts the `Response` from the requested controller
   * @param {string} id User ID to be removed
   * @returns
   */
  @Roles('SUPER_ADMIN', 'ADMIN')
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  private async deleteUser(@Res() response, @Param('id') id: string) {
    if (await this.usersService.removeUser(id)) {
      return response
        .status(HttpStatus.NO_CONTENT)
        .json(
          HttpResponseHelper.successResponse(
            {},
            '/users/{id}',
            HttpResponseHelper.DELETE,
          ),
        );
    }
    throw new InternalServerErrorException();
  }
}
