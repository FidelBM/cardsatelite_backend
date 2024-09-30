import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Between, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateCardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/card-update.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private userService: UsersService,
  ) {}

  async createCard(card: CreateCardDto) {
    const userFound = await this.userService.getUser(card.userId);

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newCard = this.cardRepository.create(card);

    return this.cardRepository.save(newCard);
  }

  getAllUsers() {
    return this.cardRepository.find({
      relations: ['user'],
    });
  }

  async getCardDate(date: any) {
    // Convertir a Date si no lo es
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    return this.cardRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });
  }

  async updateUser(id: number, card: UpdateCardDto) {
    const userFound = await this.cardRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('Card not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, card);

    return this.cardRepository.save(updateUser);
  }

  async deleteCard(id: number) {
    const result = await this.cardRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
