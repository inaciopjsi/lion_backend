import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteMenuDto } from './create-site-menu.dto';

export class UpdateSiteMenuDto extends PartialType(CreateSiteMenuDto) {}
