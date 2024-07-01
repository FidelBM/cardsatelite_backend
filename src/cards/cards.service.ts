import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateCardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/card-update.dto';

@Injectable()
export class CardsService {

    constructor(
        @InjectRepository(Card) private cardRepository: Repository<Card>,
        private userService: UsersService
    ) {}

    async createCard(card: CreateCardDto){
        const userFound = await this.userService.getUser(card.userId)

        if (!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND)

        const newCard = this.cardRepository.create(card)

        return this.cardRepository.save(newCard)

    }

    getAllUsers(){
        return this.cardRepository.find({
            relations: ['user']
        })
    }

    async updateUser(id: number, card: UpdateCardDto) {

        const userFound = await this.cardRepository.findOne({
            where:{
                id
            }
        })

        if(!userFound){

            return new HttpException('Card not found', HttpStatus.NOT_FOUND)
        }

        const updateUser = Object.assign(userFound, card);

        return this.cardRepository.save(updateUser)

    }
    
    async deleteCard( id : number ){

        const result = await this.cardRepository.delete({ id });

        if(result.affected === 0){
                
                return new HttpException('User not found', HttpStatus.NOT_FOUND)

        }

        return result

    }


}
