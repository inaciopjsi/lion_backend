import {
  Inject,
  Injectable,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { TransformerPackage } from '@nestjs/common/interfaces/external/transformer-package.interface';
import { ValidatorPackage } from '@nestjs/common/interfaces/external/validator-package.interface';

/**
 *
 *  Configurações globais do Validation
 *
 * @class ValidationPipeConfig
 */
@Injectable()
export class ValidationPipeConfig {
  /**
   * Instancia ConfigService para os valores enviroment.
   * @param {*} constantsConfig
   * @param {ConfigService} configService
   * @memberof ValidationPipeConfig
   */
  constructor(
    @Inject('CONTANTS_CONFIG') private constantsConfig,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Retorna as configuração especificas baseadas na interface JwtOptions
   *
   * @return {*}  {JwtModuleOptions}
   * @memberof ValidationPipeConfig
   */
  public get validationPipeOptions(): ValidationPipeOptions {
    return <ValidationPipeOptions>{
      /**
       * Se definido como verdadeiro, O class-validator imprimirá mensagens de aviso extras no console quando algo não estiver certo.
       */
      enableDebugMessages: this.constantsConfig.APPLICATION_LOGS.debug,
      /**
       * Se definido como verdadeiro, O validador ignorará a validação de todas as propriedades que não estão definidas no objeto de validação.
       */
      skipUndefinedProperties: false,
      /**
       * Se definido como verdadeiro, O validador ignorará a validação de todas as propriedades que são nulas no objeto de validação.
       */
      skipNullProperties: false,
      /**
       * Se definido como verdadeiro, O validador ignorará a validação de todas as propriedades que são nulas ou indefinidas no objeto de validação.
       */
      skipMissingProperties: false,
      /**
       * Se definido como true, o validador removerá do objeto validado quaisquer propriedades que não tenham decoradores.
       *
       * Dica: se nenhum outro decorador for adequado para sua propriedade, use @Allow decorator.
       */
      whitelist: true,
      /**
       * Se definido como verdadeiro, em vez de remover propriedades não incluídas na lista de permissões, o validador gerará um erro
       */
      forbidNonWhitelisted: true,
      /**
       * Grupos a serem usados ​​durante a validação do objeto.
       */
      groups: [],
      /**
       * Defina o padrão para a opção `always` de decoradores. O padrão pode ser substituído nas opções do decorador.
       */
      always: false,
      /**
       * Se [groups]{@link ValidatorOptions#groups} não for fornecido ou estiver vazio, ignore decoradores com pelo menos um grupo.
       */
      strictGroups: false,
      /**
       * Se definido como true, a validação não usará mensagens padrão. A mensagem de erro sempre será indefinida se não for definida explicitamente.
       */
      dismissDefaultMessages: false,
      /**
       * ValidationError special options.
       */
      validationError: {
        /**
         * Indica se o alvo deve ser exposto em ValidationError.
         */
        target: true,
        /**
         * Indica se o valor validado deve ser exposto em ValidationError.
         */
        value: true,
      },
      /**
       * Configurações verdadeiras causarão falha na validação de objetos desconhecidos.
       */
      forbidUnknownValues: true,
      /**
       * Quando definido como verdadeiro, a validação da propriedade fornecida será interrompida após encontrar o primeiro erro.
       * Isso é habilitado por padrão.
       */
      stopAtFirstError: false,
      transform: false,
      disableErrorMessages: false,
      transformOptions: <ClassTransformOptions>{},
      errorHttpStatusCode: <ErrorHttpStatusCode>{},
      exceptionFactory: (errors: ValidationError[]) => {},
      validateCustomDecorators: true,
      validatorPackage: <ValidatorPackage>{},
      transformerPackage: <TransformerPackage>{},
    };
  }
}
