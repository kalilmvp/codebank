import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit_card.entity';
import { Invoice } from './entities/invoice.entity';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit_card.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard, Invoice])],
  controllers: [InvoicesController, CreditCardController],
  providers: [InvoicesService, CreditCardService],
})
export class InvoicesModule {}
