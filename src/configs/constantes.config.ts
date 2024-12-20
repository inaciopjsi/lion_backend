export const constantsConfig = {
  APPLICATION_NAME: 'Lion Sports Trading',
  APPLICATION_LOGS: {
    debug: true,
    log: true,
    warm: true,
    error: true,
    verbose: true,
    fatal: true,
  },
  IS_HTTPS: true,
  SECRET_JWT:
    '26aedf29d2c5f6860293fd1cb61f5cc3ba64e14f9a5aa53fd05b709f5f7b80001f0c2017e705d70a9f69b12007403d238954b8f26d02f1ee29c7e0fa633afadb6a134b07363a4ee9975ee75380d5a652d72344a3a4b4930cc79b0bc012e0d9ac998a2442db5d7678d3c59c25e57f0dd06a5247d597f4d02816f7edae336cf8bde9e6ddbf8ab81eadab23c543e012bafa42945296db638ba4f4e7354e9bd75876de3dbdd182012d086d96a35a61833a533e627817ca4b1ad0a5fe93b7d28f6b18f7f8ae55ef054499489f125e2ee0f7dff39d73bf3f88c29d2ca77232feecac7f1150e31a11e9c94305987e9f15102e90e8190876573ae82041028afc821cab0f',
  HTTP_PORT: 3000,
  HTTPS_PORT: 5001,
  SALT_WORK_FACTOR: 10,
  SECRET_SESSION:
    '8008284843d662327781f5f54dceabfa5372e00a4299721a4fe854b4c6ded9b5',
  TOKEN_EXPIRY: 60 * 60 * 1,
  TOKEN_EXPIRY_KEEP_LOGGED: 60 * 60 * 24,
  COOKIE_EXPIRY: 60 * 5,
  SECRET_COOKIES:
    'df3ef337247e65c799032e8d7c63ef271872635c62a66508529ba768f8e27ae4',
  DEFAULT_PATH: 'api/v3',
  TIME_RATE_LIMIT: 15 * 60 * 1000,
  NUMBER_RATE_LIMIT: 100, // limit each IP to NUMBER_RATE_LIMIT requests per TIME_RATE_LIMIT
  CONNECTION_TIMEOUT: '15s',
  CORS_ORIGIN: 'https://localhost:4200',
  ENCRYPTATION_SECRET: 'd6F3Efeq',
} as const;
