"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logErrors = (err, req, res, next) => {
    console.error(err);
    next(err);
};
exports.default = logErrors;
//# sourceMappingURL=logErrors.mdw.js.map