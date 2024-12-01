import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteUserDto } from './create-site-user.dto';

/**
 * User change request validator via form
 */
export class UpdateSiteUserDto extends PartialType(CreateSiteUserDto) {}
