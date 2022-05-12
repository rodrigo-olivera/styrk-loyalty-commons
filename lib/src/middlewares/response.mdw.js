"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_msg_1 = require("../constants/errors.msg");
const sanitizeJson_1 = __importDefault(require("../utils/sanitizeJson"));
const response = async (req, res, next) => {
    try {
        const response = res?.locals?.response;
        if (!response)
            throw new Error(JSON.stringify(errors_msg_1.NO_RESPONSE_FOUND));
        const sanitizedResponse = Array.isArray(response) ? response?.map(obj => (0, sanitizeJson_1.default)(obj)) : (0, sanitizeJson_1.default)(response);
        res.status(200).send(sanitizedResponse);
    }
    catch (error) {
        next(error);
    }
    return next();
};
exports.default = response;
//# sourceMappingURL=response.mdw.js.map