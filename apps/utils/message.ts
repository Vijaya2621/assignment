/*
 * @file:message.ts
 * @description: It contain response messages.
 */

export const MESSAGES = {
  SOMETHING_WENT_WRONG: 'Something went wrong',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  TOKEN_REQUIRED: 'Auth token is requried.',
  TOKEN_EXPIRED: 'Session expired, please login again.',
  LOGIN: 'Login successfully',
  VALIDATION_ERROR: 'Validation error',

  INVALIDLOGIN: 'Invalid login request. Please check and try again.',

  CREATE: (value: string) => {
    return `${value} created successfully.`;
  },
  FETCH: (value: string) => {
    return `${value} fetched successfully.`;
  },
  UPDATE: (value: string) => {
    return `${value} updated successfully.`;
  },
  DELETE: (value: string) => {
    return `${value} deleted successfully.`;
  },
  NOTEXIST: (value: string) => {
    return `${value} not exist.`;
  },
  ALREADYEXIST: (value: string) => {
    return `${value} already exist.`;
  },
  errorLog: (functionName: string, controllerName: string, err: any) => {
    return `${functionName} ${controllerName} Error @ ${err}`;
  },
};

export const STATUSCODE = {
  success: 200,
  badRequest: 400,
  serverError: 501,
  internalservererror: 500,
  forbidden: 203,
  notFound: 204,
  notAllowed: 205,
  tokenExpired: 401,
  emailOrUserExist: 207,
  wrongPassword: 208,
  accountDeactivated: 209,
  authTokenRequired: 499,
  unauthorized: 403,
};
