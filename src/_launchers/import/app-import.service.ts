import { Injectable } from '@nestjs/common';

import { MenusImport } from 'src/_standalone/import-db/users/menus.import';
import { PermissionsImport } from 'src/_standalone/import-db/users/permissions.import';
import { RolesImport } from 'src/_standalone/import-db/users/roles.import';
import { UsersImport } from 'src/_standalone/import-db/users/users.import';

@Injectable()
export class AppImportService {
  constructor(
    private menusImport: MenusImport,
    private permissionsImport: PermissionsImport,
    private rolesImport: RolesImport,
    private usersImport: UsersImport,
  ) {
    this.permissionsImport.start().then(() => {
      this.rolesImport.start().then(() => {
        this.menusImport.start().then(() => {
          this.usersImport.start().then();
        });
      });
    });
  }
}
