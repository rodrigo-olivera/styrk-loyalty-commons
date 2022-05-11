"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_msg_1 = require("../../constants/errors.msg");
const routes_msg_1 = require("../../constants/routes.msg");
const operations_msg_1 = require("../../constants/operations.msg");
const validateAccount = async (app, firestore, req, res, next) => {
    const apiKey = req?.query?.apiKey || null;
    const account = req?.query?.account || null;
    const accountKey = `${routes_msg_1.ACCOUNT}_${apiKey}`;
    var currentTime = new Date();
    try {
        if (!account)
            throw new Error(errors_msg_1.ACCOUNT_IS_REQUIRED);
        if (!apiKey)
            throw new Error(errors_msg_1.API_KEY_IS_REQUIRED);
        const accountRef = firestore.collection(routes_msg_1.ACCOUNTS).doc(account);
        const cachedAccountData = app?.locals?.[accountKey];
        if (cachedAccountData) {
            res.set('x-account-cache', 'true');
            res.set('x-account-cache-timestamp', cachedAccountData.timestamp.toISOString());
        }
        if (!cachedAccountData || (new Date(cachedAccountData?.timestamp)?.getTime() + operations_msg_1.FIVE_MIN) < currentTime.getTime()) {
            res.set('x-account-cache', 'false');
            res.set('x-account-cache-timestamp', currentTime.toISOString());
            const accountSnapshot = await accountRef.get();
            if (!accountSnapshot.exists)
                throw new Error(errors_msg_1.ACCOUNT_NOT_FOUND);
            const accountData = accountSnapshot?.data();
            const hasPermission = accountData?.apiKey.includes(apiKey);
            const active = accountData?.active;
            if (!active)
                throw new Error(errors_msg_1.ACCOUNT_NOT_ACTIVE);
            if (!hasPermission)
                throw new Error(errors_msg_1.UNAUTHORIZED);
            app.locals[accountKey] = { ...accountData, account: accountRef?.id, accountRef, timestamp: currentTime };
        }
        res.locals.accountRef = accountRef;
    }
    catch (error) {
        next(error);
    }
    next();
};
exports.default = validateAccount;
//# sourceMappingURL=validateAccount.mdw.js.map