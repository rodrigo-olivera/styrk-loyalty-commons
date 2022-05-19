"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const errors_msg_1 = require("../../constants/errors.msg");
const operations_msg_1 = require("../../constants/operations.msg");
const routes_msg_1 = require("../../constants/routes.msg");
const validateWorkspace = async (app, firestore, req, res, next) => {
    const workspaceId = req?.params?.workspaceId || null;
    const userToken = req?.get('X-Apigateway-Api-Userinfo') || null;
    var currentTime = new Date();
    try {
        if (!workspaceId)
            throw new Error(errors_msg_1.WORKSPACE_IS_REQUIRED);
        if (!userToken)
            throw new Error(errors_msg_1.USER_TOKEN_IS_REQUIRED);
        const workspaceRef = firestore.collection(routes_msg_1.WORKSPACES).doc(workspaceId);
        const cachedWorkspaceData = app?.locals?.[workspaceId];
        const claims = await admin.auth().verifyIdToken(userToken);
        const workspaceList = claims?.workspaces || [];
        console.log(workspaceList);
        if (!workspaceList.length)
            throw new Error(errors_msg_1.WORKSPACE_NOT_FOUND);
        const workspace = workspaceList.find(({ id }) => id === workspaceId);
        if (!workspace)
            throw new Error(errors_msg_1.WORKSPACE_NOT_FOUND);
        if (cachedWorkspaceData) {
            res.set('x-workspace-cache', 'true');
            res.set('x-workspace-cache-timestamp', cachedWorkspaceData.timestamp.toISOString());
        }
        if (!cachedWorkspaceData || (new Date(cachedWorkspaceData?.timestamp)?.getTime() + operations_msg_1.FIVE_MIN) < currentTime.getTime()) {
            res.set('x-workspace-cache', 'false');
            res.set('x-workspace-cache-timestamp', currentTime.toISOString());
            const workspaceSnapshot = await workspaceRef.get();
            if (!workspaceSnapshot.exists)
                throw new Error(errors_msg_1.WORKSPACE_NOT_FOUND);
            const workspaceData = workspaceSnapshot?.data();
            const active = workspaceData?.active;
            if (!active)
                throw new Error(errors_msg_1.WORKSPACE_NOT_ACTIVE);
            app.locals[workspaceId] = { ...workspaceData, workspace, workspaceRef, timestamp: currentTime };
        }
        res.locals.workspaceRef = workspaceRef;
        res.locals.workspaceData = app.locals[workspaceId];
    }
    catch (error) {
        next(error);
    }
    next();
};
exports.default = validateWorkspace;
//# sourceMappingURL=validateWorkspace.js.map