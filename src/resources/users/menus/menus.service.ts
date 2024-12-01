import { Inject, Injectable } from '@nestjs/common';

import { IMenu } from 'src/connections/users/menus/menus.interface';

import { CreateSiteMenuDto } from './dto/create-site-menu.dto';
import { UpdateSiteMenuDto } from './dto/update-site-menu.dto';
import { VerifyNameSiteMenuDto } from './dto/verify-name-site-menu.dto';

import * as mongoose from 'mongoose';

@Injectable()
export class MenusService {
  constructor(
    @Inject('MENU_MODEL')
    private menuModel: mongoose.Model<IMenu>,
  ) {}

  async createMenu(createSiteMenuDto: CreateSiteMenuDto): Promise<any> {
    const insert = <any>createSiteMenuDto;
    insert.root = Boolean(!createSiteMenuDto.parent);
    insert.parentId = <string>createSiteMenuDto.parent;
    insert.roleIDs = <string[]>createSiteMenuDto.roles;
    insert.permanent = insert.permanent || false;
    delete insert.roles;
    delete insert.parent;
    delete insert.id;
    return this.menuModel.create({
      data: <any>createSiteMenuDto,
    });
  }

  async updateMenu(menuId: string, updateSiteMenuDto: UpdateSiteMenuDto) {
    const update = <any>updateSiteMenuDto;
    update.root = Boolean(!updateSiteMenuDto.parent);
    update.parentId = <string>updateSiteMenuDto.parent;
    update.roleIDs = <string[]>updateSiteMenuDto.roles;
    update.permanent = update.permanent || false;
    delete update.roles;
    delete update.parent;
    delete update.id;
    return this.menuModel.findByIdAndUpdate(menuId, update);
  }

  async getMenuByName(name: string) {
    return this.menuModel.findOne({ name });
  }

  async getMenuIdByName(parentName: string) {
    return this.menuModel
      .findOne({ name: parentName })
      .select({ id: true })
      .then();
  }

  async getAllMenus(isSuperAdmin: boolean) {
    return this.menuModel
      .find({
        AND: [
          !isSuperAdmin
            ? {
                permanent: false,
              }
            : {
                OR: [
                  {
                    permanent: true,
                  },
                  {
                    permanent: false,
                  },
                ],
              },
          {
            name: { notIn: ['SITE', 'ADMIN'] },
          },
        ],
      })
      .select({
        id: true,
        name: true,
        description: true,
        label: true,
        parent: {
          select: {
            id: true,
            name: true,
          },
        },
        iconImg: true,
        routerLink: true,
        internal: true,
        url: true,
        target: true,
        enabled: true,
        permanent: true,
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
      })
      .then();
  }

  async getMenuById(id: any, isSuperAdmin: boolean) {
    return this.menuModel
      .findOne({
        AND: [
          !isSuperAdmin
            ? {
                permanent: false,
              }
            : {
                OR: [
                  {
                    permanent: true,
                  },
                  {
                    permanent: false,
                  },
                ],
              },
          {
            id: id,
          },
        ],
      })
      .then();
  }

  async getAllMenusToMenu() {
    return this.menuModel.find().select({
      id: true,
      name: true,
      admin: true,
    });
  }

  async existMenuName(
    verifyNameSiteMenuDto: VerifyNameSiteMenuDto,
  ): Promise<any> {
    return this.menuModel.findOne({ name: verifyNameSiteMenuDto.name });
  }

  async removeMenu(id: any) {
    return this.menuModel.findByIdAndDelete(id);
  }

  async disableMenu(id: any) {
    return this.menuModel.findByIdAndUpdate(id, { enabled: false });
  }

  async enableMenu(id: any) {
    return this.menuModel.findByIdAndUpdate(id, { enabled: true });
  }

  async getAnyMenusByArrayRoles(roles: string[]): Promise<IMenu[]> {
    return this.menuModel
      .find({ AND: [{ enabled: true }, { roleIDs: { hasSome: roles } }] })
      .select({
        id: true,
        name: true,
        label: true,
        root: true,
        description: true,
        parentId: true,
        iconImg: true,
        routerLink: true,
        internal: true,
        admin: true,
        url: true,
        target: true,
        visible: true,
      });
  }
}
