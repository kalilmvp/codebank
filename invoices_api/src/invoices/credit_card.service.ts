import { Injectable } from '@nestjs/common';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
import { UpdateCreditCardDto } from './dto/update-credit-card.dto';
import { Repository } from 'typeorm';
import { CreditCard } from './entities/credit_card.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepo: Repository<CreditCard>,
  ) {}

  create(createCreditCardDto: CreateCreditCardDto) {
    const creditCard = this.creditCardRepo.create(createCreditCardDto);
    return this.creditCardRepo.save(creditCard);
  }

  findAll() {
    return this.creditCardRepo.find();
  }
}
