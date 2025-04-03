import {
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GarmentOrder } from '../../../../app/entities/order';

class GarmentOrderBody {
  @IsUUID()
  @IsNotEmpty()
  garmentId: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}

export class CreateOrderBody {
  @IsISO8601()
  @IsOptional()
  date: Date;

  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GarmentOrderBody)
  garments: GarmentOrder[];
}
