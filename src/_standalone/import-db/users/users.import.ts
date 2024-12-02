import { Injectable } from '@nestjs/common';

import { CreateAdminUserDto } from 'src/resources/users/users/dto/create-admin-user.dto';
import { UpdateAdminUserDto } from 'src/resources/users/users/dto/update-admin-user.dto';

import { UsersService } from 'src/resources/users/users/users.service';
import { IUser } from 'src/connections/users/users/users.interface';

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

  constructor(private readonly usersService: UsersService) {}

  async start() {
    return await this._addUser(UsersImport.startUsersArray);
  }

  private async _addUser(users: any[]): Promise<void> {
    const promisesUsers = users.map(async (user) => {
      return await this.usersService
        .getUserByEmail(user.email)
        .then(async (_oldUser: IUser) => {
          const newUser = user as CreateAdminUserDto;
          !!_oldUser
            ? await this.usersService.updateAdminUser(
                _oldUser.id,
                newUser as UpdateAdminUserDto,
              )
            : await this.usersService.createAdminUser(newUser);
        });
    });
    await Promise.all(promisesUsers);
  }
}
