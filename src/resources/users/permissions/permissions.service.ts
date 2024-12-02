import { Inject, Injectable } from '@nestjs/common';

import { CreateSitePermissionDto } from './dto/create-site-permission.dto';
import { UpdateSitePermissionDto } from './dto/update-site-permission.dto';

import { IPermission } from 'src/connections/users/permissions/permissions.interface';

import * as mongoose from 'mongoose';

/**
 *
 */
@Injectable()
export class PermissionsService {
  /**
   * @ignore
   * @param prismaService
   *
   */
  constructor(
    @Inject('PERMISSION_MODEL')
    private permissionModel: mongoose.Model<IPermission>,
  ) {}

  /**
   *
   * @param createSitePermissionDto
   * @returns
   */
  async createPermission(
    createSitePermissionDto: CreateSitePermissionDto,
  ): Promise<any> {
    const insert = <any>createSitePermissionDto;
    insert.permanent = insert.permanent || false;
    insert.createdAt = Date.now();
    insert.updatedAt = Date.now();
    delete insert.id;
    return this.permissionModel.insertMany(insert);
  }

  /**
   *
   * @param id
   * @param updateSitePermissionDto
   * @returns
   */
  async updatePermission(
    id: any,
    updateSitePermissionDto: UpdateSitePermissionDto,
  ) {
    const update = <any>updateSitePermissionDto;
    delete update.id;
    update.permanent = update.permanent || false;
    update.updatedAt = Date.now();
    return this.permissionModel.findByIdAndUpdate(id, update);
  }

  /**
   *
   * @param permissionsIds
   * @returns
   */
  async findPermissionsByArray(permissionsIds: any[]): Promise<any[] | null> {
    return this.permissionModel.find({ id: { $in: permissionsIds } }).then();
  }

  /**
   *
   * @param id
   * @param isSuperAdmin
   * @returns
   */
  async getPermissionById(id: any, isSuperAdmin: boolean) {
    return this.permissionModel
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
      })
      .then();
  }

  /**
   *
   * @param isSuperAdmin
   * @returns
   */
  async getAllPermissions(isSuperAdmin: boolean) {
    return this.permissionModel
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
      })
      .then();
  }

  /**
   *
   * @param verifySitePermissionDto
   * @returns
   */
  async existPermissionName(verifySitePermissionDto) {
    return this.permissionModel.findOne(verifySitePermissionDto).then();
  }

  /**
   *
   * @param isSuperAdmin
   * @returns
   */
  async getAllPermissionsToRoles(isSuperAdmin: boolean) {
    return this.permissionModel
      .find(
        !isSuperAdmin
          ? {
              AND: [
                {
                  permanent: false,
                },
                {
                  enabled: true,
                },
              ],
            }
          : {
              enabled: true,
            },
      )
      .select({
        id: true,
        name: true,
        description: true,
      })
      .then();
  }

  /**
   *
   * @param id
   * @returns
   */
  async removePermission(id: any) {
    return this.permissionModel.findByIdAndDelete(id);
  }

  /**
   *
   * @param id
   * @returns
   */
  async disablePermission(id: any) {
    return this.permissionModel.findByIdAndUpdate(id, { enabled: false });
  }

  /**
   *
   * @param id
   * @returns
   */
  async enablePermission(id: any) {
    return this.permissionModel.findByIdAndUpdate(id, { enabled: true });
  }

  /**
   *
   * @param permissions
   * @returns
   */
  async getPermissionsByNameArray(permissions: string[]) {
    return this.permissionModel
      .find({
        name: { $in: permissions },
      })
      .select({
        id: true,
        name: true,
        description: true,
        enabled: true,
      })
      .then();
  }

  /**
   *
   * @param permissions
   * @returns
   */
  async getPermissionsIdsByNameArray(permissions: string[]) {
    return await this.permissionModel
      .find({ name: { $in: permissions } })
      .select({
        id: true,
      });
  }

  /**
   *
   * @param name
   * @returns
   */
  async getPermissionByName(name) {
    return this.permissionModel.findOne({ name }).then();
  }

  /**
   *
   * @param name
   * @returns
   */
  async getPermissionIdByName(name) {
    return this.permissionModel.findOne({ name });
  }
}
