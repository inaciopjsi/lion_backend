import { PartialType } from '@nestjs/mapped-types';
import { CreateSitePermissionDto } from './create-site-permission.dto';

export class UpdateSitePermissionDto extends PartialType(
  CreateSitePermissionDto,
) {}
