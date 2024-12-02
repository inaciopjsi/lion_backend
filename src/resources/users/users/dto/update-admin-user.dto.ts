import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminUserDto } from './create-admin-user.dto';

/**
 * User change request validator via form
 */
export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {}
