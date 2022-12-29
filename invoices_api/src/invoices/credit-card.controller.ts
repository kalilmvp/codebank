import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreditCardService } from './credit_card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@Controller('credit-cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardService.create(createCreditCardDto);
  }

  @Get()
  findAll() {
    return this.creditCardService.findAll();
  }
}
