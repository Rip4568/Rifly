"use client";

import { useRaffle } from "@/context/RaffleContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Ticket, ArrowLeft, Loader2, Check, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RaffleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { state, buyTicket } = useRaffle();
  const { toast } = useToast();
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [isBuying, setIsBuying] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const raffle = state.raffles.find((r) => r.id === id);

  const themeClasses = useMemo(() => {
    switch (raffle?.theme) {
      case "football":
        return "bg-green-600/90 text-white border-green-700 hover:bg-green-700/90";
      case "baby":
        return "bg-pink-100/90 text-pink-900 border-pink-300 hover:bg-pink-200/90";
      case "money":
        return "bg-emerald-900/90 text-yellow-400 border-yellow-600 hover:bg-emerald-950/90";
      default:
        return "bg-background text-foreground hover:bg-muted/50";
    }
  }, [raffle?.theme]);

  const ticketGrid = useMemo(() => {
    if (!raffle) return [];
    return Array.from({ length: raffle.totalTickets }, (_, i) => i + 1);
  }, [raffle]);

  if (!raffle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Carregando rifa...</p>
        <Button variant="link" onClick={() => router.push("/dashboard")}>
          Voltar para o Dashboard
        </Button>
      </div>
    );
  }

  const handleTicketClick = (number: number) => {
    if (raffle.soldTickets.includes(number)) return;
    setSelectedTicket(number);
  };

  const confirmPurchase = async () => {
    if (selectedTicket === null) return;
    setIsBuying(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    buyTicket(raffle.id, selectedTicket);
    setIsBuying(false);
    setPurchaseSuccess(true);
    toast({
      title: "Compra Realizada!",
      description: `Você adquiriu o bilhete nº ${selectedTicket} com sucesso.`,
      duration: 5000,
    });
  };

  const handleCloseDialog = () => {
    setSelectedTicket(null);
    setPurchaseSuccess(false);
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${raffle.theme === 'football' ? 'bg-green-50' : raffle.theme === 'baby' ? 'bg-pink-50' : raffle.theme === 'money' ? 'bg-slate-900' : 'bg-background'}`}>
      <div className="container mx-auto max-w-5xl space-y-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Raffle Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="sticky top-8 shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 w-fit p-2 rounded-lg mb-2">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{raffle.title}</CardTitle>
                <CardDescription className="text-base">{raffle.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Valor por Bilhete</span>
                  <span className="text-xl font-bold text-green-600">R$ {raffle.ticketPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                   <span className="text-muted-foreground">Bilhetes Disponíveis</span>
                   <span className="font-medium">{raffle.totalTickets - raffle.soldTickets.length} / {raffle.totalTickets}</span>
                </div>
                <div className="pt-4">
                  <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all duration-500 ease-out"
                        style={{ width: `${(raffle.soldTickets.length / raffle.totalTickets) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    {Math.round((raffle.soldTickets.length / raffle.totalTickets) * 100)}% dos bilhetes vendidos
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({ title: "Link copiado!", description: "Compartilhe com seus amigos." });
                }}>
                  <Share2 className="h-4 w-4" />
                  Compartilhar Rifa
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Ticket Grid */}
          <div className="md:col-span-2">
            <Card className="h-full border-none shadow-none bg-transparent">
              <CardHeader>
                <CardTitle className={raffle.theme === 'money' ? 'text-white' : ''}>Escolha seu Número da Sorte</CardTitle>
                <CardDescription className={raffle.theme === 'money' ? 'text-slate-400' : ''}>Clique em um número disponível para comprar.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {ticketGrid.map((number) => {
                    const isSold = raffle.soldTickets.includes(number);
                    return (
                      <button
                        key={number}
                        disabled={isSold}
                        onClick={() => handleTicketClick(number)}
                        className={`
                          aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
                          ${isSold
                            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            : `cursor-pointer shadow-sm hover:shadow-md ${themeClasses}`
                          }
                        `}
                        aria-label={`Bilhete número ${number} ${isSold ? '(Vendido)' : '(Disponível)'}`}
                      >
                        {number}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <Dialog open={selectedTicket !== null} onOpenChange={(open) => !open && handleCloseDialog()}>
        <DialogContent className="sm:max-w-[425px]">
          {purchaseSuccess ? (
             <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center animate-in fade-in zoom-in duration-300">
               <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                 <Check className="h-8 w-8 text-green-600" />
               </div>
               <h2 className="text-xl font-bold">Compra Confirmada!</h2>
               <p className="text-muted-foreground">O bilhete <span className="font-bold text-primary">#{selectedTicket}</span> agora é seu.</p>
               <Button className="w-full mt-4" onClick={handleCloseDialog}>Fechar</Button>
             </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Confirmar Compra</DialogTitle>
                <DialogDescription>
                  Você está prestes a adquirir o bilhete número <span className="font-bold text-primary text-lg">#{selectedTicket}</span>.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                 <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border">
                    <span className="text-sm font-medium">Total a Pagar:</span>
                    <span className="text-2xl font-bold text-green-600">R$ {raffle.ticketPrice.toFixed(2)}</span>
                 </div>
                 <p className="text-xs text-muted-foreground mt-4 text-center">
                    Ao confirmar, o valor será debitado do seu saldo (simulação).
                 </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog} disabled={isBuying}>Cancelar</Button>
                <Button onClick={confirmPurchase} disabled={isBuying}>
                  {isBuying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Confirmar Pagamento"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
