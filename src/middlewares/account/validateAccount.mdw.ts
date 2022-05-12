import express, { NextFunction, Request, Response } from "express";

import { ACCOUNT_IS_REQUIRED, ACCOUNT_NOT_ACTIVE, ACCOUNT_NOT_FOUND, API_KEY_IS_REQUIRED, UNAUTHORIZED } from "../../constants/errors.msg";
import { ACCOUNT, ACCOUNTS } from "../../constants/routes.msg";

import { FIVE_MIN } from "../../constants/operations.msg";
import { DocumentReference, Firestore } from "@google-cloud/firestore";

const validateAccount = async (app: express.Express, firestore: Firestore, req: Request, res: Response, next: NextFunction) => {
    const apiKey = req?.query?.apiKey || req?.headers?.apikey || null;
    const account = req?.query?.account as string || req?.headers?.account as string || null;
    const accountKey = `${ACCOUNT}_${apiKey}`;

    var currentTime = new Date();

    try {
        if (!account) throw new Error(ACCOUNT_IS_REQUIRED);
        if (!apiKey) throw new Error(API_KEY_IS_REQUIRED);

        const accountRef: DocumentReference = firestore.collection(ACCOUNTS).doc(account);
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

            app.locals[accountKey] = { ...accountData, account, accountRef, timestamp: currentTime };
            res.locals.accountData = app.locals[accountKey]
        }

        res.locals.accountRef = accountRef;
    } catch (error) {
        next(error)
    }
    next();
}

export default validateAccount;