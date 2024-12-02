import { Inject, Injectable } from '@nestjs/common';

import * as mongoose from 'mongoose';

import { IRole } from 'src/connections/users/roles/roles.interfaces';

import { CreateSiteRoleDto } from 'src/resources/users/roles/dto/create-site-role.dto';
import { UpdateSiteRoleDto } from 'src/resources/users/roles/dto/update-site-role.dto';

import { PermissionsService } from 'src/resources/users/permissions/permissions.service';

/**
 *
 */
@Injectable()
export class RolesService {
  /**
   * Creates an instance of RolesService.
   * @param {mongoose.Model<IRole>} roleModel
   * @param {PermissionsService} permissionsService
   * @memberof RolesService
   */
  constructor(
    @Inject('ROLE_MODEL')
    private roleModel: mongoose.Model<IRole>,
    private readonly permissionsService: PermissionsService,
  ) {}

  /**
   *
   * @param createSiteRoleDto
   * @returns
   */
  async createRole(createSiteRoleDto: CreateSiteRoleDto): Promise<IRole> {
    const insert = <any>createSiteRoleDto;
    delete insert.id;
    insert.permanent = insert.permanent || false;
    const permissionsArray =
      await this.permissionsService.getPermissionsIdsByNameArray(
        createSiteRoleDto.permissions,
      );
    insert.permissions = permissionsArray;
    insert.createdAt = Date.now();
    insert.updatedAt = Date.now();
    const newRole = new this.roleModel(insert);
    return newRole.save();
  }

  /**
   *
   * @param id
   * @param updateSiteRoleDto
   * @returns
   */
  async updateRole(
    id: string | mongoose.Types.ObjectId,
    updateSiteRoleDto: UpdateSiteRoleDto,
  ) {
    const update = <any>updateSiteRoleDto;
    delete update.id;
    const permissionsArray =
      await this.permissionsService.getPermissionsIdsByNameArray(
        updateSiteRoleDto.permissions,
      );
    update.permissions = permissionsArray;
    update.permanent = update.permanent || false;
    update.updatedAt = Date.now();
    return this.roleModel.findByIdAndUpdate(id, update);
  }

  /**
   *
   * @param rolesIds
   * @returns
   */
  async findRolesByArray(rolesIds: any[]): Promise<IRole[]> {
    return this.roleModel.find({ id: { in: rolesIds } }).exec();
  }

  /**
   *
   * @param id
   * @param isSuperAdmin
   * @returns
   */
  async getRoleById(id: any, isSuperAdmin: boolean) {
    return this.roleModel
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
  async getAllRoles(isSuperAdmin: boolean) {
    return this.roleModel
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
   * @param verifySiteRoleDto
   * @returns
   */
  async existRoleName(verifySiteRoleDto) {
    return this.roleModel.findOne(verifySiteRoleDto);
  }

  /**
   *
   * @param isSuperAdmin
   * @returns
   */
  async getAllRolesToMenu(isSuperAdmin: boolean) {
    return this.roleModel
      .find({
        AND: [
          {
            name: !isSuperAdmin
              ? {
                  not: {
                    in: ['SUPER_ADMIN', 'ADMIN'],
                  },
                }
              : {
                  not: 'SUPER_ADMIN',
                },
          },
          {
            enabled: true,
          },
        ],
      })
      .select({
        id: true,
        name: true,
        description: true,
      });
  }

  /**
   *
   * @param isSuperAdmin
   * @returns
   */
  async getAllRolesToUsers(isSuperAdmin: boolean) {
    return this.roleModel
      .find({
        AND: [
          {
            name: !isSuperAdmin
              ? {
                  not: {
                    in: ['SUPER_ADMIN', 'ADMIN'],
                  },
                }
              : {
                  not: 'SUPER_ADMIN',
                },
          },
          {
            enabled: true,
          },
        ],
      })
      .select({
        id: true,
        name: true,
        description: true,
      });
  }

  /**
   *
   * @param isSuperAdmin
   * @returns
   */
  async getAllRolesToUser(isSuperAdmin: boolean) {
    return this.roleModel
      .find({
        permanent: isSuperAdmin ? { not: null } : false,
        enabled: true,
        name: isSuperAdmin
          ? {
              not: {
                in: ['SUPER_ADMIN', 'ADMIN'],
              },
            }
          : {
              not: 'SUPER_ADMIN',
            },
      })
      .select({
        id: true,
        name: true,
        description: true,
        enabled: true,
      });
  }

  /**
   *
   * @param id
   * @returns
   */
  async removeRole(id: any) {
    return this.roleModel.deleteOne({ _id: id });
  }

  /**
   *
   * @param id
   * @returns
   */
  async disableRole(id: any) {
    return this.roleModel.updateOne({ _id: id }, { enabled: false });
  }

  /**
   *
   * @param id
   * @returns
   */
  async enableRole(id: any) {
    return this.roleModel.updateOne({ _id: id }, { enabled: true });
  }

  /**
   *
   * @param roles
   * @returns
   */
  async getRolesByNameArray(roles: string[]) {
    return this.roleModel.find({ name: { in: roles } }).select({
      id: true,
      name: true,
      description: true,
      enabled: true,
    });
  }

  /**
   *
   * @param roles
   * @returns
   */
  async getRolesIdsByNameArray(roles: string[]) {
    return await this.roleModel.find({ name: { $in: roles } }).select({
      id: true,
    });
  }

  /**
   *
   * @param name
   * @returns
   */
  async getRoleByName(name) {
    return this.roleModel.findOne({ name });
  }

  /**
   *
   * @param name
   * @returns
   */
  async getRoleIdByName(name) {
    return this.roleModel.findOne({ name });
  }
}
