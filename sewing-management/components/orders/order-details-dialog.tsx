import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Order, Client, Garment } from "@/lib/api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OrderDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
  clients: Client[]
  garments: Garment[]
}

export function OrderDetailsDialog({ isOpen, onClose, order, clients, garments }: OrderDetailsDialogProps) {
  if (!order) return null

  const client = clients.find((c) => c.id === order.clientId)

  const getGarmentName = (garmentId: string) => {
    const garment = garments.find((g) => g.id === garmentId)
    return garment ? garment.name : "Unknown Garment"
  }

  const getGarmentType = (garmentId: string) => {
    const garment = garments.find((g) => g.id === garmentId)
    return garment ? garment.type : "Unknown Type"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Order #{order.orderNumber} - {new Date(order.date).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
              <p className="text-base">{client?.name || "Unknown Client"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
              <p className="text-base">{client?.contact || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
              <p className="text-base">{client?.address || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
              <p className="text-base font-medium">${order.totalValue.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Garments</h3>
            <ScrollArea className="h-[200px] rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Unit Value</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.garments.map((garment, index) => (
                    <TableRow key={index}>
                      <TableCell>{getGarmentName(garment.garmentId)}</TableCell>
                      <TableCell>{garment.type || getGarmentType(garment.garmentId)}</TableCell>
                      <TableCell>{garment.amount}</TableCell>
                      <TableCell>${garment.value.toFixed(2)}</TableCell>
                      <TableCell>${(garment.amount * garment.value).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

