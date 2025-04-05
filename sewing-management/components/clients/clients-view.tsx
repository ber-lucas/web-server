'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { type Client, clientApi } from '@/lib/api';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { ClientForm } from './client-form';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

export default function ClientsView() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const fetchClients = async () => {
    try {
      setIsLoading(true)
      const data = await clientApi.findAll()
      setClients(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao buscar clientes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const handleCreateClient = async (client: Omit<Client, "id">) => {
    try {
      setIsSubmitting(true)
      const result = await clientApi.create(client)
      if (result.isCreated) {
        toast({
          title: "Sucesso",
          description: "Cliente criado com sucesso",
        })
        setIsCreateDialogOpen(false)
        fetchClients()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar cliente",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClient = async () => {
    if (!selectedClient) return

    try {
      setIsSubmitting(true)
      const result = await clientApi.delete(selectedClient.id)
      if (result.isDelete) {
        toast({
          title: "Sucesso",
          description: "Cliente excluído com sucesso",
        })
        setIsDeleteDialogOpen(false)
        fetchClients()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao excluir cliente",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    { key: "name", title: "Nome" },
    { key: "contact", title: "Contato" },
    { key: "address", title: "Endereço" },
    {
      key: "actions",
      title: "Ações",
      render: (client: Client) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedClient(client)
            setIsDeleteDialogOpen(true)
          }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Clientes</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      ) : (
        <DataTable data={clients} columns={columns} searchField="name" searchPlaceholder="Buscar por nome..." />
      )}

      <ClientForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateClient}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        title="Excluir Cliente"
        description={`Tem certeza que deseja excluir ${selectedClient?.name}? Esta ação não pode ser desfeita.`}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteClient}
        isConfirming={isSubmitting}
      />
    </div>
  )
}

