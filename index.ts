// Middlewares
import validateAccount from "./src/middlewares/account/validateAccount.mdw";
import logErrors from "./src/middlewares/error/logErrors.mdw";
import errorHandler from "./src/middlewares/error/errorHandler.mdw";
import response from "./src/middlewares/response.mdw";
import validatePlugin from "./src/middlewares/account/validatePlugin.mdw";
import validateWorkspace from "./src/middlewares/workspaces/validateWorkspace";
export { validateAccount, validatePlugin, logErrors, errorHandler, response, validateWorkspace };

// Utils
import sanitizeJson from "./src/utils/sanitizeJson";
import validateEmail from "./src/utils/validateEmail";
import validatePhoneNumber from "./src/utils/validatePhoneNumber";
import removeSpecialChars from "./src/utils/removeSpecialChars";
import removeChars from "./src/utils/removeChars";
export { sanitizeJson, validateEmail, validatePhoneNumber, removeSpecialChars, removeChars };

// Types
export { AccountData, PluginData, SearchStrategy } from "./src/types/AccountData";
export { LoyaltyCard } from "./src/types/LoyaltyCard";
export { SearchParams } from "./src/types/SearchParams";
export { Transaction, TransactionType, Status } from "./src/types/Transaction";

// Constants
export { PRODUCT_ALLREADY_EXISTS, PRODUCT_ID_IS_REQUIRED, CLIENT_ID_IS_REQUIRED, USER_NOT_FOUND, USER_ID_IS_REQUIRED, APIKEY_DO_NOT_EXISTS, API_KEY_NAME_IS_REQUIRED, TOKEN_IS_NOT_VALID, EMAIL_IS_REQUIRED, NO_WORKSPACE_FOUND_IN_CACHE, USER_TOKEN_IS_REQUIRED, WORKSPACE_IS_REQUIRED, WORKSPACE_NOT_ACTIVE, WORKSPACE_NOT_FOUND, PLUGIN_ID_IS_REQUIRED, PLUGIN_NOT_ACTIVE, NO_PLUGIN_DATA_FOUND, ACCOUNT_IS_REQUIRED, ACCOUNT_NOT_ACTIVE, ACCOUNT_NOT_FOUND, AMOUNT_IS_REQUIRED, AMOUNT_MUST_BE_GREATER_THAN_0, API_KEY_IS_REQUIRED, INSUFICIENT_BALANCE, INVALID_EMAIL, INVALID_PHONE_NUMBER, LOYALTY_CARD_ID_IS_REQUIRED, LOYALTY_CARD_NOT_CREATED, MULTIPLE_ACCOUNTS_FOUND, NO_ACCOUNT_FOUND_IN_CACHE, NO_RESPONSE_FOUND, TRANSACTIONS_NOT_FOUND, TRANSACTION_ID_IS_REQUIRED, TRANSACTION_NOT_FOUND, TYPE_IS_REQUIRED, TYPE_MUST_BE_CREDIT_OR_DEBIT, UNAUTHORIZED, LOYALTY_CARD_NOT_FOUND, AMOUNT_MUST_BE_A_NUMBER, AMOUNT_GRATER_THAN_0, LOYALTY_CARD_NOT_ACTIVE, BALANCE_MUST_BE_A_NUMBER, MISSING_API_KEY, APIKEY_ALREADY_EXISTS } from "./src/constants/errors.msg";
export { API_KEY } from "./src/constants/headers.msg";
export { PID, HEX, ASC, DESC, EMAIL, GID, ID, NUMBER, PHONE, USER, USER_ID, VTEX, STYRK_LOYALTY, YEAR, UID, CID } from "./src/constants/keys.msg";
export { ACCOUNT_IN_MEMORY } from "./src/constants/messages.msg";
export { ARRAY_CONTAINS, EQUALS, FIVE_MIN } from "./src/constants/operations.msg";
export { ACCOUNT, INVITES, ACCOUNTS, LOYALTY_CARDS, TRANSACTIONS, WORKSPACES, CLIENTS, EVENTS, PRODUCTS, PROMOTIONS, USERS } from "./src/constants/routes.msg";