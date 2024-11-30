import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class BcryptHelper {
  constructor(private configService: ConfigService) {}

  async encrypt(text: string) {
    const salt = await bcrypt.genSalt(
      this.configService.get<number>('app.saltWorkFactor'),
    );
    text = await bcrypt.hash(text, salt);
    return text;
  }

  static compare(text, hash): boolean {
    return bcrypt.compareSync(text, hash);
  }

  static UUID(): string {
    return crypto.randomUUID();
  }
}
