'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { type Garment, garmentApi } from '@/lib/api';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { GarmentForm } from './garment-form';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

export default function GarmentsView() {
  const [garments, setGarments] = useState<Garment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const fetchGarments = async () => {
    try {
      setIsLoading(true)
      const data = await garmentApi.findAll()
      setGarments(data)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao buscar peças",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGarments()
  }, [])

  const handleCreateGarment = async (garment: Omit<Garment, "id">) => {
    try {
      setIsSubmitting(true)
      const result = await garmentApi.create(garment)
      if (result.isCreated) {
        toast({
          title: "Sucesso",
          description: "Peça criada com sucesso",
        })
        setIsCreateDialogOpen(false)
        fetchGarments()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar peça",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteGarment = async () => {
    if (!selectedGarment) return

    try {
      setIsSubmitting(true)
      const result = await garmentApi.delete(selectedGarment.id)
      if (result.isDeleted) {
        toast({
          title: "Sucesso",
          description: "Peça excluída com sucesso",
        })
        setIsDeleteDialogOpen(false)
        fetchGarments()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao excluir peça",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    { key: "name", title: "Nome" },
    { key: "type", title: "Tipo" },
    {
      key: "value",
      title: "Valor",
      render: (garment: Garment) => `R$${garment.value.toFixed(2)}`,
    },
    {
      key: "actions",
      title: "Ações",
      render: (garment: Garment) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedGarment(garment)
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
        <h2 className="text-2xl font-semibold">Peças</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Peça
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      ) : (
        <DataTable data={garments} columns={columns} searchField="name" searchPlaceholder="Buscar por nome..." />
      )}

      <GarmentForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateGarment}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        title="Excluir Peça"
        description={`Tem certeza que deseja excluir ${selectedGarment?.name}? Esta ação não pode ser desfeita.`}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteGarment}
        isConfirming={isSubmitting}
      />
    </div>
  )
}

