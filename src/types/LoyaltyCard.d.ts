export interface LoyaltyCard {
    gid?: string;
    email?: string;
    balance?: number;
    createdAt?: string;
    updatedAt?: string;
    phone?: string;
    uid?: string;
    active: boolean;
    isGiftcard?: boolean;
    cardName?:string;
}