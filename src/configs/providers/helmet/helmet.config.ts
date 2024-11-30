import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { HelmetOptions } from 'helmet';
import { IncomingMessage, ServerResponse } from 'http';

/**
 *
 * Configurações da biblioteca Helmet - Help secure Express apps by setting HTTP response headers.
 *
 * @class HelmetConfig
 */
@Injectable()
export class HelmetConfig {
  /**
   * Instancia ConfigService para os valores enviroment.
   * @param {*} constantsConfig
   * @param {ConfigService} configService
   * @memberof HelmetConfig
   */
  constructor(
    @Inject('CONTANTS_CONFIG') private constantsConfig,
    private readonly configService: ConfigService,
  ) {}

  /**
   *
   *
   * @readonly
   * @type {HelmetOptions}
   * @memberof HelmetConfig
   */
  public get helmetOptions(): HelmetOptions {
    return {
      /**
       * O Content-Security-Policy cabeçalho atenua um grande número de ataques, como cross-site scripting.
       * [cross-site scripting.](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).
       * [Documentação.](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).
       *
       */
      //contentSecurityPolicy: <ContentSecurityPolicyOptions>{},

      /**
       * O Cross-Origin-Embedder-Policy cabeçalho ajuda a controlar quais recursos podem ser carregados cross-origin.
       * [Documentação](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy).
       *
       */
      //crossOriginEmbedderPolicy: <CrossOriginEmbedderPolicyOptions>{},

      /**
       * O Cross-Origin-Opener-Policy cabeçalho ajuda a isolar o processo da sua página.
       * [Documentação.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy).
       *
       */
      //crossOriginOpenerPolicy: <CrossOriginOpenerPolicyOptions>{},

      /**
       * O Cross-Origin-Resource-Policy cabeçalho bloqueia outros de carregar seus recursos cross-origin em alguns casos.
       * see [here for more detail.](https://resourcepolicy.fyi).
       * [Documentação.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy).
       *
       */
      crossOriginResourcePolicy: <CrossOriginResourcePolicyOptions>{
        policy: 'cross-origin',
      },

      /**
       * O Origin-Agent-Cluster cabeçalho fornece um mecanismo para permitir que aplicativos da web isolem suas origens de outros processo
       * [Artigo.](https://whatpr.org/html/6214/origin.html#origin-keyed-agent-clusters).
       *
       */
      //originAgentCluster: true,

      /**
       * O Referrer-Policy cabeçalho que controla quais informações são definidas no cabeçalho Refererda solicitação .
       * Veja [here for more detail.](https://developer.mozilla.org/en-US/docs/Web/Security/Referer_header:_privacy_and_security_concerns).
       * [Documentação.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy).
       *
       */
      //referrerPolicy: <ReferrerPolicyOptions>{},
    };
  }
}

type ReferrerPolicyToken =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'same-origin'
  | 'origin'
  | 'strict-origin'
  | 'origin-when-cross-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url'
  | '';

type ContentSecurityPolicyDirectiveValueFunction = (
  req: IncomingMessage,
  res: ServerResponse,
) => string;
type ContentSecurityPolicyDirectiveValue =
  | string
  | ContentSecurityPolicyDirectiveValueFunction;

interface ContentSecurityPolicyOptions {
  useDefaults?: boolean;
  directives?: Record<
    string,
    | null
    | Iterable<ContentSecurityPolicyDirectiveValue>
    | typeof dangerouslyDisableDefaultSrc
  >;
  reportOnly?: boolean;
}

interface CrossOriginEmbedderPolicyOptions {
  policy?: 'require-corp' | 'credentialless' | 'unsafe-none';
}

interface CrossOriginOpenerPolicyOptions {
  policy?: 'same-origin' | 'same-origin-allow-popups' | 'unsafe-none';
}

interface CrossOriginResourcePolicyOptions {
  policy?: 'same-origin' | 'same-site' | 'cross-origin';
}

interface ReferrerPolicyOptions {
  policy?: ReferrerPolicyToken | ReferrerPolicyToken[];
}

/**
 * O Strict-Transport-Security cabeçalho diz aos navegadores para preferir HTTPS em vez de HTTP inseguro.
 * Veja [here for more detail.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security).
 *
 * Você pode usar isso como middleware autônomo com app.use(helmet.strictTransportSecurity()).
 *
 */

interface StrictTransportSecurityOptions {
  maxAge?: number;
  includeSubDomains?: boolean;
  preload?: boolean;
}

/**
 * O X-DNS-Prefetch-Control cabeçalho ajuda a controlar a pré-busca de DNS, o que pode melhorar a privacidade do usuário em detrimento do desempenho.
 * [Documentação.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control).
 *
 * Você pode usar isso como middleware autônomo com app.use(helmet.xDnsPrefetchControl()).
 *
 */
interface XDnsPrefetchControlOptions {
  allow?: boolean;
}

/**
 * O cabeçalho legado X-Frame-Options para ajudar você a mitigar ataques de clickjacking . Este cabeçalho foi substituído pela diretiva
 * frame-ancestors Content Security Policy, mas ainda é útil em navegadores antigos ou se nenhum CSP for usado.
 * Documentação [here for more detail.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control).
 *
 * [Clickjacking.](https://en.wikipedia.org/wiki/Clickjacking).
 * [frame-ancestors.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).
 * [Documentação.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).
 *
 * Você pode usar isso como middleware autônomo com app.use(helmet.xPoweredBy()).
 *
 */
interface XFrameOptionsOptions {
  action?: 'deny' | 'sameorigin';
}

declare const dangerouslyDisableDefaultSrc: unique symbol;

/**
 *  app.use (
 *    helmet ( {
 *      xContentTypeOptions: false,
 *    }),
 *  );
 *
 * O X-Content-Type-Options atenua o sniffing do tipo MIME que pode causar problemas de segurança.
 * [Documentação.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options).
 *
 * Você pode usar isso como middleware autônomo com app.use(helmet.xContentTypeOptions()).
 *
 */

/**
 *  app.use (
 *    helmet ( {
 *      xDownloadOptions: false,
 *    }),
 *  );
 *
 * O X-Download-Options cabeçalho é específico para o Internet Explorer 8. Ele força downloads potencialmente inseguros a serem salvos, mitigando a execução de HTML no contexto do seu site.
 * [Documentação.](https://learn.microsoft.com/en-us/archive/blogs/ie/ie8-security-part-v-comprehensive-protection).
 *
 * Você pode usar isso como middleware autônomo com app.use(helmet.xDownloadOptions()).
 *
 */

/**
 *  app.use (
 *    helmet ( {
 *      xXssProtection: false,
 *    }),
 *  );
 *
 * O Helmet desabilita o filtro de script entre sites com bugs dos navegadores ao definir o X-XSS-Protectioncabeçalho legado para 0
 * [Documentação.](https://learn.microsoft.com/en-us/archive/blogs/ie/ie8-security-part-v-comprehensive-protection).
 *
 * Você pode usar isso como middleware autônomo com app.use(helmet.xXssProtection()).
 *
 */
