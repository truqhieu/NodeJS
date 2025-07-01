const ReasonStatusCode = { 
    CREATED: 'CREATED!',
    OK: 'Success'
}

const StatusCode = {
    OK: 200,
    CREATED: 201
};

//Hàm tạo lỗi tổng quát
const successResponse = (message, status) => {
    message ,
    status
}

const OkResponse = ( message) => ({
    metadata : message,
    status: ReasonStatusCode.OK,
    code: StatusCode.OK
})

const createResponse = (message) => ({
    metadata: message,
    status: ReasonStatusCode.CREATED,
    code: StatusCode.CREATED

})

module.exports = {
    OkResponse,
    createResponse
}