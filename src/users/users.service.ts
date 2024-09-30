import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find({});
  }

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        fullName: user.fullName,
      },
    });

    if (userFound) {
      return new HttpException('Correo ya registrado', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.updatedAt = new Date();

    const updateUser = Object.assign(userFound, user);

    return this.userRepository.save(updateUser);
  }
}
