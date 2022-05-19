export interface Transaction {
    tid?: String;
    type: TransactionType;
    amount: Number;
    createdAt?: String;
    updatedAt?: String;
    status?: Status;
    request?: String;
    gid: String;
    createdBy?: String;
    updatedBy?: String;
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