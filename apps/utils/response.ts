/*
 * @file: response.ts
 * @description: It contain function for response status with data.
 */

//success response
async function responses(payload, statusCode, message = 'Success') {
  try {
    const successRes = {
      statusCode: statusCode,
      response: payload,
      message,
    };
    return successRes;
  } catch (error) {
    console.log(error);
  }
}

//error response

async function errorResponses(error, statusCode, message = 'Fail') {
  try {
    const errorRes = {
      error: error,
      statusCode: statusCode,
      message,
    };
    return errorRes;
  } catch (error) {
    console.log(error);
  }
}
export { responses, errorResponses };
