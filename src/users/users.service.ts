import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { Rol } from "src/common/enum/roles.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    try {
      const [users, total] = await this.userRepository.findAndCount({
        order: { name: "ASC" },
        skip: (page - 1) * limit,
        take: limit,
      });
      const data = users.map(({ password, ...rest }) => rest);
      return {
        data,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: string) {
    try {
      const findUser = await this.userRepository.findOne({
        where: { id },
        relations: { orders: true },
      });
      if (!findUser) throw new NotFoundException("User not found");
      const { password, ...rest } = findUser;
      return rest;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Error loading user");
    }
  }

  async updateUser(id: string, updateDto: UpdateUserDto) {
    const exists = await this.userRepository.findOne({ where: { id } });
    if (!exists) throw new NotFoundException("User not found");
    try {
      const { confirmPassword, ...safeDto } = updateDto as any;
      await this.userRepository.update({ id }, safeDto);
      const updatedUser = await this.userRepository.findOneBy({ id });
      if (!updatedUser)
        throw new NotFoundException("User not found after update");
      const { password, isAdmin, ...rest } = updatedUser;
      return rest;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException("Error updating user");
    }
  }

  async deleteUser(id: string): Promise<{ id: string; message: string }> {
    const exists = await this.userRepository.findOne({ where: { id } });
    if (!exists) throw new NotFoundException("User not found");
    try {
      await this.userRepository.delete(id);
      return { id, message: "User deleted successfully" };
    } catch (error) {
      throw new InternalServerErrorException("Error deleting user");
    }
  }

  async changeAdmin(
    id: string,
    newRole: Rol,
  ): Promise<{ id: string; message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    await this.userRepository.update(id, { isAdmin: newRole });
    return { id, message: `Role updated to ${newRole}` };
  }
}
