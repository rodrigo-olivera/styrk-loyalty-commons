"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    try {
        const { message, status } = JSON.parse(err.message);
        console.log('error1', message, status, JSON.parse(err.message));
        res.status(status || 500);
        res.send(message);
    }
    catch (error) {
        console.log('error 2', error);
        res.status(500);
        res.send(err.message);
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.mdw.js.map