// Middlewares
import validateAccount from "./src/middlewares/account/validateAccount.mdw";
import logErrors from "./src/middlewares/error/logErrors.mdw";
import errorHandler from "./src/middlewares/error/errorHandler.mdw";
import response from "./src/middlewares/response.mdw";
import validatePlugin from "./src/middlewares/account/validatePlugin.mdw";
export { validateAccount, validatePlugin, logErrors, errorHandler, response };

// Utils
import sanitizeJson from "./src/utils/sanitizeJson";
import validateEmail from "./src/utils/validateEmail";
import validatePhoneNumber from "./src/utils/validatePhoneNumber";
import removeSpecialChars from "./src/utils/removeSpecialChars";
export { sanitizeJson, validateEmail, validatePhoneNumber, removeSpecialChars };

// Types
export { AccountData, PluginData } from "./src/types/AccountData";
export { LoyaltyCard } from "./src/types/LoyaltyCard";
export { SearchParams } from "./src/types/SearchParams";
export { Transaction, TransactionType, Status } from "./src/types/Transaction";

// Constants
export { ACCOUNT_IS_REQUIRED, ACCOUNT_NOT_ACTIVE, ACCOUNT_NOT_FOUND, AMOUNT_IS_REQUIRED, AMOUNT_MUST_BE_GREATER_THAN_0, API_KEY_IS_REQUIRED, INSUFICIENT_BALANCE, INVALID_EMAIL, INVALID_PHONE_NUMBER, LOYALTY_CARD_ID_IS_REQUIRED, LOYALTY_CARD_NOT_CREATED, MULTIPLE_ACCOUNTS_FOUND, NO_ACCOUNT_FOUND_IN_CACHE, NO_RESPONSE_FOUND, TRANSACTIONS_NOT_FOUND, TRANSACTION_ID_IS_REQUIRED, TRANSACTION_NOT_FOUND, TYPE_IS_REQUIRED, TYPE_MUST_BE_CREDIT_OR_DEBIT, UNAUTHORIZED, LOYALTY_CARD_NOT_FOUND, AMOUNT_MUST_BE_A_NUMBER, AMOUNT_GRATER_THAN_0, LOYALTY_CARD_NOT_ACTIVE, BALANCE_MUST_BE_A_NUMBER } from "./src/constants/errors.msg";
export { API_KEY } from "./src/constants/headers.msg";
export { ASC, DESC, EMAIL, GID, ID, NUMBER, PHONE, USER, USER_ID } from "./src/constants/keys.msg";
export { ACCOUNT_IN_MEMORY } from "./src/constants/messages.msg";
export { ARRAY_CONTAINS, EQUALS, FIVE_MIN } from "./src/constants/operations.msg";
export { ACCOUNT, ACCOUNTS, LOYALTY_CARDS, TRANSACTIONS } from "./src/constants/routes.msg";