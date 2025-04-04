import { IsNotEmpty } from 'class-validator';

export class CreateClientBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  address: string;
}
