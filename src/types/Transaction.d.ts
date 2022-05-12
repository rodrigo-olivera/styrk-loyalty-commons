export interface Transaction {
    tid?: string;
    type: TransactionType;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
    status?: Status;
    request?: Object;
    gid: string;
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
}