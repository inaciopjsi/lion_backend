import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as moment from 'moment/moment';

import { UsersService } from 'src/resources/users/users/users.service';
import { RolesService } from 'src/resources/users/roles/roles.service';
import { ArrayHelper } from 'src/helpers/array.helper';
import { BcryptHelper } from 'src/helpers/bcrypt.helper';

import { SiteRecovery } from './dto/site-recovery';
import { SitePasswordChange } from './dto/site-password-change';
import { SiteTokenPasswordChange } from './dto/site-token-password-change';
import { SiteSignUpDto } from './dto/site-sign-up.dto';
import { CreateGoogleUserDto } from '../users/dto/create-google-user.dto';
import { VerifyEmailSiteUserDto } from '../users/dto/verify-email-site-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly configService: ConfigService,
    private readonly bcryptHelper: BcryptHelper,
    private readonly jwtService: JwtService,
  ) {}

  async authUser(auth: any) {
    const user = (await this.usersService.getUserByEmail(auth.email)) as any;
    if (user) {
      const passVerified = this.usersService.comparePassword(
        auth.password,
        user.password,
      );
      if (passVerified) {
        return user;
      }
    }
    throw new UnauthorizedException();
  }

  async getJwtToken(user: any, keepLogged = false) {
    const rolesIds = ArrayHelper.uniqueArray(user.roles);
    return this.rolesService.findRolesByArray(rolesIds).then(async (roles) => {
      const rolesNames: string[] = [];
      roles?.forEach((role) => {
        rolesNames.push(role.name);
      });

      return this._token(user._id, keepLogged, roles);
    });
  }

  async refreshJwtToken(user: any) {
    if (
      this.usersService.comparePassword(
        user.refresh_token.replace('Bearer', '').trim(),
        user.refreshToken,
      )
    ) {
      return this._token(user._id, user.keepLogged, user.roles);
    }
    throw new UnauthorizedException();
  }

  async createRecoveryLink(siteRecovery: SiteRecovery): Promise<any> {
    const user = await this.usersService.getUserByEmail(siteRecovery.email);
    if (user) {
      const token = BcryptHelper.UUID();
      const resp = Promise.all([
        this.usersService.setRecoveryTokenUser(user._id, token),
        //this.systemMailService.sendAuthRecoveryEmail(user, token),
      ]);
      return resp
        .then((arrayResponses) => {
          // if (arrayResponses[0].id && arrayResponses[1].accepted.length > 0) {
          if (arrayResponses[0]._id) {
            return true;
          }
        })
        .catch(() => {
          throw new InternalServerErrorException();
        });
    }
  }

  async verifyTokenPasswordChange(
    siteTokenPasswordChange: SiteTokenPasswordChange,
  ): Promise<any> {
    return this.usersService
      .getUserDataByRecoveryToken(siteTokenPasswordChange.token)
      .then((r) => Object.keys(r));
  }

  async signupUser(siteSignUpDto: SiteSignUpDto): Promise<any> {
    delete siteSignUpDto.confirm_password;
    siteSignUpDto.password = await this.bcryptHelper.encrypt(
      siteSignUpDto.password,
    );
    const insert = <any>siteSignUpDto;
    insert.roleIDs = [(await this.rolesService.getRoleByName('USER')).id];
    return this.usersService.insertUser(insert);
  }

  async changePasswordByLink(
    sitePasswordChange: SitePasswordChange,
  ): Promise<any> {
    delete sitePasswordChange.confirm_password;
    const user = await this.usersService.getUserDataByRecoveryToken(
      sitePasswordChange.recoveryCode,
    );
    if (user) {
      this.usersService.deleteRecoveryTokenUser(user._id.toString());
      return this.usersService.changeUserPassword(
        user._id.toString(),
        sitePasswordChange,
      );
    } else {
      throw new InternalServerErrorException();
    }
  }

  async removeRefreshToken(user: any) {
    return this.usersService.removeRefreshTokenByUserId(user.id);
  }

  private async _token(id, keepLogged, rolesNames): Promise<any> {
    const refreshToken = this.jwtService.sign({
      id,
      keepLogged,
      expiresIn: keepLogged
        ? moment().unix() +
          this.configService.get<number>('server.tokenExpireKeepLoged')
        : moment().unix() +
          this.configService.get<number>('server.tokenExpire'),
    });

    this.usersService.updateRefreshToken(
      id,
      await this.bcryptHelper.encrypt(refreshToken),
    );

    const ExpireIn = moment().unix() + 60 * 15;

    return {
      token: this.jwtService.sign({
        id: id,
        roles: rolesNames,
        expiresIn: ExpireIn,
      }),
      expiresIn: ExpireIn,
      refreshToken: refreshToken,
    };
  }

  async googleLogin(req: any) {
    const loginUser = <CreateGoogleUserDto>{ ...req.user };
    let user = await this.usersService.existUserEmail(<VerifyEmailSiteUserDto>{
      email: loginUser.email,
    });
    if (!user) {
      await this.usersService.createGoogleUser(loginUser);
      user = await this.usersService.existUserEmail(<VerifyEmailSiteUserDto>{
        email: loginUser.email,
      });
    }
    await this.usersService.setGoogleRefreshTokenByUserEmail(
      loginUser.email,
      req.user.refreshToken,
    );
    const rolesIds = user.roles;
    return this.rolesService.findRolesByArray(rolesIds).then(async (roles) => {
      const rolesNames: string[] = [];
      roles?.forEach((role) => {
        rolesNames.push(role.name);
      });
      return this._token(user._id, false, roles);
    });
  }
}
