export interface Transaction {
    tid?: string;
    type: TransactionType;
    amount: number;
    createdAt?: string;
    updatedAt?: string;
    status?: string;
    request?: string;
    gid: string;
    createdBy?: string;
    updatedBy?: string;
}

export const enum TransactionType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT"
}

export const enum Status {
    APLICATED = "APLICATED",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CREATED = "CREATED",
    ERROR = "ERROR",
    FINISHED = "FINISHED",
    APLICATED = "APPLIED",
    SETLEMENT = "SETTLEMENT",
}