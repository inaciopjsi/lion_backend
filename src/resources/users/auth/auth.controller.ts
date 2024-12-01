import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { SiteSignUpDto } from './dto/site-sign-up.dto';

import { SigninGuard } from 'src/guards/signin.guard';
import { HttpResponseHelper } from 'src/helpers/http-response.helper';
import { JwtRefreshGuard } from 'src/guards/jwt-refresh.guard';
import { Public } from 'src/decorators/public.decorator';

import { SiteRecovery } from './dto/site-recovery';
import { SitePasswordChange } from './dto/site-password-change';
import { SiteTokenPasswordChange } from './dto/site-token-password-change';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(SigninGuard)
  @Post('/local/signin')
  async signinLocal(@Req() request: Request, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .json(
        HttpResponseHelper.successResponse(
          await this.authService.getJwtToken(
            request.user,
            (request.body as any)?.keepLogged === 'true',
          ),
          '/auth/local/signin',
          HttpResponseHelper.POST,
        ),
      );
  }

  @Public()
  @Post('/local/signup')
  async signupLocal(
    @Res() response: Response,
    @Body(new ValidationPipe({ transform: true }))
    siteSignUpDto: SiteSignUpDto,
  ) {
    response
      .status(HttpStatus.CREATED)
      .json(
        HttpResponseHelper.successResponse(
          (await this.authService.signupUser(siteSignUpDto))
            ? { message: 'user created successfully' }
            : null,
          '/auth/local/signup',
          HttpResponseHelper.POST,
        ),
      );
  }

  @Post('/logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    await this.authService.removeRefreshToken(request.user);
    response
      .status(HttpStatus.NO_CONTENT)
      .json(
        HttpResponseHelper.successResponse(
          {},
          '/auth/logout',
          HttpResponseHelper.POST,
        ),
      );
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh-token')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    response
      .status(HttpStatus.CREATED)
      .json(
        HttpResponseHelper.successResponse(
          await this.authService.refreshJwtToken(request?.user),
          '/auth/refresh-token',
          HttpResponseHelper.POST,
        ),
      );
  }

  @Public()
  @Post('/recover')
  private async postCreateRecoveryLink(
    @Res() response: Response,
    @Body(new ValidationPipe({ transform: true }))
    siteRecovery: SiteRecovery,
  ) {
    if (await this.authService.createRecoveryLink(siteRecovery)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { created: true },
            '/auth/recovery',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Post('/password-change-token')
  private async postVerifyTokenPasswordChange(
    @Res() response: Response,
    @Body(new ValidationPipe({ transform: true }))
    siteTokenPasswordChange: SiteTokenPasswordChange,
  ) {
    if (
      await this.authService.verifyTokenPasswordChange(siteTokenPasswordChange)
    ) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { verified: true },
            '/auth/password-change-token',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Post('/password-change')
  private async postChangePasswordByRecoveryCode(
    @Res() response: Response,
    @Body(new ValidationPipe({ transform: true }))
    sitePasswordChange: SitePasswordChange,
  ) {
    if (await this.authService.changePasswordByLink(sitePasswordChange)) {
      return response
        .status(HttpStatus.OK)
        .json(
          HttpResponseHelper.successResponse(
            { changed: true },
            '/auth/password-change',
            HttpResponseHelper.POST,
          ),
        );
    } else {
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Get('/google')
  @UseGuards(AuthGuard('google-oauth'))
  async googleAuth() {}

  @Public()
  @Get('/google/callback')
  @UseGuards(AuthGuard('google-oauth'))
  async googleAuthRedirect(@Req() request: Request, @Res() response: Response) {
    if (!request.user) {
      response.redirect(
        this.configService.get('app.frontendServer') +
          '/auth/signin?err=google',
      );
    } else {
      const jwt = await this.authService.googleLogin(request);
      const uri =
        this.configService.get('app.frontendServer') +
        `/google/success/${btoa(JSON.stringify(jwt))}`;
      response.redirect(encodeURI(uri));
    }
  }
}
