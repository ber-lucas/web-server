import { IsNotEmpty } from 'class-validator';

export class CreateGarmentBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  value: number;
}
