"use client";

import { useRaffle } from "@/context/RaffleContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Ticket,
  ArrowLeft,
  Loader2,
  Check,
  Share2,
  Zap,
  X,
  Shuffle,
} from "lucide-react";
import { themeStyles } from "@/lib/themes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const QUICK_ACTIONS = [3, 5, 7, 10] as const;

export default function RaffleDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { state, buyTicket } = useRaffle();
  const { toast } = useToast();
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const raffle = state.raffles.find((r) => r.id === id);

  const availableTickets = useMemo(() => {
    if (!raffle) return [];
    return Array.from({ length: raffle.totalTickets }, (_, i) => i + 1).filter(
      (n) => !raffle.soldTickets.includes(n) && !selectedTickets.includes(n),
    );
  }, [raffle, selectedTickets]);

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

    setSelectedTickets((prev) =>
      prev.includes(number)
        ? prev.filter((t) => t !== number)
        : [...prev, number],
    );
  };

  const handleQuickAdd = useCallback(
    (qty: number) => {
      if (availableTickets.length === 0) {
        toast({
          title: "Sem bilhetes disponíveis",
          description: "Todos os bilhetes já foram vendidos ou selecionados.",
          variant: "destructive",
        });
        return;
      }

      const canAdd = Math.min(qty, availableTickets.length);
      const shuffled = [...availableTickets].sort(() => Math.random() - 0.5);
      const toAdd = shuffled.slice(0, canAdd);

      setSelectedTickets((prev) => [...prev, ...toAdd]);

      if (canAdd < qty) {
        toast({
          title: `${canAdd} bilhete(s) adicionado(s)`,
          description: `Só havia ${canAdd} disponível(is).`,
        });
      }
    },
    [availableTickets, toast],
  );

  const handleClearSelection = () => {
    setSelectedTickets([]);
  };

  const handleLucky = useCallback(() => {
    if (availableTickets.length === 0) return;
    const random =
      availableTickets[Math.floor(Math.random() * availableTickets.length)];
    setSelectedTickets((prev) =>
      prev.includes(random) ? prev : [...prev, random],
    );
    toast({
      title: "🍀 Número da sorte adicionado!",
      description: `Bilhete #${random} foi selecionado.`,
    });
  }, [availableTickets, toast]);

  const confirmPurchase = async () => {
    if (selectedTickets.length === 0) return;
    setIsBuying(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    buyTicket(raffle.id, selectedTickets);
    setIsBuying(false);
    setIsDialogOpen(false);

    router.push(
      `/success?raffleId=${raffle.id}&tickets=${selectedTickets.join(",")}`,
    );
  };

  const handleCloseDialog = () => {
    if (isBuying) return;
    setIsDialogOpen(false);
    setSelectedTickets([]);
    setPurchaseSuccess(false);
  };

  const currentTheme = raffle
    ? themeStyles[raffle.theme] || themeStyles.default
    : themeStyles.default;
  const BackgroundIcon = currentTheme.Icon;

  const availableCount = raffle.totalTickets - raffle.soldTickets.length;
  const soldPercent = Math.round(
    (raffle.soldTickets.length / raffle.totalTickets) * 100,
  );

  return (
    <div
      className={`min-h-[100dvh] relative overflow-hidden ${currentTheme.bg} ${currentTheme.gradient}`}
    >
      {/* Ícones decorativos de fundo */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <BackgroundIcon
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] ${currentTheme.iconColor} -rotate-12 transform-gpu`}
          strokeWidth={0.5}
        />
        <BackgroundIcon
          className={`absolute top-[10%] left-[5%] w-32 h-32 ${currentTheme.iconColor} rotate-[15deg] opacity-50 hidden sm:block`}
          strokeWidth={1}
        />
        <BackgroundIcon
          className={`absolute bottom-[15%] right-[10%] w-48 h-48 ${currentTheme.iconColor} -rotate-[25deg] opacity-40`}
          strokeWidth={1}
        />
        <BackgroundIcon
          className={`absolute top-[20%] right-[5%] w-24 h-24 ${currentTheme.iconColor} rotate-[45deg] opacity-60`}
          strokeWidth={1}
        />
        <BackgroundIcon
          className={`absolute bottom-[10%] left-[15%] w-40 h-40 ${currentTheme.iconColor} -rotate-[15deg] opacity-30`}
          strokeWidth={0.5}
        />
      </div>

      <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-8 relative z-10 pb-40">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className={`mb-2 cursor-pointer bg-transparent border-white/10 hover:bg-black/10 transition-colors ${currentTheme.textPrimary}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Informações da Rifa */}
          <div className="lg:col-span-1 space-y-6">
            <Card
              className={`sticky top-8 ${currentTheme.card} transition-all duration-300`}
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${
                    raffle.theme === "default" || raffle.theme === "football"
                      ? "bg-white/10"
                      : "bg-black/5"
                  }`}
                >
                  <Ticket className={`h-6 w-6 ${currentTheme.accent}`} />
                </div>
                <CardTitle
                  className={`text-3xl font-bold leading-tight ${currentTheme.textPrimary}`}
                >
                  {raffle.title}
                </CardTitle>
                <CardDescription
                  className={`text-base font-medium mt-2 ${currentTheme.textSecondary}`}
                >
                  {raffle.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span
                    className={`text-sm font-medium ${currentTheme.textSecondary}`}
                  >
                    Valor por Bilhete
                  </span>
                  <span
                    className={`text-2xl font-black ${currentTheme.accent}`}
                  >
                    R$ {raffle.ticketPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span
                    className={`text-sm font-medium ${currentTheme.textSecondary}`}
                  >
                    Bilhetes Disponíveis
                  </span>
                  <span className={`font-bold ${currentTheme.textPrimary}`}>
                    {availableCount} / {raffle.totalTickets}
                  </span>
                </div>
                <div className="pt-2">
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden shadow-inner ${
                      raffle.theme === "default" || raffle.theme === "football"
                        ? "bg-black/40"
                        : "bg-black/10"
                    }`}
                  >
                    <div
                      className={`h-full transition-all duration-1000 ease-out relative ${
                        raffle.theme === "default" ||
                        raffle.theme === "football"
                          ? "bg-primary"
                          : "bg-current " + currentTheme.accent
                      }`}
                      style={{
                        width: `${Math.max(2, (raffle.soldTickets.length / raffle.totalTickets) * 100)}%`,
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                  <p
                    className={`text-xs text-center mt-3 font-medium ${currentTheme.textSecondary}`}
                  >
                    {soldPercent}% dos bilhetes vendidos
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  variant="outline"
                  className={`w-full gap-2 font-bold cursor-pointer ${
                    raffle.theme === "default" || raffle.theme === "football"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                      : "bg-black/5 hover:bg-black/10 border-black/10 " +
                        currentTheme.textPrimary
                  }`}
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link da Sorte copiado!",
                      description: "Envie para seus amigos no WhatsApp.",
                    });
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Compartilhar Rifa
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Grade de Bilhetes */}
          <div className="lg:col-span-2">
            <Card className="h-full border-none shadow-none bg-transparent">
              <CardHeader className="px-0 sm:px-6">
                <CardTitle
                  className={`text-3xl font-black ${currentTheme.textPrimary}`}
                >
                  Escolha seu Número da Sorte
                </CardTitle>
                <CardDescription
                  className={`text-base font-medium ${currentTheme.textSecondary}`}
                >
                  Selecione manualmente ou use as seleções rápidas abaixo.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0 sm:px-6 space-y-5">
                {/* Quick Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-sm font-semibold mr-1 flex items-center gap-1.5 ${currentTheme.textSecondary}`}
                  >
                    <Zap className="h-4 w-4" />
                    Seleção Rápida:
                  </span>

                  {QUICK_ACTIONS.map((qty) => {
                    const canAdd = Math.min(qty, availableTickets.length);
                    const disabled = availableTickets.length === 0;
                    return (
                      <button
                        key={qty}
                        onClick={() => handleQuickAdd(qty)}
                        disabled={disabled}
                        className={`
                          px-3 py-1.5 rounded-lg text-sm font-bold border transition-all duration-200
                          ${
                            disabled
                              ? "opacity-30 cursor-not-allowed border-white/10 text-white/30"
                              : "cursor-pointer hover:scale-105 active:scale-95 border-primary/40 bg-primary/15 text-primary hover:bg-primary/25 hover:border-primary/70 shadow-sm hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                          }
                        `}
                        title={
                          canAdd < qty
                            ? `Apenas ${canAdd} disponíveis`
                            : `Adicionar ${qty} bilhetes aleatórios`
                        }
                      >
                        +{qty}
                      </button>
                    );
                  })}

                  {/* Botão sorte */}
                  <button
                    onClick={handleLucky}
                    disabled={availableTickets.length === 0}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm font-bold border transition-all duration-200 flex items-center gap-1.5
                      ${
                        availableTickets.length === 0
                          ? "opacity-30 cursor-not-allowed border-white/10 text-white/30"
                          : "cursor-pointer hover:scale-105 active:scale-95 border-amber-400/40 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 hover:border-amber-400/70 shadow-sm"
                      }
                    `}
                    title="Adicionar um número aleatório da sorte"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                    Sortear 1
                  </button>

                  {/* Limpar seleção */}
                  {selectedTickets.length > 0 && (
                    <button
                      onClick={handleClearSelection}
                      className="ml-auto px-3 py-1.5 rounded-lg text-sm font-bold border border-red-400/30 bg-red-400/10 text-red-400 hover:bg-red-400/20 hover:border-red-400/60 transition-all duration-200 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <X className="h-3.5 w-3.5" />
                      Limpar ({selectedTickets.length})
                    </button>
                  )}
                </div>

                {/* Legenda */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                    <span className={currentTheme.textSecondary}>
                      Selecionado
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-3.5 h-3.5 rounded-sm ${currentTheme.ticketDefault.split(" ").slice(0, 1).join(" ")} border border-white/20`}
                    />
                    <span className={currentTheme.textSecondary}>
                      Disponível
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-sm bg-black/15 border border-transparent" />
                    <span className={currentTheme.textSecondary}>Vendido</span>
                  </div>
                </div>

                {/* Grid de Bilhetes */}
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
                  {ticketGrid.map((number) => {
                    const isSold = raffle.soldTickets.includes(number);
                    const isSelected = selectedTickets.includes(number);

                    return (
                      <button
                        key={number}
                        disabled={isSold}
                        onClick={() => handleTicketClick(number)}
                        className={`
                          aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-200 transform focus:outline-none z-10
                          ${
                            isSold
                              ? "bg-black/10 dark:bg-white/5 text-foreground/30 cursor-not-allowed border border-transparent shadow-inner"
                              : isSelected
                                ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_20px_rgba(139,92,246,0.6)] ring-2 ring-primary ring-offset-2 ring-offset-background -translate-y-1"
                                : `cursor-pointer hover:-translate-y-1 hover:shadow-lg active:scale-95 ${currentTheme.ticketDefault}`
                          }
                        `}
                        aria-label={`Bilhete número ${number}${isSold ? " (vendido)" : isSelected ? " (selecionado)" : ""}`}
                        aria-pressed={isSelected}
                      >
                        {isSelected ? <Check className="h-4 w-4" /> : number}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Painel de Compra Fixo */}
      {selectedTickets.length > 0 && !purchaseSuccess && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom-5">
          <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold tabular-nums">
                  {selectedTickets.length}
                </span>
                <span className="text-sm font-medium">
                  Bilhetes Selecionados
                </span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="text-xs text-muted-foreground max-w-[200px] truncate">
                Nº: {[...selectedTickets].sort((a, b) => a - b).join(", ")}
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
              {/* Botão limpar inline no painel */}
              <button
                onClick={handleClearSelection}
                className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                title="Limpar seleção"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Total:</span>
                <span className="text-2xl font-bold text-green-600 tabular-nums">
                  R$ {(raffle.ticketPrice * selectedTickets.length).toFixed(2)}
                </span>
              </div>
              <Button
                size="lg"
                onClick={() => setIsDialogOpen(true)}
                className="w-full sm:w-auto h-12 px-8 font-bold cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                Finalizar Compra
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => !open && handleCloseDialog()}
      >
        <DialogContent className="sm:max-w-[425px]">
          <>
            <DialogHeader>
              <DialogTitle>Confirmar Compra</DialogTitle>
              <DialogDescription>
                Você está prestes a adquirir{" "}
                <span className="font-bold text-primary">
                  {selectedTickets.length} bilhete(s)
                </span>
                .
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg border">
                <span className="text-sm font-medium">Total a Pagar:</span>
                <span className="text-2xl font-bold text-green-500 tabular-nums">
                  R$ {(raffle.ticketPrice * selectedTickets.length).toFixed(2)}
                </span>
              </div>

              {/* Lista dos bilhetes selecionados no modal */}
              {selectedTickets.length <= 20 && (
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {[...selectedTickets]
                    .sort((a, b) => a - b)
                    .map((n) => (
                      <span
                        key={n}
                        className="text-xs font-bold px-2 py-1 rounded-md bg-primary/15 text-primary border border-primary/30"
                      >
                        #{n}
                      </span>
                    ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Ao confirmar, o valor será debitado do seu saldo simulado.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isBuying}
              >
                Cancelar
              </Button>
              <Button
                onClick={confirmPurchase}
                disabled={isBuying}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isBuying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Confirmar Pagamento
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
}
