import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteMeDto } from './create-site-me.dto';

/**
 * User change request validator via form
 */
export class UpdateSiteMeDto extends PartialType(CreateSiteMeDto) {}
