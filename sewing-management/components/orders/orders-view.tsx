'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { type Client, clientApi, type Garment, garmentApi, type Order, orderApi } from '@/lib/api';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { OrderForm } from './order-form';
import { OrderDetailsDialog } from './order-details-dialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [garments, setGarments] = useState<Garment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [ordersData, clientsData, garmentsData] = await Promise.all([
        orderApi.findAll(),
        clientApi.findAll(),
        garmentApi.findAll(),
      ])
      setOrders(ordersData)
      setClients(clientsData)
      setGarments(garmentsData)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao buscar dados",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateOrder = async (order: {
    clientId: string
    date?: Date
    garments: { garmentId: string; amount: number; value: number }[]
  }) => {
    try {
      setIsSubmitting(true)
      const result = await orderApi.create(order)
      if (result.isCreated) {
        toast({
          title: "Sucesso",
          description: "Pedido criado com sucesso",
        })
        setIsCreateDialogOpen(false)
        fetchData()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar pedido",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return

    try {
      setIsSubmitting(true)
      const result = await orderApi.delete(selectedOrder.id)
      if (result.isDeleted) {
        toast({
          title: "Sucesso",
          description: "Pedido excluído com sucesso",
        })
        setIsDeleteDialogOpen(false)
        fetchData()
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao excluir pedido",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsDialogOpen(true)
  }

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    return client ? client.name : "Cliente Desconhecido"
  }

  // Prepare data for search by client name
  const ordersWithClientNames = orders.map((order) => ({
    ...order,
    clientName: getClientName(order.clientId),
  }))

  // Função para corrigir o problema de fuso horário nas datas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    // Adiciona o fuso horário local para corrigir o problema de exibição
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString()
  }

  const columns = [
    {
      key: "orderNumber",
      title: "Nº Pedido",
    },
    {
      key: "date",
      title: "Data",
      render: (order: Order) => formatDate(order.date),
    },
    {
      key: "clientId",
      title: "Cliente",
      render: (order: Order) => getClientName(order.clientId),
    },
    {
      key: "totalValue",
      title: "Valor Total",
      render: (order: Order) => `R$${order.totalValue.toFixed(2)}`,
    },
    {
      key: "garments",
      title: "Itens",
      render: (order: Order) => order.garments.length,
    },
    {
      key: "actions",
      title: "Ações",
      render: (order: Order) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedOrder(order)
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
        <h2 className="text-2xl font-semibold">Pedidos</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      ) : (
        <DataTable
          data={ordersWithClientNames}
          columns={columns}
          searchField="clientName"
          searchPlaceholder="Buscar por nome do cliente..."
          onRowClick={handleRowClick}
        />
      )}

      <OrderForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateOrder}
        clients={clients}
        garments={garments}
        isSubmitting={isSubmitting}
      />

      <OrderDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        order={selectedOrder}
        clients={clients}
        garments={garments}
      />

      <ConfirmDialog
        title="Excluir Pedido"
        description={`Tem certeza que deseja excluir este pedido? Esta ação não pode ser desfeita.`}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteOrder}
        isConfirming={isSubmitting}
      />
    </div>
  )
}

