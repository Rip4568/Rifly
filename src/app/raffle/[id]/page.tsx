"use client";

import { useRaffle } from "@/context/RaffleContext";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
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
  Trophy,
  Sparkles,
  HeartHandshake,
  Banknote,
  PartyPopper,
  Gem,
  Cake,
  Music,
  Gift,
  Palmtree,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  // Advanced Visual Themes
  const themeStyles = {
    default: {
      bg: "bg-slate-950",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black",
      card: "bg-slate-900/60 backdrop-blur-xl border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
      textPrimary: "text-white",
      textSecondary: "text-slate-400",
      ticketDefault:
        "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700",
      accent: "text-indigo-400",
      Icon: Sparkles,
      iconColor: "text-indigo-500/5",
    },
    football: {
      bg: "bg-emerald-950",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-950 to-black",
      card: "bg-emerald-900/40 backdrop-blur-xl border-emerald-800/50 shadow-[0_8px_32px_rgba(5,150,105,0.15)]",
      textPrimary: "text-emerald-50",
      textSecondary: "text-emerald-200/70",
      ticketDefault:
        "bg-emerald-800/50 text-emerald-100 hover:bg-emerald-600 hover:text-white border border-emerald-700 shadow-sm",
      accent: "text-emerald-400",
      Icon: Trophy,
      iconColor: "text-emerald-500/5",
    },
    baby: {
      bg: "bg-rose-50",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-pink-50 to-white",
      card: "bg-white/60 backdrop-blur-xl border-pink-100 shadow-[0_8px_32px_rgba(244,114,182,0.15)]",
      textPrimary: "text-rose-950",
      textSecondary: "text-rose-700/80",
      ticketDefault:
        "bg-white text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200 shadow-sm",
      accent: "text-rose-600",
      Icon: HeartHandshake,
      iconColor: "text-rose-500/5",
    },
    money: {
      bg: "bg-amber-50",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100 via-yellow-50 to-white",
      card: "bg-white/60 backdrop-blur-xl border-amber-200/50 shadow-[0_8px_32px_rgba(245,158,11,0.1)]",
      textPrimary: "text-amber-950",
      textSecondary: "text-amber-700/80",
      ticketDefault:
        "bg-white text-amber-700 hover:bg-amber-100 hover:text-amber-900 border border-amber-200 shadow-sm",
      accent: "text-amber-600",
      Icon: Banknote,
      iconColor: "text-amber-500/5",
    },
    party: {
      bg: "bg-fuchsia-950",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-900 via-purple-950 to-black",
      card: "bg-fuchsia-900/40 backdrop-blur-xl border-fuchsia-800/50 shadow-[0_8px_32px_rgba(192,38,211,0.15)]",
      textPrimary: "text-fuchsia-50",
      textSecondary: "text-fuchsia-200/70",
      ticketDefault:
        "bg-fuchsia-800/50 text-fuchsia-100 hover:bg-fuchsia-600 hover:text-white border border-fuchsia-700 shadow-sm",
      accent: "text-fuchsia-400",
      Icon: PartyPopper,
      iconColor: "text-fuchsia-500/5",
    },
    wedding: {
      bg: "bg-stone-50",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-white",
      card: "bg-white/60 backdrop-blur-xl border-stone-200 shadow-[0_8px_32px_rgba(120,113,108,0.1)]",
      textPrimary: "text-stone-900",
      textSecondary: "text-stone-500",
      ticketDefault:
        "bg-white text-stone-600 hover:bg-stone-100/50 hover:text-stone-900 border border-stone-200 shadow-sm",
      accent: "text-orange-400",
      Icon: Gem,
      iconColor: "text-orange-500/5",
    },
    birthday: {
      bg: "bg-yellow-50",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100 via-amber-50 to-white",
      card: "bg-white/60 backdrop-blur-xl border-yellow-200 shadow-[0_8px_32px_rgba(234,179,8,0.1)]",
      textPrimary: "text-yellow-950",
      textSecondary: "text-yellow-700/80",
      ticketDefault:
        "bg-white text-yellow-700 hover:bg-yellow-100 hover:text-yellow-900 border border-yellow-200 shadow-sm",
      accent: "text-yellow-500",
      Icon: Cake,
      iconColor: "text-yellow-500/5",
    },
    carnival: {
      bg: "bg-violet-950",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900 via-fuchsia-950 to-rose-950",
      card: "bg-white/10 backdrop-blur-xl border-rose-500/20 shadow-[0_8px_32px_rgba(244,63,94,0.15)]",
      textPrimary: "text-white",
      textSecondary: "text-rose-200/70",
      ticketDefault:
        "bg-white/5 text-rose-100 hover:bg-rose-600 hover:text-white border border-rose-500/30 shadow-sm",
      accent: "text-rose-400",
      Icon: Music,
      iconColor: "text-rose-500/5",
    },
    christmas: {
      bg: "bg-red-950",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900 via-red-950 to-emerald-950",
      card: "bg-black/20 backdrop-blur-xl border-red-800/50 shadow-[0_8px_32px_rgba(220,38,38,0.15)]",
      textPrimary: "text-red-50",
      textSecondary: "text-red-200/70",
      ticketDefault:
        "bg-red-900/30 text-red-100 hover:bg-red-600 hover:text-white border border-red-800 border-opacity-50 shadow-sm",
      accent: "text-emerald-400",
      Icon: Gift,
      iconColor: "text-red-500/5",
    },
    beach: {
      bg: "bg-cyan-50",
      gradient:
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100 via-sky-50 to-white",
      card: "bg-white/60 backdrop-blur-xl border-cyan-100 shadow-[0_8px_32px_rgba(6,182,212,0.1)]",
      textPrimary: "text-cyan-950",
      textSecondary: "text-cyan-700/80",
      ticketDefault:
        "bg-white text-cyan-600 hover:bg-cyan-100/50 hover:text-cyan-800 border border-cyan-200 shadow-sm",
      accent: "text-sky-500",
      Icon: Palmtree,
      iconColor: "text-cyan-500/5",
    },
  };

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

  return (
    <div
      className={`min-h-[100dvh] relative overflow-hidden ${currentTheme.bg} ${currentTheme.gradient}`}
    >
      {/* Constellation Decorative Background Icons */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Central Giant Icon */}
        <BackgroundIcon
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] ${currentTheme.iconColor} -rotate-12 transform-gpu`}
          strokeWidth={0.5}
        />

        {/* Floating background particles */}
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

      <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-8 relative z-10">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className={`mb-2 cursor-pointer bg-transparent border-white/10 hover:bg-black/10 transition-colors ${currentTheme.textPrimary}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Raffle Info */}
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
                    {raffle.totalTickets - raffle.soldTickets.length} /{" "}
                    {raffle.totalTickets}
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
                    {Math.round(
                      (raffle.soldTickets.length / raffle.totalTickets) * 100,
                    )}
                    % dos bilhetes vendidos
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

          {/* Ticket Grid */}
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
                  Selecione quantos bilhetes quiser abaixo.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
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
                          aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 transform focus:outline-none z-10
                          ${
                            isSold
                              ? "bg-black/10 dark:bg-white/5 text-foreground/30 cursor-not-allowed border border-transparent shadow-inner"
                              : isSelected
                                ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_20px_rgba(139,92,246,0.6)] ring-2 ring-primary ring-offset-2 ring-offset-background -translate-y-1"
                                : `cursor-pointer hover:-translate-y-1 hover:shadow-lg ${currentTheme.ticketDefault}`
                          }
                        `}
                        aria-label={`Bilhete número ${number}`}
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

      {/* Purchase Panel Summary */}
      {selectedTickets.length > 0 && !purchaseSuccess && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom-5">
          <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                  {selectedTickets.length}
                </span>
                <span className="text-sm font-medium">
                  Bilhetes Selecionados
                </span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <div className="text-xs text-muted-foreground max-w-[200px] truncate">
                Nº: {selectedTickets.sort((a, b) => a - b).join(", ")}
              </div>
            </div>
            <div className="flex items-center gap-6 w-full sm:w-auto mt-2 sm:mt-0">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  R$ {(raffle.ticketPrice * selectedTickets.length).toFixed(2)}
                </span>
              </div>

              {/* Remove nested Dialog from fixed Summary logic and use simple Button hook */}
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

      {/* Actual Dialog for confirmation */}
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
                <span className="text-2xl font-bold text-green-500">
                  R$ {(raffle.ticketPrice * selectedTickets.length).toFixed(2)}
                </span>
              </div>
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
