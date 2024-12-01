import { Injectable } from '@nestjs/common';
import { CreateSiteItemDto } from 'src/resources/sales/items/dto/create-site-item.dto';

import { ItemsService } from 'src/resources/sales/items/items.service';

@Injectable()
export class ItemsImport {
  private static startItemsArray = [
    {
      name: 'FOOTBALL_BASE',
      description: 'Estatisticas / filtros limitados',
      enabled: true,
      permanent: true,
    },
    {
      name: 'FOOTBALL_ALL',
      description:
        'Estatisticas / filtros Ilimitados / Telegram / Teste de filtros (Base Histórica)',
      enabled: true,
      permanent: true,
    },
  ];

  constructor(private readonly itemsService: ItemsService) {}

  async start() {
    return await this._addItem(ItemsImport.startItemsArray);
  }

  private async _addItem(items: CreateSiteItemDto[]): Promise<void> {
    items.forEach(async (item) => {
      const newItem = item;
      const _oldItem = await this.itemsService.getItemByName(item.name);
      !!_oldItem
        ? await this.itemsService.updateItem(_oldItem.id, newItem)
        : await this.itemsService.createItem(newItem);
    });
  }
}
