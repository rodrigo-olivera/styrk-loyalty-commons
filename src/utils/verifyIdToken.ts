import * as admin from 'firebase-admin';

const verifyIdToken = async (userToken: string) => {
    try {
        const claims = await admin.auth().verifyIdToken(userToken);
        const workspaceList = claims?.workspaces || [];
        const uid = claims?.uid || null;

        return { workspaceList, uid };
    } catch (error) {
        console.log("***", error);
        return { workspaceList: [], uid: null };
    }
}

export default verifyIdToken;