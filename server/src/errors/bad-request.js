const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require('./custom-api');

class BadRequestError extends CustomAPIError{
    constructor(message){
        super(message);
        this.ststusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError;