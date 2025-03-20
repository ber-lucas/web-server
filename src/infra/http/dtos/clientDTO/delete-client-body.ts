import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteClientBody {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
