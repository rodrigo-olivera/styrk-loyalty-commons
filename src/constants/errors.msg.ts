// Error messages
export const ACCOUNT_NOT_ACTIVE = JSON.stringify({ message: 'Account not active', status: 402 });
export const MULTIPLE_ACCOUNTS_FOUND = JSON.stringify({ message: 'Multiple accounts found', status: 500 });
export const ACCOUNT_NOT_FOUND = JSON.stringify({ message: 'Account not found', status: 500 });
export const NO_ACCOUNT_FOUND_IN_CACHE = JSON.stringify({ message: 'No account found in cache, fetching...' });
export const API_KEY_IS_REQUIRED = JSON.stringify({ message: 'API key is required', status: 400 });
export const INVALID_EMAIL = JSON.stringify({ message: 'Invalid email', status: 400 });
export const LOYALTY_CARD_NOT_CREATED = JSON.stringify({ message: 'Loyalty Card not created', status: 500 });
export const LOYALTY_CARD_NOT_FOUND = JSON.stringify({ message: 'Loyalty Card not found', status: 500 });
export const LOYALTY_CARD_ID_IS_REQUIRED = JSON.stringify({ message: 'Loyalty Card ID is required', status: 400 });
export const ACCOUNT_IS_REQUIRED = JSON.stringify({ message: 'Account is required', status: 400 });
export const UNAUTHORIZED = JSON.stringify({ message: 'Unauthorized', status: 401 });
export const NO_RESPONSE_FOUND = JSON.stringify({ message: 'Oops, something exploded!', status: 500 });
export const INVALID_PHONE_NUMBER = JSON.stringify({ message: 'Invalid phone number', status: 400 });
export const AMOUNT_IS_REQUIRED = JSON.stringify({ message: 'Amount is required', status: 400 });
export const TYPE_IS_REQUIRED = JSON.stringify({ message: 'Type is required', status: 400 });
export const AMOUNT_GRATER_THAN_0 = JSON.stringify({ message: 'Amount must be greater than 0', status: 400 });
export const TYPE_MUST_BE_CREDIT_OR_DEBIT = JSON.stringify({ message: 'Type must be CREDIT or DEBIT', status: 400 });
export const LOYALTY_CARD_NOT_ACTIVE = JSON.stringify({ message: 'Loyalty Card not active', status: 500 });
export const AMOUNT_MUST_BE_A_NUMBER = JSON.stringify({ message: 'Amount must be a number', status: 400 });
export const BALANCE_MUST_BE_A_NUMBER = JSON.stringify({ message: 'Balance must be a number', status: 500 });
export const AMOUNT_MUST_BE_GREATER_THAN_0 = JSON.stringify({ message: 'Amount must be greater than 0', status: 400 });
export const INSUFICIENT_BALANCE = JSON.stringify({ message: 'Insufficient balance', status: 500 });
export const TRANSACTION_ID_IS_REQUIRED = JSON.stringify({ message: 'Transaction ID is required', status: 400 });
export const TRANSACTION_NOT_FOUND = JSON.stringify({ message: 'Transaction not found', status: 500 });
export const TRANSACTIONS_NOT_FOUND = JSON.stringify({ message: 'Transactions not found', status: 500 });
export const PLUGIN_ID_IS_REQUIRED = JSON.stringify({ message: 'Plugin ID is required', status: 500 });
export const NO_PLUGIN_DATA_FOUND = JSON.stringify({ message: 'No plugin data found', status: 500 });
export const PLUGIN_NOT_ACTIVE = JSON.stringify({ message: 'Plugin not active', status: 500 });
export const EMAIL_IS_REQUIRED = JSON.stringify({ message: 'Email is required', status: 400 });
export const WORKSPACE_IS_REQUIRED = JSON.stringify({ message: 'Workspace is required', status: 400 });
export const WORKSPACE_NOT_ACTIVE = JSON.stringify({ message: 'Workspace not active', status: 402 });
export const WORKSPACE_NOT_FOUND = JSON.stringify({ message: 'Workspace not found', status: 500 });
export const NO_WORKSPACE_FOUND_IN_CACHE = JSON.stringify({ message: 'No workspace found in cache, fetching...' });
export const USER_TOKEN_IS_REQUIRED = JSON.stringify({ message: 'User token is required', status: 401 });
export const TOKEN_IS_NOT_VALID = JSON.stringify({ message: 'Token is not valid', status: 401 });
export const MISSING_API_KEY = JSON.stringify({ message: 'Missing API key', status: 400 });
export const APIKEY_ALREADY_EXISTS = JSON.stringify({ message: 'API key already exists', status: 400 });
export const APIKEY_DO_NOT_EXISTS = JSON.stringify({ message: 'API key does not exists', status: 400 });
export const API_KEY_NAME_IS_REQUIRED = JSON.stringify({ message: 'API key name is required', status: 400 });
export const USER_ID_IS_REQUIRED = JSON.stringify({ message: 'User ID is required', status: 400 });
export const USER_NOT_FOUND = JSON.stringify({ message: 'User not found', status: 500 });
export const CLIENT_ID_IS_REQUIRED = JSON.stringify({ message: 'Client ID is required', status: 400 });
export const PRODUCT_ID_IS_REQUIRED = JSON.stringify({ message: 'Product ID is required', status: 400 });
export const PRODUCT_ALLREADY_EXISTS = JSON.stringify({ message: 'Product already exists', status: 400 });
export const EVENT_ID_IS_REQUIRED = JSON.stringify({ message: 'Event ID is required', status: 400 });
export const EMAIL_PHONE_CID_REQUIRED = JSON.stringify({ message: 'Email, phone or cid is required', status: 400 });
export const EVENT_NOT_FOUND = JSON.stringify({ message: 'Event not found', status: 500 });