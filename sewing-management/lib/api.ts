// Types based on the provided backend models
export interface Client {
  id: string
  name: string
  contact: string
  address: string
}

export interface Garment {
  id: string
  name: string
  type: string
  value: number
}

export interface GarmentOrder {
  garmentId: string
  amount: number
  value: number
  type?: string // Included in the response
}

export interface Order {
  id: string
  orderNumber: string // Added orderNumber field
  date: string
  clientId: string
  totalValue: number
  garments: GarmentOrder[]
}

// API base URL - replace with your actual backend URL
const API_BASE_URL = "http://localhost:3000" // Change this to your backend URL

// Client API
export const clientApi = {
  findAll: async (): Promise<Client[]> => {
    const response = await fetch(`${API_BASE_URL}/client/findAll`)
    if (!response.ok) throw new Error("Failed to fetch clients")
    return response.json()
  },

  create: async (client: Omit<Client, "id">): Promise<{ isCreated: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/client/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
    if (!response.ok) throw new Error("Failed to create client")
    return response.json()
  },

  delete: async (id: string): Promise<{ isDelete: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/client/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (!response.ok) throw new Error("Failed to delete client")
    return response.json()
  },
}

// Garment API
export const garmentApi = {
  findAll: async (): Promise<Garment[]> => {
    const response = await fetch(`${API_BASE_URL}/garment/findAll`)
    if (!response.ok) throw new Error("Failed to fetch garments")
    return response.json()
  },

  create: async (garment: Omit<Garment, "id">): Promise<{ isCreated: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/garment/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(garment),
    })
    if (!response.ok) throw new Error("Failed to create garment")
    return response.json()
  },

  delete: async (id: string): Promise<{ isDeleted: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/garment/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (!response.ok) throw new Error("Failed to delete garment")
    return response.json()
  },
}

// Order API
export const orderApi = {
  findAll: async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/order/findAll`)
    if (!response.ok) throw new Error("Failed to fetch orders")
    return response.json()
  },

  create: async (order: {
    clientId: string
    date?: Date
    garments: Omit<GarmentOrder, "type">[]
  }): Promise<{ isCreated: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/order/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
    if (!response.ok) throw new Error("Failed to create order")
    return response.json()
  },

  delete: async (id: string): Promise<{ isDeleted: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/order/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (!response.ok) throw new Error("Failed to delete order")
    return response.json()
  },
}