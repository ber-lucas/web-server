import {
  IsArray,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GarmentOrder } from '../../../../app/entities/order';

class GarmentOrderProperties {
  @IsString()
  type: string;

  @IsNumber()
  value: number;
}

class GarmentOrderBody {
  @IsNotEmpty()
  garment: GarmentOrderProperties;

  @IsUUID()
  garmentId: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;
}

export class CreateOrderBody {
  @IsISO8601()
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
