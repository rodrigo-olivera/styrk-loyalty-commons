import { NextFunction, Request, Response } from "express";

import { NO_PLUGIN_DATA_FOUND, PLUGIN_ID_IS_REQUIRED, PLUGIN_NOT_ACTIVE } from "../../constants/errors.msg";

import { PluginData } from "../../types/AccountData";

const validatePlugin = async (req: Request, res: Response, next: NextFunction, pluginId: string) => {
    const plugins = res?.locals?.accountData?.plugins;

    try {
        if (!pluginId) throw new Error(PLUGIN_ID_IS_REQUIRED);
        if (!plugins) throw new Error(NO_PLUGIN_DATA_FOUND);

        const plugin = plugins.find((plugin: PluginData) => plugin.pid === pluginId);

        console.log(plugin);

        if (!plugin) throw new Error(NO_PLUGIN_DATA_FOUND);
        if (!plugin.active) throw new Error(PLUGIN_NOT_ACTIVE);

        res.locals.plugin = plugin;
    } catch (error) {
        next(error)
    }
    next();
}

export default validatePlugin;