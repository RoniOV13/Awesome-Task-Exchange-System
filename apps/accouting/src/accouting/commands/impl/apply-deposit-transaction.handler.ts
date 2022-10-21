import { CreateTransactionDto } from "src/accouting/dto/create-transaction.dto";

export class ApplyDepositTransactionCommand {
  constructor(
    public readonly dto: CreateTransactionDto
  ) {}
}
