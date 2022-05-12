import express, { NextFunction, Request, Response } from "express";

import { NO_PLUGIN_DATA_FOUND, PLUGIN_ID_IS_REQUIRED, PLUGIN_NOT_ACTIVE } from "../../constants/errors.msg";

import { Firestore } from "@google-cloud/firestore";
import { PluginData } from "../../types/AccountData";

const validatePlugin = async (app: express.Express, firestore: Firestore, req: Request, res: Response, next: NextFunction) => {
    const pluginId = res?.locals?.pluginId;
    const plugins = res?.locals?.accountData?.plugins;

    try {
        if (!pluginId) throw new Error(PLUGIN_ID_IS_REQUIRED);
        if (!plugins) throw new Error(NO_PLUGIN_DATA_FOUND);

        const plugin = plugins.find((plugin: PluginData) => plugin.name === pluginId);

        if (!plugin) throw new Error(NO_PLUGIN_DATA_FOUND);
        if (!plugin.active) throw new Error(PLUGIN_NOT_ACTIVE);

    } catch (error) {
        next(error)
    }
    next();
}

export default validatePlugin;