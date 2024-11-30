import { Global, Module } from '@nestjs/common';

import { UsersDatabaseModule } from './users/users.database.module';

import { UsersProviders } from './users/users/users.providers';
import { MenusProviders } from './users/menus/menus.providers';
import { NewslettersProviders } from './users/newsletters/newsletters.providers';
import { PermissionsProviders } from './users/permissions/permissions.providers';
import { RolesProviders } from './users/roles/roles.providers';

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
