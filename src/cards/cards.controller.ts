import { Body, Controller, Post, Get, Put, Param, ParseIntPipe } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/card-update.dto';

@Controller('cards')
export class CardsController {

    constructor(private cardsService: CardsService) {   }

    @Post()
    createPost ( @Body () card: CreateCardDto ){

        return this.cardsService.createCard(card)

    }

    @Get()
    getAllUsers(){

        return this.cardsService.getAllUsers()

    }

    @Put(':id')
    updateUser( @Param('id', ParseIntPipe) id : number , @Body() user : UpdateCardDto){

        return this.cardsService.updateUser(id, user)

    }

    

}
