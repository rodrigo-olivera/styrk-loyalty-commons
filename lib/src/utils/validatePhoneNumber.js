"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validatePhoneNumber = (phoneNumber) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phoneNumber);
};
exports.default = validatePhoneNumber;
//# sourceMappingURL=validatePhoneNumber.js.map