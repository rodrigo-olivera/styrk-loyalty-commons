"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_msg_1 = require("../../constants/errors.msg");
const validatePlugin = async (app, firestore, req, res, next) => {
    const pluginId = res?.locals?.pluginId;
    const plugins = res?.locals?.accountData?.plugins;
    try {
        if (!pluginId)
            throw new Error(errors_msg_1.PLUGIN_ID_IS_REQUIRED);
        if (!plugins)
            throw new Error(errors_msg_1.NO_PLUGIN_DATA_FOUND);
        const plugin = plugins.find((plugin) => plugin.name === pluginId);
        if (!plugin)
            throw new Error(errors_msg_1.NO_PLUGIN_DATA_FOUND);
        if (!plugin.active)
            throw new Error(errors_msg_1.PLUGIN_NOT_ACTIVE);
    }
    catch (error) {
        next(error);
    }
    next();
};
exports.default = validatePlugin;
//# sourceMappingURL=validatePlugin.mdw.js.map