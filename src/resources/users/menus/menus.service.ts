import { Inject, Injectable } from '@nestjs/common';

import * as mongoose from 'mongoose';

import { IMenu } from 'src/connections/users/menus/menus.interface';

import { RolesService } from 'src/resources/users/roles/roles.service';

import { CreateSiteMenuDto } from 'src/resources/users/menus/dto/create-site-menu.dto';
import { UpdateSiteMenuDto } from 'src/resources/users/menus/dto/update-site-menu.dto';
import { VerifyNameSiteMenuDto } from 'src/resources/users/menus/dto/verify-name-site-menu.dto';

@Injectable()
export class MenusService {
  constructor(
    @Inject('MENU_MODEL')
    private menuModel: mongoose.Model<IMenu>,
    private readonly rolesService: RolesService,
  ) {}

  async createMenu(createSiteMenuDto: CreateSiteMenuDto): Promise<any> {
    const insert = <any>createSiteMenuDto;
    delete insert.id;
    insert.root = Boolean(!createSiteMenuDto.parent);
    insert.parentId = Boolean(createSiteMenuDto.parent)
      ? (await this.getMenuIdByName(createSiteMenuDto.parent))?._id || undefined
      : undefined;
    const rolesArray = await this.rolesService.getRolesIdsByNameArray(
      createSiteMenuDto.roles,
    );
    insert.roles = rolesArray;
    insert.permanent = insert.permanent || false;
    insert.createdAt = Date.now();
    insert.updatedAt = Date.now();
    const newMenu = new this.menuModel(insert);
    return newMenu.save();
  }

  async updateMenu(
    id: string | mongoose.Types.ObjectId,
    updateSiteMenuDto: UpdateSiteMenuDto,
  ) {
    const update = <any>updateSiteMenuDto;
    delete update.id;
    update.root = Boolean(!updateSiteMenuDto.parent);
    update.parentId = Boolean(updateSiteMenuDto.parent)
      ? (await this.getMenuIdByName(updateSiteMenuDto.parent))._id
      : null;
    const rolesArray = await this.rolesService.getRolesIdsByNameArray(
      updateSiteMenuDto.roles,
    );
    update.roles = rolesArray;
    update.permanent = update.permanent || false;
    update.updatedAt = Date.now();
    return this.menuModel.findByIdAndUpdate(id, update);
  }

  async getMenuByName(name: string) {
    return this.menuModel.findOne({ name });
  }

  async getMenuIdByName(menuName: string) {
    return this.menuModel
      .findOne({ name: menuName })
      .select({ id: true })
      .exec();
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
