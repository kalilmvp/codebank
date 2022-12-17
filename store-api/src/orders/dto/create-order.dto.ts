import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { MinCallBack } from '../../validators/min-callback.rule';
import { Type } from 'class-transformer';
import { Exists } from '../../validators/exists.rule';
import { Product } from '../../products/entities/product.entity';

class CreditCardDTO {
  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  number: string;
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;
  @MinCallBack(() => new Date().getMonth() + 1)
  @IsInt()
  @IsNotEmpty()
  expiration_month: string;
  @MinCallBack(() => new Date().getFullYear())
  @IsInt()
  @IsNotEmpty()
  expiration_year: string;
  @MaxLength(4)
  @IsString()
  @IsNotEmpty()
  cvv: string;
}

class OrderItemDTO {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
  @Exists(Product)
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  product_id: string;
}

export class CreateOrderDto {
  @Type(() => CreditCardDTO)
  @ValidateNested()
  @IsObject()
  @IsNotEmpty()
  credit_card: CreditCardDTO;

  @Type(() => OrderItemDTO)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  items: OrderItemDTO[];
}
