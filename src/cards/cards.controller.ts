import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/card.dto';
import { UpdateCardDto } from './dto/card-update.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  createPost(@Body() card: CreateCardDto) {
    return this.cardsService.createCard(card);
  }

  @Get()
  getAllUsers() {
    return this.cardsService.getAllUsers();
  }

  @Get(':date')
  getCardDate(@Param('date') date: Date) {
    return this.cardsService.getCardDate(date);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateCardDto,
  ) {
    return this.cardsService.updateUser(id, user);
  }
  @Delete(':id')
  deletUser(@Param('id', ParseIntPipe) id: number) {
    return this.cardsService.deleteCard(id);
  }
}
