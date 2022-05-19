import { DocumentReference, Firestore } from "@google-cloud/firestore";
import express, { NextFunction, Request, Response } from "express";

import * as admin from 'firebase-admin';
import { USER_TOKEN_IS_REQUIRED, WORKSPACE_IS_REQUIRED, WORKSPACE_NOT_ACTIVE, WORKSPACE_NOT_FOUND } from "../../constants/errors.msg";
import { FIVE_MIN } from "../../constants/operations.msg";
import { WORKSPACES } from "../../constants/routes.msg";

const validateWorkspace = async (app: express.Express, firestore: Firestore, req: Request, res: Response, next: NextFunction) => {
    const workspaceId = req?.params?.workspaceId || null;
    const userToken = req?.get('X-Apigateway-Api-Userinfo') || null;

    var currentTime = new Date();

    try {
        if (!workspaceId) throw new Error(WORKSPACE_IS_REQUIRED);
        if (!userToken) throw new Error(USER_TOKEN_IS_REQUIRED);

        const workspaceRef: DocumentReference = firestore.collection(WORKSPACES).doc(workspaceId);
        const cachedWorkspaceData = app?.locals?.[workspaceId];

        const claims = await admin.auth().verifyIdToken(userToken);
        const uid = claims?.uid || null;
        const workspaceList = claims?.workspaces || [];

        if (!workspaceList.length) throw new Error(WORKSPACE_NOT_FOUND);

        const workspace = workspaceList.find(({ id }: { id: string }) => id === workspaceId);

        if (!workspace) throw new Error(WORKSPACE_NOT_FOUND);

        if (cachedWorkspaceData) {
            res.set('x-workspace-cache', 'true');
            res.set('x-workspace-cache-timestamp', cachedWorkspaceData.timestamp.toISOString());
        }

        if (!cachedWorkspaceData || (new Date(cachedWorkspaceData?.timestamp)?.getTime() + FIVE_MIN) < currentTime.getTime()) {
            res.set('x-workspace-cache', 'false')
            res.set('x-workspace-cache-timestamp', currentTime.toISOString())

            const workspaceSnapshot = await workspaceRef.get();

            if (!workspaceSnapshot.exists) throw new Error(WORKSPACE_NOT_FOUND);

            const workspaceData = workspaceSnapshot?.data();
            const active = workspaceData?.active;

            if (!active) throw new Error(WORKSPACE_NOT_ACTIVE);

            app.locals[workspaceId] = { ...workspaceData, workspace, workspaceRef, timestamp: currentTime };
        }

        res.locals.workspaceRef = workspaceRef;
        res.locals.requestUserId = uid;
        res.locals.workspaceData = app.locals[workspaceId]
    } catch (error) {
        next(error)
    }
    next();
}

export default validateWorkspace;