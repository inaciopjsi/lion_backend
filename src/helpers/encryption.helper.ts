import { Injectable } from '@nestjs/common';

import * as crypto from 'crypto';
import * as util from 'util';

import { constantsConfig } from 'src/configs/constantes.config';

@Injectable()
export class EncryptionHelper {
  private static algorithm = 'aes-256-ctr';
  private static iv = crypto.randomBytes(16);
  private static hashedEncryptionKey = crypto
    .createHash('sha256')
    .update(constantsConfig.ENCRYPTATION_SECRET)
    .digest('hex')
    .substring(0, 32);

  static encryptationText(plainText: string) {
    const cipher = crypto.createCipheriv(
      EncryptionHelper.algorithm,
      EncryptionHelper.hashedEncryptionKey,
      EncryptionHelper.iv,
    );
    let encryptedData = cipher.update(Buffer.from(plainText, 'utf-8'));
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);
    return `${EncryptionHelper.iv.toString('hex')}l${encryptedData.toString('hex')}`;
  }

  static decipherText(encryptedText: string) {
    const [ivAsHex, encryptedDataAsHex] = encryptedText.split('l');
    const iv = Buffer.from(ivAsHex, 'hex');
    const decipher = crypto.createDecipheriv(
      EncryptionHelper.algorithm,
      EncryptionHelper.hashedEncryptionKey,
      iv,
    );
    let decryptedText = decipher.update(Buffer.from(encryptedDataAsHex, 'hex'));
    decryptedText = Buffer.concat([decryptedText, decipher.final()]);
    return decryptedText.toString();
  }
}
