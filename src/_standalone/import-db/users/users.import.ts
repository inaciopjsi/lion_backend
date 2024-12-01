import { Injectable } from '@nestjs/common';

import { CreateSiteUserDto } from 'src/resources/users/users/dto/create-site-user.dto';
import { UpdateSiteUserDto } from 'src/resources/users/users/dto/update-site-user.dto';

import { UsersService } from 'src/resources/users/users/users.service';
import { RolesService } from 'src/resources/users/roles/roles.service';

@Injectable()
export class UsersImport {
  private static startUsersArray = [
    {
      name: 'Paulo Inácio',
      email: 'desenvolvedor.am@gmail.com',
      password: '|Senha|Secreta|12345|',
      enabled: true,
      label: 'Super Admin',
      roles: ['SUPER_ADMIN'],
    },
  ];

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async start() {
    return await this._addUser(UsersImport.startUsersArray);
  }

  private async _addUser(users: any[]): Promise<void> {
    users.forEach(async (user) => {
      let userInserted: any;
      const newUser = user as CreateSiteUserDto;
      const _oldUser = (await this.usersService.getUserByEmail(
        user.email,
      )) as any;
      newUser.roles =
        (await this.rolesService.getRolesIdsByNameArray(user.roles)) || [];
      !!_oldUser
        ? (userInserted = await this.usersService.updateUser(
            _oldUser.id,
            newUser as UpdateSiteUserDto,
          ))
        : (userInserted = await this.usersService.createUser(newUser));
      await this.usersService.setPasswordUser(userInserted.id, user.password);
    });
  }
}
