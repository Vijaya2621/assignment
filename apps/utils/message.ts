/*
 * @file:message.ts
 * @description: It contain response messages.
 */

// success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login_successfully',

  CREATE: (value: string) => {
    return `${value} created_successfully.`;
  },
  FETCH: (value: string) => {
    return `${value} fetched_successfully.`;
  },
  UPDATE: (value: string) => {
    return `${value} updated_successfully.`;
  },
  DELETE: (value: string) => {
    return `${value} deleted_successfully.`;
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
    'Insufficient permissions to create health care worker',
  PERMISSION_DENIED_TO_CREATE_PATIENT:
    'Insufficient permissions to create patient',
  PERMISSION_DENIED_TO_CREATE_NOTES: 'Insufficient permissions to create notes',
  PERMISSION_DENIED_TO_GET_HOSPITAL: 'Insufficient permissions to get hospital',
  PERMISSION_DENIED_TO_GET_HEALTH_CARE_WORKER:
    'Insufficient permissions to get health care worker',
  PERMISSION_DENIED_TO_GET_PATIENT: 'Insufficient permissions to get patient',
  PERMISSION_DENIED_TO_GET_NOTES: 'Insufficient permissions to get notes',
  PERMISSION_DENIED_TO_DELETE_HOSPITAL:
    'Insufficient permissions to delete hospital',
  PERMISSION_DENIED_TO_DELETE_HEALTH_CARE_WORKER:
    'Insufficient permissions to delete health care worker',
  PERMISSION_DENIED_TO_DELETE_PATIENT:
    'Insufficient permissions to delete patient',
  PERMISSION_DENIED_TO_DELETE_NOTES: 'Insufficient permissions to delete notes',
  PERMISSION_DENIED_TO_UPDATE_HOSPITAL:
    'Insufficient permissions to update hospital',
  PERMISSION_DENIED_TO_UPDATE_HEALTH_CARE_WORKER:
    'Insufficient permissions to update health care worker',
  PERMISSION_DENIED_TO_UPDATE_PATIENT:
    'Insufficient permissions to update patient',
  PERMISSION_DENIED_TO_UPDATE_NOTES: 'Insufficient permissions to update notes',
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
  SUCCESS: 201,
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
