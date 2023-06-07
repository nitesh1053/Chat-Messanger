class MissingParamError extends Error {
    constructor(param) {
      super(param);
      this.name = this.constructor.name;
      this.param = param;
    }
  }
  
  class HttpStatusError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode || 500;
    }
  }
  
  class ResourceNotFoundError extends Error {
    constructor(model) {
      super(JSON.stringify(model));
      const { resource, type, id } = model;
      this.name = this.constructor.name;
      this.resource = resource;
      this.type = type;
      this.id = id;
    }
  }
  
  ResourceNotFoundError.types = {
    FILE: 'FILE',
    DATABASE_DOCUMENT: 'DATABASE_DOCUMENT',
    API_RESPONSE: 'API_RESPONSE',
  };
  
  const httpErrorStatusCodes = {
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    NOT_IMPLEMENTED: 501,
  };
  
  module.exports = {
    MissingParamError,
    ResourceNotFoundError,
    HttpStatusError,
    httpErrorStatusCodes,
  };
  