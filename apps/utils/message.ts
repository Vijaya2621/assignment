/*
 * @file:message.ts
 * @description: It contain response messages.
 */

// success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successfully',

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
};

//error messages
export const ERROR_MESSAGES = {
  SOMETHING_WENT_WRONG: 'Something went wrong',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  TOKEN_REQUIRED: 'Auth token is requried.',
  TOKEN_EXPIRED: 'Session expired, please login again.',
  VALIDATION_ERROR: 'Validation error',
  UNAUTHORIZED_USER: 'Unauthorized user',
  INVALIDLOGIN: 'Invalid login request. Please check and try again.',
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

//status code
export const STATUSCODE = {
  SUCCESS: 200,
  BADREQUEST: 400,
  SERVERERROR: 501,
  INTERNALSERVERERROR: 500,
  FORBIDDEN: 203,
  NOTFOUND: 204,
  NOTALLOWED: 205,
  FAILED: 401,
  EMAILORUSEREXIST: 207,
  WRONGPASSWORD: 208,
  ACCOUNTDEACTIVATED: 209,
  AUTHTOKENREQUIRED: 499,
  UNAUTHORIZED: 403,
};
