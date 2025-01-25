import { ClientRepository } from '../../repositories/client-repository';

interface DeleteClientRequest {
  id: string;
}

interface DeleteClientResponse {
  success: boolean;
}

export class DeleteClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(request: DeleteClientRequest): Promise<DeleteClientResponse> {
    const { id } = request;

    const response = await this.clientRepository.delete(id);

    return {
      success: response,
    };
  }
}
