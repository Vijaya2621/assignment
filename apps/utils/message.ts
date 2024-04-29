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
  PERMISSION_DENIED_TO_CREATE_HOSPITAL:
    'Insufficient permissions to create hospital',
  PERMISSION_DENIED_TO_CREATE_HEALTH_CARE_WORKER:
    'Insufficient permissions to create healthcareworker',
  PERMISSION_DENIED_TO_CREATE_PATIENT:
    'Insufficient permissions to create patient',
  PERMISSION_DENIED_TO_GET_HOSPITAL: 'Insufficient permissions to get hospital',
  PERMISSION_DENIED_TO_GET_HEALTH_CARE_WORKER:
    'Insufficient permissions to get healthcareworker',
  PERMISSION_DENIED_TO_GET_PATIENT: 'Insufficient permissions to get patient',
  PERMISSION_DENIED_TO_DELETE_HOSPITAL:
    'Insufficient permissions to delete hospital',
  PERMISSION_DENIED_TO_DELETE_HEALTH_CARE_WORKER:
    'Insufficient permissions to delete healthcareworker',
  PERMISSION_DENIED_TO_DELETE_PATIENT:
    'Insufficient permissions to delete patient',
  PERMISSION_DENIED_TO_UPDATE_HOSPITAL:
    'Insufficient permissions to update hospital',
  PERMISSION_DENIED_TO_UPDATE_HEALTH_CARE_WORKER:
    'Insufficient permissions to update healthcareworker',
  PERMISSION_DENIED_TO_UPDATE_PATIENT:
    'Insufficient permissions to update patient',
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
