export function successResponse(status = 200, message = '', data = {}) {
    let response: any = {};

    if (message) response.message = message;
    if (status) response.status = status;
    if (data) response.data = data;

    response.success = true;
    
    return response;
}

export function errorResponse(status = 400, message = '') {
    let response: any = {};

    if (message) response.message = message;
    if (status) response.status = status;

    response.success = false;
    
    return response;
}

export function missingParamResponse(missingParam: string) {
    return {
        status: 400,
        message: `Must Provide ${missingParam}`,
        success: false
    }
}

export function invalidParamResponse(invalidParam: string, value: any) {
    const message = value ? `Invalid Param ${invalidParam} with value ${value}` : `Invalid Param ${invalidParam}`
    return {
        status: 400,
        message,
        success: false
    }
}