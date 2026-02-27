"use client";

import Link from "next/link";
import { useRaffle } from "@/context/RaffleContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Ticket, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const { state, deleteRaffle } = useRaffle();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDelete = () => {
    if (deleteId) {
      deleteRaffle(deleteId);
      setDeleteId(null);
      toast({
        title: "Rifa excluída",
        description: "A rifa foi removida com sucesso.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Sorteios</h1>
          <p className="text-muted-foreground">Gerencie suas rifas e acompanhe seus ganhos.</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="p-4 flex items-center gap-3 shadow-none border bg-secondary/20">
             <div className="bg-green-100 p-2 rounded-full">
                <Wallet className="h-5 w-5 text-green-600" />
             </div>
             <div>
                <p className="text-xs font-medium text-muted-foreground">Saldo Disponível</p>
                <p className="text-lg font-bold text-green-700">R$ {state.balance.toFixed(2)}</p>
             </div>
          </Card>
          <Link href="/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Rifa
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.raffles.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-lg bg-muted/10">
            <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium">Nenhuma rifa criada</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-sm">Comece criando sua primeira rifa para compartilhar com seus amigos e arrecadar fundos.</p>
            <Link href="/create">
              <Button variant="outline">Criar Rifa Agora</Button>
            </Link>
          </div>
        ) : (
          state.raffles.map((raffle) => (
            <Card key={raffle.id} className="flex flex-col group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl truncate pr-2">{raffle.title}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded bg-secondary font-medium uppercase tracking-wide">
                        {raffle.theme}
                    </span>
                </div>
                <CardDescription className="line-clamp-2 min-h-[40px]">{raffle.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Preço</p>
                        <p className="font-semibold">R$ {raffle.ticketPrice.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Vendidos</p>
                        <p className="font-semibold">{raffle.soldTickets.length} / {raffle.totalTickets}</p>
                    </div>
                 </div>
                 <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-500"
                        style={{ width: `${(raffle.soldTickets.length / raffle.totalTickets) * 100}%` }}
                    />
                 </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2 border-t pt-4 bg-muted/5">
                <Link href={`/raffle/${raffle.id}`} className="flex-1">
                   <Button variant="outline" className="w-full">Ver Rifa</Button>
                </Link>

                {/* Delete Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteId(raffle.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Excluir Rifa?</DialogTitle>
                      <DialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente a rifa &quot;{raffle.title}&quot; e todos os dados associados.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
                      <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
