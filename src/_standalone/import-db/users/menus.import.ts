import { Injectable } from '@nestjs/common';
import { IMenu } from 'src/connections/users/menus/menus.interface';
import { CreateSiteMenuDto } from 'src/resources/users/menus/dto/create-site-menu.dto';
import { UpdateSiteMenuDto } from 'src/resources/users/menus/dto/update-site-menu.dto';

import { MenusService } from 'src/resources/users/menus/menus.service';
import { RolesService } from 'src/resources/users/roles/roles.service';

/**
 *
 *
 * @export
 * @class MenusImport
 */
@Injectable()
export class MenusImport {
  private static startMenusArray = [
    {
      name: 'SITE',
      label: 'Home',
      root: true,
      description: 'Menu Home',
      admin: false,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    {
      name: 'SITE_DASHBOARD',
      label: 'Dashboard',
      root: false,
      description: 'Home / dashboard',
      parent: 'SITE',
      iconImg: 'assets/img/icons/bag.svg',
      routerLink: '/content/dashboard',
      internal: true,
      admin: false,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    {
      name: 'SITE_PROFILE',
      label: 'Profile',
      root: false,
      description: 'Home / profile',
      parent: 'SITE',
      routerLink: '/content/profile',
      internal: true,
      admin: false,
      enabled: true,
      permanent: true,
      visible: false,
      roles: ['SUPER_ADMIN', 'ADMIN', 'USER'],
    },
    {
      name: 'ADMIN',
      label: 'Administração',
      root: true,
      description: 'Menu Administração',
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'ADMIN_DASHBOARD',
      label: 'Dashboard',
      root: false,
      description: 'Administração / dashboard',
      parent: 'ADMIN',
      iconImg: 'assets/img/icons/bag.svg',
      routerLink: '/manager/dashboard',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER',
      label: 'Gerenciamento',
      root: false,
      description: 'Menu Administração / Gerenciamento',
      parent: 'ADMIN',
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_MENUS',
      label: 'Menus',
      root: false,
      description: 'Menu Administração / Gerenciamento / Menus',
      parent: 'ADMIN_MANAGER',
      iconImg: 'assets/img/icons/bookshelf.png',
      routerLink: '/manager/menus',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_SALES',
      label: 'Financeiro',
      root: false,
      description: 'Menu Administração / Gerenciamento / Financeiro',
      parent: 'ADMIN_MANAGER',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_SALES_ITEMS',
      label: 'Itens',
      root: false,
      description: 'Menu Administração / Gerenciamento / Financeiro / Itens',
      parent: 'ADMIN_MANAGER_SALES',
      iconImg: 'assets/img/icons/cardboard-box.png',
      routerLink: '/manager/items',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_SALES_PRODUCTS',
      label: 'Produtos',
      root: false,
      description: 'Menu Administração / Gerenciamento / Financeiro / Produtos',
      parent: 'ADMIN_MANAGER_SALES',
      iconImg: 'assets/img/icons/cardboard-box.png',
      routerLink: '/manager/products',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_SALES_PLANS',
      label: 'Planos',
      root: false,
      description: 'Menu Administração / Gerenciamento / Financeiro / Planos',
      parent: 'ADMIN_MANAGER_SALES',
      iconImg: 'assets/img/icons/cardboard-box.png',
      routerLink: '/manager/plans',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_USERS',
      label: 'Usuários',
      root: false,
      description: 'Menu Administração / Gerenciamento / Usuários',
      parent: 'ADMIN_MANAGER',
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_USERS_ROLES',
      label: 'Tipos de Usuários',
      root: false,
      description:
        'Menu Administração / Gerenciamento / Usuários / Tipos de Usuários',
      parent: 'ADMIN_MANAGER_USERS',
      iconImg: 'assets/img/icons/roles.png',
      routerLink: '/manager/roles',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_USERS_CANS',
      label: 'Permissões',
      root: false,
      description: 'Menu Administração / Gerenciamento / Usuários / Permissões',
      parent: 'ADMIN_MANAGER_USERS',
      iconImg: 'assets/img/icons/roles.png',
      routerLink: '/manager/permissions',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN'],
    },
    {
      name: 'ADMIN_MANAGER_USERS_USERS',
      label: 'Usuários',
      root: false,
      description: 'Menu Administração / Gerenciamento / Usuários / Usuários',
      parent: 'ADMIN_MANAGER_USERS',
      iconImg: 'assets/img/icons/user-account.png',
      routerLink: '/manager/users',
      internal: true,
      admin: true,
      enabled: true,
      permanent: true,
      visible: true,
      roles: ['SUPER_ADMIN', 'ADMIN'],
    },
  ];

  /**
   * Creates an instance of MenusImport.
   * @param {MenusService} menusService
   * @param {RolesService} rolesService
   * @memberof MenusImport
   */
  constructor(
    private readonly menusService: MenusService,
    private readonly rolesService: RolesService,
  ) {}

  /**
   *
   *
   * @return {*}
   * @memberof MenusImport
   */
  async start() {
    return await this._addMenu(MenusImport.startMenusArray);
  }

  /**
   *
   *
   * @private
   * @param {any[]} menus
   * @return {*}  {Promise<void>}
   * @memberof MenusImport
   */
  private async _addMenu(menus: any[]): Promise<void> {
    const promisesMenus = menus.map(async (menu) => {
      return await this.menusService
        .getMenuByName(menu.name)
        .then(async (_oldMenu: IMenu) => {
          const newMenu = menu as CreateSiteMenuDto;
          !!_oldMenu
            ? await this.menusService.updateMenu(
                _oldMenu.id,
                newMenu as UpdateSiteMenuDto,
              )
            : await this.menusService.createMenu(newMenu);
        });
    });
    await Promise.all(promisesMenus);
  }
}
