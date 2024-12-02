import { Injectable } from '@nestjs/common';

import { CreateSiteRoleDto } from 'src/resources/users/roles/dto/create-site-role.dto';
import { UpdateSiteRoleDto } from 'src/resources/users/roles/dto/update-site-role.dto';

import { RolesService } from 'src/resources/users/roles/roles.service';

/**
 *
 *
 * @export
 * @class RolesImport
 */
@Injectable()
export class RolesImport {
  /**
   *
   *
   * @private
   * @static
   * @memberof RolesImport
   */
  private static startRolesArray = [
    {
      name: 'SUPER_ADMIN',
      description:
        'Acesso a todas as funcionalidades, criação de usuários administrativos',
      enabled: true,
      permanent: true,
      permissions: ['FULL_CONTROL'],
    },
    {
      name: 'ADMIN',
      description: 'Acesso a todas as funcionalidades',
      enabled: true,
      permanent: true,
      permissions: [
        'MANAGER_ROLES',
        'MANAGER_USERS',
        'MANAGER_CAMPAIGNS',
        'MANAGER_PLANS',
        'MANAGER_ALL_SPORTS',
        'VIP_ALL_SPORTS',
      ],
    },
    {
      name: 'USER',
      description: 'Usuário cadastrado (Padrão)',
      enabled: true,
      permanent: true,
      permissions: [],
    },
    {
      name: 'OLD_USER',
      description: 'Usuário que já foram assinantes',
      enabled: true,
      permanent: true,
      permissions: [],
    },
  ];

  constructor(private readonly rolesService: RolesService) {}

  /**
   *
   *
   * @return {*}
   * @memberof RolesImport
   */
  async start() {
    return await this._addRole(RolesImport.startRolesArray);
  }

  /**
   *
   *
   * @private
   * @param {any[]} roles
   * @return {*}  {Promise<void>}
   * @memberof RolesImport
   */
  private async _addRole(roles: any[]): Promise<void> {
    const promisesRoles = roles.map(async (role: any) => {
      return await this.rolesService
        .getRoleByName(role.name)
        .then(async (_oldRole: any) => {
          const newRole = role as CreateSiteRoleDto;
          !!_oldRole
            ? await this.rolesService.updateRole(
                _oldRole.id,
                newRole as UpdateSiteRoleDto,
              )
            : await this.rolesService.createRole(newRole);
        });
    });
    await Promise.all(promisesRoles);
  }
}
