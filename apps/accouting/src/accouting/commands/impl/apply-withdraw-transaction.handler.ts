import { CreateTransactionDto } from "src/accouting/dto/create-transaction.dto";

export class ApplyWithdrawTransactionCommand {
  constructor(
    public readonly dto: CreateTransactionDto
  ) {}
}
