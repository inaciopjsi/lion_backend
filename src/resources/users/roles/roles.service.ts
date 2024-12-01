import { Inject, Injectable } from '@nestjs/common';

import { CreateSiteRoleDto } from './dto/create-site-role.dto';
import { UpdateSiteRoleDto } from './dto/update-site-role.dto';

import { IRole } from 'src/connections/users/roles/roles.interfaces';

import { Model } from 'mongoose';

/**
 *
 */
@Injectable()
export class RolesService {
  /**
   * @ignore
   * @param prismaService
   *
   */
  constructor(
    @Inject('ROLE_MODEL')
    private roleModel: Model<IRole>,
  ) {}

  /**
   *
   * @param createSiteRoleDto
   * @returns
   */
  async createRole(createSiteRoleDto: CreateSiteRoleDto): Promise<IRole> {
    const insert = <any>createSiteRoleDto;
    insert.permanent = insert.permanent || false;
    delete insert.id;
    const createdRole = new this.roleModel(insert);
    return createdRole.save();
  }

  /**
   *
   * @param id
   * @param updateSiteRoleDto
   * @returns
   */
  async updateRole(id: any, updateSiteRoleDto: UpdateSiteRoleDto) {
    const update = <any>updateSiteRoleDto;
    delete update.id;
    update.permanent = update.permanent || false;
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
    return (
      await this.roleModel
        .find({ name: { in: roles } })
        .select({
          id: true,
        })
        .exec()
    ).map((role) => role._id);
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
