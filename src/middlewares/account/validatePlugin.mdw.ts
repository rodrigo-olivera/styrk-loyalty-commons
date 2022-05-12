import express, { NextFunction, Request, Response } from "express";

import { ACCOUNT_IS_REQUIRED, ACCOUNT_NOT_ACTIVE, ACCOUNT_NOT_FOUND, API_KEY_IS_REQUIRED, NO_PLUGIN_DATA_FOUND, PLUGIN_ID_IS_REQUIRED, PLUGIN_NOT_ACTIVE, UNAUTHORIZED } from "../../constants/errors.msg";
import { ACCOUNT, ACCOUNTS } from "../../constants/routes.msg";

import { FIVE_MIN } from "../../constants/operations.msg";
import { Firestore } from "@google-cloud/firestore";
import { PluginData } from "../../types/AccountData";

const validatePlugin = async (app: express.Express, firestore: Firestore, req: Request, res: Response, next: NextFunction, pluginId: string) => {
    const apiKey = req?.query?.apiKey || null;
    const account = req?.query?.account as string || null;
    const accountKey = `${ACCOUNT}_${apiKey}`;

    var currentTime = new Date();

    try {
        if (!account) throw new Error(ACCOUNT_IS_REQUIRED);
        if (!apiKey) throw new Error(API_KEY_IS_REQUIRED);

        const accountRef = firestore.collection(ACCOUNTS).doc(account);
        const cachedAccountData = app?.locals?.[accountKey];

        if (cachedAccountData) {
            res.set('x-account-cache', 'true')
            res.set('x-account-cache-timestamp', cachedAccountData.timestamp.toISOString())
        }

        if (!cachedAccountData || (new Date(cachedAccountData?.timestamp)?.getTime() + FIVE_MIN) < currentTime.getTime()) {
            res.set('x-account-cache', 'false')
            res.set('x-account-cache-timestamp', currentTime.toISOString())

            const accountSnapshot = await accountRef.get();

            if (!accountSnapshot.exists) throw new Error(ACCOUNT_NOT_FOUND);

            const accountData = accountSnapshot?.data();
            const hasPermission = accountData?.apiKey.includes(apiKey);
            const active = accountData?.active;

            if (!active) throw new Error(ACCOUNT_NOT_ACTIVE);
            if (!hasPermission) throw new Error(UNAUTHORIZED);

            app.locals[accountKey] = { ...accountData, account: accountRef?.id, accountRef, timestamp: currentTime };
            res.locals.accountData = accountData

            const plugins = res?.locals?.accountData?.plugins;

            if (!pluginId) throw new Error(PLUGIN_ID_IS_REQUIRED);
            if (!plugins) throw new Error(NO_PLUGIN_DATA_FOUND);

            const plugin = plugins.find((plugin: PluginData) => plugin.name === pluginId);

            if (!plugin) throw new Error(NO_PLUGIN_DATA_FOUND);
            if (!plugin.active) throw new Error(PLUGIN_NOT_ACTIVE);

            res.locals.plugin = plugin;
        }

        res.locals.accountRef = accountRef;
    } catch (error) {
        next(error)
    }
    next();
}

export default validatePlugin;