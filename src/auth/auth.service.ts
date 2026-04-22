import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/user.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "src/users/dtos/loginUser.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto) {
    const exist = await this.usersRepository.findOneBy({ email: user.email });
    if (exist) throw new ConflictException("Existing user");
    const hashedPassword = await bcrypt.hash(user.password, 12);
    try {
      const newUser: User = this.usersRepository.create({
        ...user,
        password: hashedPassword,
      });
      const savedUser = await this.usersRepository.save(newUser);
      const { password, isAdmin, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException("Error creating user");
    }
  }

  async loginUser(credentials: LoginUserDto) {
    const findUser = await this.usersRepository.findOneBy({
      email: credentials.email,
    });
    if (!findUser) throw new BadRequestException("Bad Credentials");

    const matchingPasswords = await bcrypt.compare(
      credentials.password,
      findUser.password,
    );
    if (!matchingPasswords) throw new BadRequestException("Bad Credentials");

    const payload = {
      id: findUser.id,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
    };
    const token = this.jwtService.sign(payload);
    return { login: true, access_token: token };
  }
}
