import { CreditCard } from './../entities/credit_card.entity';
import { Exists } from 'src/validators/exists.rule';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceDto {
  @Exists(CreditCard, 'number')
  @IsString()
  @IsNotEmpty()
  credit_card_number: string;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsISO8601()
  @IsNotEmpty()
  payment_date;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  store: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class KafkaCreateInvoiceDto {
  @Type(() => CreateInvoiceDto)
  @ValidateNested()
  @IsNotEmpty()
  @IsObject()
  value: CreateInvoiceDto;
}
