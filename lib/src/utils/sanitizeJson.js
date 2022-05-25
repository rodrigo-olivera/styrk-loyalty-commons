"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitizeJson = (json) => {
    const sanitizedJson = { ...json };
    Object.keys(json).map((key) => {
        if (key.startsWith("_"))
            return delete sanitizedJson[key];
        if (!sanitizedJson[key])
            return;
        return Object.keys(sanitizedJson[key]).map((subKey) => {
            if (subKey.startsWith("_"))
                return delete sanitizedJson[key];
            return;
        });
    });
    return sanitizedJson;
};
exports.default = sanitizeJson;
//# sourceMappingURL=sanitizeJson.js.map