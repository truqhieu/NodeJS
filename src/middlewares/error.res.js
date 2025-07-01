

const ReasonStatusCode = { 
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error' ,
    BADREQUEST : 'Bad Request Error'
}

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
    BADREQUEST : 400
};

//Hàm tạo lỗi tổng quát
const errorResponse = (message, status) => {
    message,
    status
}
 
const badRequestError = (message) => ({
  code: StatusCode.BADREQUEST,
  metadata: message,
  status: ReasonStatusCode.BADREQUEST
});

const conflictRequestError = (message) => ({
  code: StatusCode.CONFLICT,
  metadata: message,
  status: ReasonStatusCode.CONFLICT
});

const ForbiddenError = (message) => ({
  code: StatusCode.FORBIDDEN,
  metadata: message,
  status: ReasonStatusCode.FORBIDDEN
});

module.exports = {
    conflictRequestError,
    badRequestError,
    ForbiddenError
}