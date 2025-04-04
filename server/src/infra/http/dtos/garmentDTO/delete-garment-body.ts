import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteGarmentBody {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
