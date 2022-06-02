"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
const errors_msg_1 = require("../../constants/errors.msg");
const operations_msg_1 = require("../../constants/operations.msg");
const routes_msg_1 = require("../../constants/routes.msg");
const verifyIdToken_1 = __importDefault(require("../../utils/verifyIdToken"));
const firestore = new firestore_1.Firestore();
const validateWorkspace = async (req, res, next) => {
    const workspaceId = req?.params?.workspaceId || null;
    const userToken = req?.get('x-forwarded-authorization')?.replace('Bearer ', '') || null;
    const requestId = req?.get('x-request-id') || '';
    console.log(req.headers);
    var currentTime = new Date();
    try {
        if (!workspaceId)
            throw new Error(errors_msg_1.WORKSPACE_IS_REQUIRED);
        if (!userToken)
            throw new Error(errors_msg_1.USER_TOKEN_IS_REQUIRED);
        const workspaceRef = firestore.collection(routes_msg_1.WORKSPACES).doc(workspaceId);
        const cachedWorkspaceData = req?.app?.locals?.[workspaceId];
        const { workspaceList, uid } = await (0, verifyIdToken_1.default)(userToken);
        if (!workspaceList.length)
            throw new Error(errors_msg_1.TOKEN_IS_NOT_VALID);
        const workspace = workspaceList.find((w) => w === workspaceId);
        if (!workspace)
            throw new Error(errors_msg_1.WORKSPACE_NOT_FOUND);
        if (cachedWorkspaceData) {
            res.set('x-workspace-cache', 'true');
            res.set('x-workspace-cache-timestamp', cachedWorkspaceData.timestamp.toISOString());
            res.set('x-request-id', requestId);
        }
        if (!cachedWorkspaceData || (new Date(cachedWorkspaceData?.timestamp)?.getTime() + operations_msg_1.FIVE_MIN) < currentTime.getTime()) {
            res.set('x-workspace-cache', 'false');
            res.set('x-workspace-cache-timestamp', currentTime.toISOString());
            res.set('x-request-id', requestId);
            const workspaceSnapshot = await workspaceRef.get();
            if (!workspaceSnapshot.exists)
                throw new Error(errors_msg_1.WORKSPACE_NOT_FOUND);
            const workspaceData = workspaceSnapshot?.data();
            const active = workspaceData?.active;
            if (!active)
                throw new Error(errors_msg_1.WORKSPACE_NOT_ACTIVE);
            req.app.locals[workspaceId] = { ...workspaceData, workspace, workspaceRef, timestamp: currentTime };
        }
        res.locals.requestId = requestId;
        res.locals.workspaceRef = workspaceRef;
        res.locals.requestUserId = uid;
        res.locals.workspaceData = req?.app?.locals?.[workspaceId];
    }
    catch (error) {
        next(error);
    }
    next();
};
exports.default = validateWorkspace;
//# sourceMappingURL=validateWorkspace.js.map