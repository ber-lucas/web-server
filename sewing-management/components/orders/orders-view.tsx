"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2 } from "lucide-react"
import { type Order, type Client, type Garment, orderApi, clientApi, garmentApi } from "@/lib/api"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { OrderForm } from "./order-form"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { useToast } from "@/hooks/use-toast"

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [garments, setGarments] = useState<Garment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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
        title: "Error",
        description: "Failed to fetch data",
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
          title: "Success",
          description: "Order created successfully",
        })
        setIsCreateDialogOpen(false)
        fetchData()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create order",
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
          title: "Success",
          description: "Order deleted successfully",
        })
        setIsDeleteDialogOpen(false)
        fetchData()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    return client ? client.name : "Unknown Client"
  }

  const columns = [
    {
      key: "date",
      title: "Date",
      render: (order: Order) => new Date(order.date).toLocaleDateString(),
    },
    {
      key: "clientId",
      title: "Client",
      render: (order: Order) => getClientName(order.clientId),
    },
    {
      key: "totalValue",
      title: "Total Value",
      render: (order: Order) => `$${order.totalValue.toFixed(2)}`,
    },
    {
      key: "garments",
      title: "Items",
      render: (order: Order) => order.garments.length,
    },
    {
      key: "actions",
      title: "Actions",
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
        <h2 className="text-2xl font-semibold">Orders</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
        </div>
      ) : (
        <DataTable data={orders} columns={columns} searchField="clientId" />
      )}

      <OrderForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateOrder}
        clients={clients}
        garments={garments}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        title="Delete Order"
        description={`Are you sure you want to delete this order? This action cannot be undone.`}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteOrder}
        isConfirming={isSubmitting}
      />
    </div>
  )
}

