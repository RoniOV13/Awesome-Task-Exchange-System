import { GetAllTransactionsHandler } from "./get-all-transactions.handler";
import { GetTransactionByIdHandler } from "./get-transaction-by-id.handler";
import { GetTransactionsByUserIdHandler } from "./get-transactions-by-userId";

export const QueryHandlers = [GetAllTransactionsHandler, GetTransactionByIdHandler, GetTransactionsByUserIdHandler];
