import { Injectable } from '@nestjs/common';

import { CreateSitePermissionDto } from 'src/resources/users/permissions/dto/create-site-permission.dto';
import { UpdateSitePermissionDto } from 'src/resources/users/permissions/dto/update-site-permission.dto';

import { PermissionsService } from 'src/resources/users/permissions/permissions.service';

@Injectable()
export class PermissionsImport {
  private static startPermissionsArray = [
    {
      name: 'FULL_CONTROL',
      description: 'Usuário sem limitação',
      enabled: true,
      permanent: true,
    },
    {
      name: 'MANAGER_ROLES',
      description: 'Gerenciar permissões de usuários',
      enabled: true,
      permanent: true,
    },
    {
      name: 'MANAGER_USERS',
      description: 'Gerenciar usuários comuns',
      enabled: true,
      permanent: true,
    },
    {
      name: 'MANAGER_CAMPAIGNS',
      description: 'Gerenciar campanhas',
      enabled: true,
      permanent: true,
    },
    {
      name: 'MANAGER_PLANS',
      description: 'Gerenciamento de itens, produtos e planos ',
      enabled: true,
      permanent: true,
    },
    {
      name: 'MANAGER_ALL_SPORTS',
      description: 'Edição de funcionalidades em todos os esportes',
      enabled: true,
      permanent: true,
    },
    {
      name: 'MANAGER_FOOTBALL',
      description: 'Edição de funcionalidades no football',
      enabled: true,
      permanent: true,
    },
    {
      name: 'VIP_ALL_SPORTS',
      description:
        'Usuários com funcionalidades especiais em todos os esportes',
      enabled: true,
      permanent: true,
    },
    {
      name: 'VIP_FOOTBALL',
      description: 'Usuários com funcionalidades especiais no football',
      enabled: true,
      permanent: true,
    },
  ];

  constructor(private readonly permissionsService: PermissionsService) {}

  async start() {
    return await this._addPermission(PermissionsImport.startPermissionsArray);
  }

  private async _addPermission(permissions: any[]): Promise<void> {
    const promisesPermission = permissions.map(async (permission: any) => {
      return await this.permissionsService
        .getPermissionByName(permission.name)
        .then(async (_oldPermission: any) => {
          const newPermission = permission as CreateSitePermissionDto;
          !!_oldPermission
            ? await this.permissionsService.updatePermission(
                _oldPermission.id,
                newPermission as UpdateSitePermissionDto,
              )
            : await this.permissionsService.createPermission(newPermission);
        });
    });
    await Promise.all(promisesPermission);
  }
}
