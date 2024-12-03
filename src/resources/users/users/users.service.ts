import { Inject, Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';

import * as moment from 'moment';
import * as path from 'path';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import { BcryptHelper } from 'src/helpers/bcrypt.helper';
import { FileHelper } from 'src/helpers/file.helper';

import { RolesService } from 'src/resources/users/roles/roles.service';

import { IUser } from 'src/connections/users/users/users.interface';

import { CreateAdminUserDto } from 'src/resources/users/users/dto/create-admin-user.dto';
import { CreateGoogleUserDto } from 'src/resources/users/users/dto/create-google-user.dto';
import { CreateSiteUserDto } from 'src/resources/users/users/dto/create-site-user.dto';
import { UpdateAdminUserDto } from 'src/resources/users/users/dto/update-admin-user.dto';
import { UpdatePasswordUserDto } from 'src/resources/users/users/dto/update-password-user.dto';
import { UpdateSiteUserDto } from 'src/resources/users/users/dto/update-site-user.dto';
import { VerifyEmailSiteUserDto } from 'src/resources/users/users/dto/verify-email-site-user.dto';
import { VerifyUserNameSiteUserDto } from 'src/resources/users/users/dto/verify-user-name-site-user.dto';

/**
 * Class that returns data from different users (Used by administrators)
 */
@Injectable()
export class UsersService {
  /**
   * @ignore
   * @param prismaService
   * @param bcryptHelper
   * @param rolesService
   */
  constructor(
    @Inject('USER_MODEL')
    private userModel: mongoose.Model<IUser>,
    private readonly bcryptHelper: BcryptHelper,
    private readonly rolesService: RolesService,
  ) {}

  /**
   * User creation from the import routine.
   * @param {CreateSiteUserDto} createSiteUserDto  Validated user data
   * @returns {Promise<User>} User entered.
   */
  async createUser(createSiteUserDto: CreateSiteUserDto): Promise<IUser> {
    const insert = <any>{ ...createSiteUserDto };
    insert.roleIDs = createSiteUserDto.roles;
    delete insert.roles;
    return this.userModel.create({ data: insert });
  }

  /**
   * User creation from the registration form.
   * @param {User} userData  User data type
   * @returns {Promise<User>} User entered.
   */
  async insertUser(userData): Promise<IUser> {
    return this.userModel.create({ data: userData });
  }

  /**
   * User creation from the administrator form.
   * @param {CreateSiteUserDto} createSiteUserDto  Validated user data
   * @returns {Promise<User>} User entered.
   */
  async createAdminUser(
    createAdminUserDto: CreateAdminUserDto,
  ): Promise<IUser> {
    const insert = <any>createAdminUserDto;
    insert.roles = await this.rolesService.getRolesIdsByNameArray(
      createAdminUserDto.roles,
    );
    insert.password = Boolean(insert.password)
      ? await this.bcryptHelper.encrypt(insert.password)
      : await this.bcryptHelper.encrypt(randomUUID());
    if (!insert.label) {
      insert.label = '';
    }
    delete insert.id;
    const newUser = new this.userModel(insert);
    return newUser.save();
  }

  async updateAdminUser(
    id: string | mongoose.Types.ObjectId,
    updateAdminUserDto: UpdateAdminUserDto,
  ) {
    const update = <any>updateAdminUserDto;
    update.roles = await this.rolesService.getRolesIdsByNameArray(
      updateAdminUserDto.roles,
    );
    delete update.id;
    update.password = Boolean(update.password)
      ? await this.bcryptHelper.encrypt(update.password)
      : await this.bcryptHelper.encrypt(randomUUID());
    if (!update.label) {
      update.label = '';
    }
    delete update.id;
    return this.userModel.updateOne({ id }, update);
  }

  /**
   * User creation from the administrator form.
   * @param {CreateSiteUserDto} createSiteUserDto  Validated user data
   * @returns {Promise<User>} User entered.
   */
  async createSiteUser(createSiteUserDto: CreateSiteUserDto): Promise<IUser> {
    const insert = <any>{ ...createSiteUserDto };
    insert.roleIDs = await this.rolesService.getRolesIdsByNameArray(['USER']);
    insert.password = await this.bcryptHelper.encrypt(randomUUID());
    delete insert.roles;
    delete insert.id;
    if (!insert.label) {
      insert.label = '';
    }
    return this.userModel.create({ data: insert });
  }

  /**
   * Creating users from Google login information
   * @param {CreateGoogleUserDto} createGoogleUserDto  Validated user data
   * @returns {Promise<User>} User entered.
   */
  async createGoogleUser(
    createGoogleUserDto: CreateGoogleUserDto,
  ): Promise<IUser> {
    const insert = <any>{ ...createGoogleUserDto };
    insert.roleIDs = await this.rolesService.getRolesIdsByNameArray(['USER']);
    insert.password = await this.bcryptHelper.encrypt(randomUUID());
    delete insert.roles;
    delete insert.accessToken;
    delete insert.refreshToken;
    delete insert.id;
    return this.userModel.create({ data: insert });
  }

  /**
   * Update a user's data
   * @param {string} userId  User ID.
   * @param {UpdateSiteUserDto} updateSiteUserDto  New validated user data
   * @returns {Promise<User>} User changed.
   */
  async updateUser(
    id: string | mongoose.Types.ObjectId,
    updateSiteUserDto: UpdateSiteUserDto,
  ) {
    const update = <any>{ ...updateSiteUserDto };
    if (updateSiteUserDto.avatar!) {
      const newPath =
        '/uploads/avatars/' + path.basename(updateSiteUserDto.avatar);
      return FileHelper.moveFileRelativePaths(
        updateSiteUserDto.avatar,
        newPath,
      ).then((updated) => {
        if (updated) {
          update.avatar = newPath;
        }
        delete update.roles;
        delete update.id;
        return this.userModel.updateOne({ id }, update);
      });
    } else {
      delete update.roles;
      delete update.id;
      return this.userModel.updateOne({ id }, update);
    }
  }

  /**
   * Returns a user's data based on their email.
   * @param {string} email User email
   * @returns {Promise<User>} User changed.
   */
  async getUserByEmail(email: string): Promise<IUser> {
    return await this.userModel
      .findOne({ email })
      .populate('roles', { _id: true })
      .select({
        id: true,
        name: true,
        email: true,
        password: true,
        enabled: true,
        label: true,
        roles: true,
      });
  }

  /**
   * Compares a word with another encrypted word.
   * @param {string} plainPassword Word without encryption
   * @param {string} password Word with encryption
   * @returns {string} If the texts match.
   */
  public comparePassword(plainPassword: string, password: string): boolean {
    return bcrypt.compareSync(plainPassword, password);
  }

  /**
   * Returns a user's ID from their name.
   * @param {string} name User name
   * @returns {Promise<IUser>} User ID Object
   */
  async getUserIdByName(name: string): Promise<IUser> {
    return this.userModel.findOne({ name }).select({ id: true });
  }

  /**
   * Returns all registered users, checks whether the user requesting has privileges.
   * @param {any} user  User making the request
   * @returns {Promise<IUser[]>} User's data
   */
  async getAllUsers(user: any): Promise<IUser[]> {
    const isSuperAdmin = user.roles
      .map((role) => role.name)
      .includes('SUPER_ADMIN');
    return this.userModel
      .find(
        !isSuperAdmin
          ? {
              NOT: { roleIDs: { hasSome: await this._adminsRolesIds() } },
            }
          : {
              NOT: { roleIDs: { hasSome: await this._superAdminsRoleId() } },
            },
      )
      .select({
        id: true,
        name: true,
        email: true,
        enabled: true,
        user_name: true,
        label: true,
        avatar: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      });
  }

  /**
   * Get a specific user's information from the Recovery Token, takes into account whether the token has expired.
   * @param {string} recoveryToken  User Token Recovery
   * @returns {Promise<IUser>} User ID.
   */
  async getUserDataByRecoveryToken(recoveryToken: string): Promise<IUser> {
    return await this.userModel
      .findOne({
        recoveryToken: recoveryToken,
        recoveryExpire: { gte: moment().toDate() },
      })
      .select({ id: true })
      .then();
  }

  /**
   * Checks if the User email is in use.
   * @param {VerifyEmailSiteUserDto} verifyEmailSiteUserDto  Validated user email
   * @returns {Promise<User>} User data.
   */
  async existUserEmail(
    verifyEmailSiteUserDto: VerifyEmailSiteUserDto,
  ): Promise<IUser> {
    return this.userModel.findOne(verifyEmailSiteUserDto);
  }

  /**
   * Checks if the Username is in use.
   * @param {VerifyUserNameSiteUserDto} verifyUserNameSiteUserDto  Validated user username
   * @returns {Promise<User>} User data.
   */
  async existUserUserName(
    verifyUserNameSiteUserDto: VerifyUserNameSiteUserDto,
  ): Promise<IUser> {
    return this.userModel.findOne(verifyUserNameSiteUserDto);
  }

  /**
   * Remove user from ID.
   * @param {string} userId  User ID
   * @returns {Promise<User>} User data.
   */
  async removeUser(userId: string): Promise<IUser> {
    return this.userModel.deleteOne({ _id: userId }).then();
  }

  /**
   * Disable user from ID.
   * @param {string} userId  User ID
   * @returns {Promise<User>} User data.
   */
  async disableUser(userId: any): Promise<IUser> {
    return this.userModel.updateOne({ id: userId }, { enabled: false }).then();
  }

  /**
   * Enable user from ID.
   * @param {string} userId  User ID
   * @returns {Promise<User>} User data.
   */
  async enableUser(userId: string): Promise<IUser> {
    return this.userModel.updateOne({ id: userId }, { enabled: true }).then();
  }

  /**
   * Get information from a specific user, no ID roles
   * @param {string} userId  User ID
   * @returns {Promise<IUser>} User data.
   */
  async getBaseUserById(userId: string): Promise<IUser> {
    return await this.userModel.findOne({ id: userId }).select({
      id: true,
      name: true,
      email: true,
      avatar: true,
      label: true,
      roles: {
        select: {
          name: true,
        },
      },
    });
  }

  /**
   * Get information from a specific user.
   * @param {string} userId  User ID
   * @returns {Promise<IUser>} User data.
   */
  async getAnyUserById(userId: string): Promise<any> {
    return await this.userModel
      .findById({ _id: userId })
      .populate('roles', { _id: true, name: true })
      .select({
        id: true,
        name: true,
        email: true,
        avatar: true,
        label: true,
        refreshToken: true,
        roles: true,
      });
  }

  /**
   * Get email from a specific user
   * @param {string} userId  User ID
   * @returns {Promise<IUser>} User data.
   */
  async getMailInformationUserById(userId: string): Promise<IUser> {
    return await this.userModel
      .findById(userId)
      .select({
        name: true,
        email: true,
      })
      .exec();
  }

  /**
   * Setting a new password for a specific user from the password change, checks whether the user who is editing has the right to edit.
   * @param {string} userId  User ID
   * @param {boolean} isSuperAdmin  New Password validation
   * @returns {Promise<IUser>} User data.
   */
  async getUserById(userId: string, isSuperAdmin: boolean): Promise<IUser> {
    const user = await this.userModel
      .findOne({
        AND: [
          {
            id: userId,
          },
          !isSuperAdmin
            ? {
                NOT: { roleIDs: { hasSome: await this._adminsRolesIds() } },
              }
            : {
                NOT: { roleIDs: { hasSome: await this._superAdminsRoleId() } },
              },
        ],
      })
      .select({
        id: true,
        name: true,
        email: true,
        enabled: true,
        avatar: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      });
    return user;
  }

  /**
   * Set new password from a given user from change password form.
   * @param {string} userId  User ID.
   * @param {UpdatePasswordUserDto} updatePasswordUserDto  Validated new password data
   * @returns {Promise<User>} User data
   */
  async changeUserPassword(
    userId: string,
    updatePasswordUserDto: UpdatePasswordUserDto,
  ) {
    return this.userModel
      .updateOne(
        { id: userId },
        {
          password: await this.bcryptHelper.encrypt(
            updatePasswordUserDto.password,
          ),
        },
      )
      .then();
  }

  /**
   * Set New Password from a given user from the import routine.
   * @param {string} userId  User ID.
   * @param {string} newPassword  New Password value.
   * @returns {Promise<User>} User data
   */
  async setPasswordUser(userId: string, newPassword: string): Promise<IUser> {
    return this.userModel
      .updateOne(
        { id: userId },
        { password: await this.bcryptHelper.encrypt(newPassword) },
      )
      .then();
  }

  /**
   * Set Recovery Password Token from a given user
   * @param {string} userId  User ID
   * @param {string} recoveryToken  Recovery Password Token value
   * @returns {Promise<User>} User data
   */
  async setRecoveryTokenUser(
    userId: any,
    recoveryToken: string,
  ): Promise<IUser> {
    return this.userModel
      .updateOne(
        { id: userId },
        {
          recoveryToken,
          recoveryExpire: moment().add(5, 'minutes').toDate(),
        },
      )
      .then();
  }

  /**
   * Inserts the Google Recovery Token value into the user information in the database.
   * @param {string} email  User email
   * @param {string} refreshToken  Refresh Token value
   * @returns {Promise<User>} User data
   */
  async setGoogleRefreshTokenByUserEmail(
    email: string,
    refreshToken: string,
  ): Promise<IUser> {
    return this.userModel
      .updateOne({
        where: { email },
        data: {
          googleRefreshToken: refreshToken,
        },
      })
      .then();
  }

  /**
   * Removes Recovery Password Token from a given user
   * @param {string} userId  User ID
   * @returns {Promise<User>} User data
   */
  async deleteRecoveryTokenUser(userId: string): Promise<IUser> {
    return this.userModel
      .updateOne(
        { id: userId },
        {
          recoveryToken: null,
          recoveryExpire: moment().subtract(10, 'year').toDate(),
        },
      )
      .then();
  }

  /**
   * Update refresh token from a given user
   * @param {string} userId  User ID
   * @param {string} refreshToken  New Refresh Token value
   * @returns {Promise<User>} User data
   */
  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<IUser> {
    return this.userModel.updateOne({ id: userId }, { refreshToken }).then();
  }

  /**
   * Removes Refresh Token from a given user
   * @param {string} userId  User ID
   * @returns {Promise<User>} User data
   */
  async removeRefreshTokenByUserId(userId: string): Promise<IUser> {
    return this.userModel
      .updateOne({ id: userId }, { refreshToken: null })
      .then();
  }

  /**
   * @internal
   * Gets the SUPER ADMIN IDs from the database
   * @returns {string[]} Array with Ids
   */
  private async _superAdminsRoleId(): Promise<any[]> {
    return await this.rolesService.getRolesIdsByNameArray(['SUPER_ADMIN']);
  }

  /**
   * @internal
   * Gets the ADMIN and SUPER ADMIN IDs from the database
   * @returns {string[]} Array with Ids
   */
  private async _adminsRolesIds(): Promise<any[]> {
    return this.rolesService.getRolesIdsByNameArray(['ADMIN', 'SUPER_ADMIN']);
  }
}
