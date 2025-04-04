"use client"

import type React from "react"

import { useState } from "react"
import { SyringeIcon as Needle, Users, Shirt, Menu } from "lucide-react"
import OrdersView from "@/components/orders/orders-view"
import ClientsView from "@/components/clients/clients-view"
import GarmentsView from "@/components/garments/garments-view"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [activeView, setActiveView] = useState<"orders" | "clients" | "garments">("orders")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Needle className="h-6 w-6 text-rose-600" />
            <h1 className="text-xl font-semibold">Sewing Factory Management</h1>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <NavButton
              icon={<Shirt className="h-5 w-5" />}
              label="Orders"
              isActive={activeView === "orders"}
              onClick={() => setActiveView("orders")}
            />
            <NavButton
              icon={<Users className="h-5 w-5" />}
              label="Clients"
              isActive={activeView === "clients"}
              onClick={() => setActiveView("clients")}
            />
            <NavButton
              icon={<Needle className="h-5 w-5" />}
              label="Garments"
              isActive={activeView === "garments"}
              onClick={() => setActiveView("garments")}
            />
          </nav>
        </div>
      </header>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 shadow-sm">
          <nav className="container mx-auto px-4 py-2 flex flex-col gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${activeView === "orders" ? "bg-rose-50 text-rose-600" : "hover:bg-neutral-100"}`}
              onClick={() => {
                setActiveView("orders")
                setIsMobileMenuOpen(false)
              }}
            >
              <Shirt className="h-5 w-5" />
              <span>Orders</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${activeView === "clients" ? "bg-rose-50 text-rose-600" : "hover:bg-neutral-100"}`}
              onClick={() => {
                setActiveView("clients")
                setIsMobileMenuOpen(false)
              }}
            >
              <Users className="h-5 w-5" />
              <span>Clients</span>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${activeView === "garments" ? "bg-rose-50 text-rose-600" : "hover:bg-neutral-100"}`}
              onClick={() => {
                setActiveView("garments")
                setIsMobileMenuOpen(false)
              }}
            >
              <Needle className="h-5 w-5" />
              <span>Garments</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        {activeView === "orders" && <OrdersView />}
        {activeView === "clients" && <ClientsView />}
        {activeView === "garments" && <GarmentsView />}
      </div>
    </main>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
        isActive ? "bg-rose-50 text-rose-600" : "text-neutral-600 hover:bg-neutral-100"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

