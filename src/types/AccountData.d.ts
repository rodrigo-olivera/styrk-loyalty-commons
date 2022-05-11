import { DocumentReference } from "@google-cloud/firestore";

export interface AccountData {
    account: string;
    accountRef: DocumentReference;
    timestamp: string;
    active: boolean;
    apyKey: string[];
    name: string;
}