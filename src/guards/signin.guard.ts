import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SigninGuard extends AuthGuard('signin') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
