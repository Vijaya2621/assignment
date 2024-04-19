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

async function errorResponses(payload, statusCode, message = 'Fail') {
  try {
    const errorRes = {
      statusCode: statusCode,
      response: payload,
      message,
    };
    return errorRes;
  } catch (error) {
    console.log(error);
  }
}
export { responses, errorResponses };
