import { DocumentReference } from "@google-cloud/firestore";

export interface AccountData {
    account: string;
    accountRef: DocumentReference;
    timestamp: string;
    active: boolean;
    apyKey: string[];
    name: string;
    plugins?: PluginData[];
}

export interface PluginData {
    name: string;
    pid:string;
    active: boolean;
    searchStrategy: SearchStrategy;
}

export const enum SearchStrategy {
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    UID = "UID",
    GID = "GID",
}