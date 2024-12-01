import { Injectable } from '@nestjs/common';

import { MenusService } from 'src/resources/users/menus/menus.service';
import { RolesService } from 'src/resources/users/roles/roles.service';

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
      parentName: 'SITE',
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
      parentName: 'SITE',
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
      parentName: 'ADMIN',
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
      parentName: 'ADMIN',
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
      parentName: 'ADMIN_MANAGER',
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
      parentName: 'ADMIN_MANAGER',
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
      parentName: 'ADMIN_MANAGER_SALES',
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
      parentName: 'ADMIN_MANAGER_SALES',
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
      parentName: 'ADMIN_MANAGER_SALES',
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
      parentName: 'ADMIN_MANAGER',
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
      parentName: 'ADMIN_MANAGER_USERS',
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
      parentName: 'ADMIN_MANAGER_USERS',
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
      parentName: 'ADMIN_MANAGER_USERS',
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

  constructor(
    private readonly menusService: MenusService,
    private readonly rolesService: RolesService,
  ) {}

  async start() {
    return await this._addMenu(MenusImport.startMenusArray);
  }

  private async _addMenu(menus: any[]): Promise<void> {
    menus.map(async (menu) => {
      const newMenu = menu as any;
      const _oldMenu = (await this.menusService.getMenuByName(
        menu.name,
      )) as any;
      const _parentMenu = Boolean(menu.parentName)
        ? await this.menusService.getMenuIdByName(menu.parentName)
        : null;
      const _rolesArrayDb = (await this.rolesService.getRolesByNameArray(
        menu.roles,
      )) as any[];
      newMenu.roles = _rolesArrayDb?.map((role) => role.id) || [];
      newMenu.parent = _parentMenu?.id;
      delete newMenu.parentName;
      !!_oldMenu
        ? await this.menusService.updateMenu(_oldMenu.id, newMenu)
        : await this.menusService.createMenu(newMenu);
      return;
    });
  }
}
