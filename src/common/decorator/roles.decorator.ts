import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/common/enum/roles.enum";

export const Roles = (...roles: Rol[]) => SetMetadata('roles', roles);
