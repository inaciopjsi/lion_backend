import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteItemDto } from './create-site-item.dto';

export class UpdateSiteItemDto extends PartialType(CreateSiteItemDto) {}
