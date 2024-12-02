import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';

import * as path from 'path';
import * as mongoose from 'mongoose';

import { FileHelper } from 'src/helpers/file.helper';

import { IMenu } from 'src/connections/users/menus/menus.interface';

import { MenusService } from '../menus/menus.service';
import { UsersService } from '../users/users.service';

import { IUser, IUserBase } from 'src/connections/users/users/users.interface';

import { MyPasswordChange } from './dto/my-password-change';
import { UpdateSiteMeDto } from './dto/update-site-user.dto';

@Injectable()
/**
 * Class that returns data from the logged in user (used by common users)
 */
export class UserService {
  /**
   * @ignore
   * @param usersService
   * @param menusService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly menusService: MenusService,
    @Inject('USER_MODEL')
    private userModel: mongoose.Model<IUser>,
  ) {}

  async updateMe(id: string, updateSiteMeDto: UpdateSiteMeDto) {
    const update = <any>{ ...updateSiteMeDto };
    const newPath = '/uploads/avatars/' + path.basename(updateSiteMeDto.avatar);
    return FileHelper.moveFileRelativePaths(
      updateSiteMeDto.avatar,
      newPath,
    ).then((updated) => {
      if (updated) {
        update.avatar = newPath;
      }
      delete update.roles;
      delete update.id;
      return this.userModel.updateOne({ _id: id }, update);
    });
  }

  /**
   * Gets logged in user data
   * @param {string} id User ID whose data is being requested
   * @returns {Promise<IUser>} User data.
   */
  async getMySelf(id: string): Promise<IUserBase> {
    return await this.usersService.getAnyUserById(id);
  }

  /**
   * Gets logged in user data
   * @param {string} id User ID whose data is being requested
   * @returns {Promise<IUser>} User data.
   */
  async getMyData(userId: string): Promise<object | PromiseLike<object>> {
    const user = await this.userModel
      .findById(userId)
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
      })
      .then();
    return user;
  }

  /**
   * Gets logged in user email
   * @param {string} id User ID whose data is being requested
   * @returns {Promise<IUser>} User data.
   */
  async getMyMailInformation(id: string): Promise<IUser> {
    return await this.usersService.getMailInformationUserById(id).then();
  }

  /**
   * Returns the menus linked to the roles passed via parameter. The menus are organized in a tree format.
   * @param {any[]} roles Array of objects with the IDs of the menu roles to be consulted
   * @returns {Promise<IMenu[]>} Organized menus
   */
  async getMyMenus(roles: any[]): Promise<IMenu[]> {
    const menusDb = await this.menusService.getAnyMenusByArrayRoles(
      roles.map((role) => role.id),
    );
    return await this._organizeMenu(menusDb).sort((a: any, b: any) =>
      a.items?.length > b.items?.length ? 1 : -1,
    );
  }

  /**
   * Returns the menus linked to the roles passed via parameter. The menus are organized in a tree format.
   * @param {any[]} roles Array of objects with the IDs of the menu roles to be consulted
   * @returns {Promise<IMenu[]>} Organized menus
   */
  async changePassword(userId: any, myPasswordChange: MyPasswordChange) {
    const passVerified = this.usersService.comparePassword(
      myPasswordChange.oldPassword,
      await this._getMyPassword(userId),
    );
    if (passVerified) {
      delete myPasswordChange.confirm_password;
      return this.usersService.changeUserPassword(userId, myPasswordChange);
    } else {
      throw new NotAcceptableException();
    }
  }

  private async _getMyPassword(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select({
        password: true,
      })
      .then();
    return user.password;
  }

  /**
   * @internal
   * Filter the main menus
   * @param {IMenu[]} menus Array with menus linked to roles passed by parameters
   * @returns {IMenu[]} Full menu
   */
  private _organizeMenu(menus: IMenu[]): IMenu[] {
    const menuArray = menus.filter((menu) => menu.root);
    return this._organizeMenuFiltered(menuArray, menus);
  }

  /**
   * @internal
   * Organizes menus into branches.
   * @param {IMenu[]} menuFiltered Filtered root menus
   * @param {IMenu[]} menus Array with menus linked to roles passed by parameters
   * @returns {IMenu[]} Sub tree of each root menu
   */
  private _organizeMenuFiltered(
    menuFiltered: IMenu[],
    menus: IMenu[],
  ): IMenu[] {
    const ret = menuFiltered.map((menud: any) => {
      const returnMenu = {
        label: menud.label,
      } as any;
      const items = this._organizeMenuFiltered(
        menus.filter((menu: any) => menu.parentId == menud.id),
        menus,
      );
      items.length ? (returnMenu.items = items) : null;
      menud.iconImg ? (returnMenu.iconImg = menud.iconImg) : null;
      returnMenu.visible = menud.visible;
      if (menud.internal) {
        menud.routerLink ? (returnMenu.routerLink = menud.routerLink) : null;
      } else {
        menud.url ? (returnMenu.url = menud.url) : null;
        menud.target ? (returnMenu.target = menud.target) : null;
      }
      return returnMenu;
    });

    return ret.sort((a: any, b: any) =>
      Object.values(b).indexOf('Dashboard') > -1 ||
      Object.values(b).indexOf('Menus') > -1
        ? 1
        : -1,
    );
  }
}
