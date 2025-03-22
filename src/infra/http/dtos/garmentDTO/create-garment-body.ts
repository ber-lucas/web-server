import { IsNotEmpty } from 'class-validator';

export class CreateGarmentBody {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  value: number;
}
