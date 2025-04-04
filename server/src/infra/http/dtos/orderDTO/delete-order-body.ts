import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteOrderBody {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
