export class HttpResponseHelper {
  static GET = 'GET';
  static POST = 'POST';
  static PUT = 'PUT';
  static PATCH = 'PATCH';
  static DELETE = 'DELETE';

  static successResponse(data: object, path = '', type: string) {
    return {
      [type]: path,
      errors: {},
      response: data ? data : [],
      timestamp: new Date().toISOString(),
    };
  }

  static errorResponse(errors: object, path = '', type: string) {
    return {
      [type]: path,
      errors: errors,
      response: {},
      timestamp: new Date().toISOString(),
    };
  }
}
