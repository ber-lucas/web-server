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

export class GarmentOrderProperties {
  @IsUUID()
  id: string;

  @IsString()
  type: string;

  @IsNumber()
  value: number;
}

export class GarmentOrderBody {
  @IsNotEmpty()
  garment: GarmentOrderProperties;

  @IsInt()
  @IsNotEmpty()
  amount: number;
}

export class CreateOrderBody {
  @IsISO8601() // Valida que é uma string de data válida (ISO 8601)
  date: Date;

  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Permite validação em objetos dentro do array
  @Type(() => GarmentOrderBody) // Garante que os objetos dentro do array sejam instâncias de GarmentOrder
  garments: GarmentOrder[];
}
