import { Type } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

const arrayPaymentType = [
  'credit_card',
  'debit_card',
  'bank_transfer',
  'ticket',
  'atm',
  'onboarding_credits',
  'wallet_purchase',
];

const arrayIdentificationType = ['CPF', 'CNPJ'];

class AddressAIDTO {
  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  street_name: string;

  @IsString()
  @IsNotEmpty()
  street_number: string;
}

class AddressDTO {
  @IsString()
  @IsNotEmpty()
  federal_unit: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  street_name: string;

  @IsString()
  @IsNotEmpty()
  street_number: string;
}

class IdentificationDTO {
  @IsString()
  @IsNotEmpty()
  @IsIn(arrayIdentificationType)
  type: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}

class PayerDTO {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => IdentificationDTO)
  readonly identification: IdentificationDTO;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDTO)
  readonly address: AddressDTO;
}

class PayerAIDTO {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressAIDTO)
  readonly address: AddressAIDTO;
}

class AdditionalInfoDTO {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PayerAIDTO)
  readonly payer: PayerAIDTO;
}

class FormDataDTO {
  @IsString()
  @IsNotEmpty()
  payment_method_id: string;

  @IsNumber()
  @IsNotEmpty()
  transaction_amount: number;

  @IsString()
  @IsOptional()
  token: string;

  @IsString()
  @IsOptional()
  issuer_id: number;

  @IsNumber()
  @IsOptional()
  installments: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PayerDTO)
  readonly payer: PayerDTO;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AdditionalInfoDTO)
  readonly additional_info: AdditionalInfoDTO;
}

export class CreateProcessPaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(arrayPaymentType)
  readonly paymentType: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(arrayPaymentType)
  readonly selectedPaymentMethod: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FormDataDTO)
  readonly formData: FormDataDTO;
}
