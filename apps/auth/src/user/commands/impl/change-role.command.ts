import { changeRoleDto } from "src/user/dto/change-role.dto";

export class ChangeRoleCommand {
  constructor(
    public readonly changeRole: changeRoleDto,
  ) { }
}
