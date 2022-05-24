import { DocumentReference, Firestore } from "@google-cloud/firestore";
import { NextFunction, Request, Response } from "express";

import { TOKEN_IS_NOT_VALID, USER_TOKEN_IS_REQUIRED, WORKSPACE_IS_REQUIRED, WORKSPACE_NOT_ACTIVE, WORKSPACE_NOT_FOUND } from "../../constants/errors.msg";
import { FIVE_MIN } from "../../constants/operations.msg";
import { WORKSPACES } from "../../constants/routes.msg";
import verifyIdToken from "../../utils/verifyIdToken";

const firestore = new Firestore()

const validateWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    const workspaceId = req?.params?.workspaceId || null;
    const userToken = req?.get('x-forwarded-authorization')?.replace('Bearer ', '') || null;
    const requestId = req?.get('x-request-id') || '';

    var currentTime = new Date();

    try {
        if (!workspaceId) throw new Error(WORKSPACE_IS_REQUIRED);
        if (!userToken) throw new Error(USER_TOKEN_IS_REQUIRED);

        const workspaceRef: DocumentReference = firestore.collection(WORKSPACES).doc(workspaceId);
        const cachedWorkspaceData = req?.app?.locals?.[workspaceId];

        const { workspaceList, uid } = await verifyIdToken(userToken);

        console.log(workspaceList);

        if (!workspaceList.length) throw new Error(TOKEN_IS_NOT_VALID);

        const workspace = workspaceList.find((w: string) => w === workspaceId);

        if (!workspace) throw new Error(WORKSPACE_NOT_FOUND);

        if (cachedWorkspaceData) {
            res.set('x-workspace-cache', 'true');
            res.set('x-workspace-cache-timestamp', cachedWorkspaceData.timestamp.toISOString());
            res.set('x-request-id', requestId)
        }

        if (!cachedWorkspaceData || (new Date(cachedWorkspaceData?.timestamp)?.getTime() + FIVE_MIN) < currentTime.getTime()) {
            res.set('x-workspace-cache', 'false')
            res.set('x-workspace-cache-timestamp', currentTime.toISOString())
            res.set('x-request-id', requestId)

            const workspaceSnapshot = await workspaceRef.get();

            if (!workspaceSnapshot.exists) throw new Error(WORKSPACE_NOT_FOUND);

            const workspaceData = workspaceSnapshot?.data();
            const active = workspaceData?.active;

            if (!active) throw new Error(WORKSPACE_NOT_ACTIVE);

            req.app.locals[workspaceId] = { ...workspaceData, workspace, workspaceRef, timestamp: currentTime };
        }

        res.locals.requestId = requestId;
        res.locals.workspaceRef = workspaceRef;
        res.locals.requestUserId = uid;
        res.locals.workspaceData = req?.app?.locals?.[workspaceId]
    } catch (error) {
        next(error)
    }
    next();
}

export default validateWorkspace;