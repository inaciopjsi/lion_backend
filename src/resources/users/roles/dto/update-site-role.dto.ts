import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteRoleDto } from './create-site-role.dto';

export class UpdateSiteRoleDto extends PartialType(CreateSiteRoleDto) {}
