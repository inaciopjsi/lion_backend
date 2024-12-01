import { Inject, Injectable } from '@nestjs/common';

import mongoose from 'mongoose';

import { IItem } from 'src/connections/sales/items/items.interface';

import { CreateSiteItemDto } from 'src/resources/sales/items/dto/create-site-item.dto';
import { UpdateSiteItemDto } from 'src/resources/sales/items/dto/update-site-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @Inject('ITEM_MODEL')
    private itemModel: mongoose.Model<IItem>,
  ) {}

  /**
   *
   * @param createSiteItemDto
   * @returns
   */
  async createItem(createSiteItemDto: CreateSiteItemDto): Promise<any> {
    const insert = <any>createSiteItemDto;
    insert.permanent = insert.permanent || false;
    delete insert.id;
    return this.itemModel.create({ data: insert });
  }

  /**
   *
   * @param id
   * @param updateSiteItemDto
   * @returns
   */
  async updateItem(id: any, updateSiteItemDto: UpdateSiteItemDto) {
    const update = <any>updateSiteItemDto;
    delete update.id;
    update.permanent = update.permanent || false;
    return this.itemModel.findByIdAndUpdate(id, update);
  }

  /**
   *
   * @param id
   * @param isSuperAdmin
   * @returns
   */
  async getItemById(id: any, isSuperAdmin: boolean) {
    return this.itemModel
      .findOne({
        AND: [
          !isSuperAdmin
            ? {
                permanent: false,
              }
            : {
                OR: [
                  {
                    permanent: true,
                  },
                  {
                    permanent: false,
                  },
                ],
              },
          {
            id: id,
          },
        ],
      })
      .select({
        id: true,
        name: true,
        description: true,
        enabled: true,
        permanent: true,
      });
  }

  /**
   *
   * @param isSuperAdmin
   * @returns
   */
  async getAllItems(isSuperAdmin: boolean) {
    return this.itemModel
      .find(
        !isSuperAdmin
          ? {
              permanent: false,
            }
          : {
              OR: [
                {
                  permanent: true,
                },
                {
                  permanent: false,
                },
              ],
            },
      )
      .select({
        id: true,
        name: true,
        description: true,
        enabled: true,
        permanent: true,
      });
  }

  /**
   *
   * @param verifySiteItemDto
   * @returns
   */
  async existItemName(verifySiteItemDto) {
    return this.itemModel.findOne(verifySiteItemDto);
  }

  /**
   *
   * @param isSuperAdmin
   * @returns
   */
  async getAllItemsToProduct() {
    return this.itemModel
      .find({
        enabled: true,
      })
      .select({
        id: true,
        name: true,
        description: true,
      });
  }

  /**
   *
   * @param id
   * @returns
   */
  async removeItem(id: any) {
    return this.itemModel.findByIdAndDelete(id);
  }

  /**
   *
   * @param id
   * @returns
   */
  async disableItem(id: any) {
    return this.itemModel.findByIdAndUpdate(id, { enabled: false });
  }

  /**
   *
   * @param id
   * @returns
   */
  async enableItem(id: any) {
    return this.itemModel.findByIdAndUpdate(id, { enabled: true });
  }

  /**
   *
   * @param name
   * @returns
   */
  async getItemByName(name) {
    return this.itemModel.findOne({ name });
  }
}
