import { Global, Module } from '@nestjs/common';

import { UsersDatabaseModule } from 'src/connections/users/users.database.module';

import { UsersProviders } from 'src/connections/users/users/users.providers';
import { MenusProviders } from 'src/connections/users/menus/menus.providers';
import { NewslettersProviders } from 'src/connections/users/newsletters/newsletters.providers';
import { PermissionsProviders } from 'src/connections/users/permissions/permissions.providers';
import { RolesProviders } from 'src/connections/users/roles/roles.providers';

@Global()
@Module({
  imports: [UsersDatabaseModule],
  providers: [
    ...MenusProviders,
    ...NewslettersProviders,
    ...PermissionsProviders,
    ...RolesProviders,
    ...UsersProviders,
  ],
  exports: [
    ...MenusProviders,
    ...NewslettersProviders,
    ...PermissionsProviders,
    ...RolesProviders,
    ...UsersProviders,
  ],
})
export class UsersConnectionsModule {}
