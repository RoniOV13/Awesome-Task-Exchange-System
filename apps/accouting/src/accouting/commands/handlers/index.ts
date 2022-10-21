import { ApplyDepositTransactionHandler } from "./apply-deposit-transaction.handler";
import { ApplyPaymentTransactionHandler } from "./apply-payment-transaction.handler";
import { ApplyWithdrawTransactionHandler } from "./apply-withdraw-transaction.handler";

export const CommandHandlers = [ApplyWithdrawTransactionHandler, ApplyDepositTransactionHandler, ApplyPaymentTransactionHandler];
