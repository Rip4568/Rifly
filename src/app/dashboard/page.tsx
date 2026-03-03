"use client";

import Link from "next/link";
import { useRaffle } from "@/context/RaffleContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Ticket,
  Wallet,
  ArrowLeft,
  Trophy,
  Lock,
  CheckCircle2,
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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DrawRaffleModal } from "@/components/DrawRaffleModal";
import type { Raffle } from "@/types";

export default function DashboardPage() {
  const { state, deleteRaffle, closeRaffle } = useRaffle();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [drawRaffle, setDrawRaffle] = useState<Raffle | null>(null);
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

  const handleDrawConfirm = (winner: number) => {
    if (!drawRaffle) return;
    closeRaffle(drawRaffle.id, winner);
    toast({
      title: "🏆 Rifa Encerrada!",
      description: `O número vencedor foi o #${winner}.`,
    });
    setDrawRaffle(null);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-10 animate-in fade-in zoom-in-95 duration-500 relative min-h-[80vh]">
      {/* Background Glows */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Meus Sorteios</h1>
          </div>
          <p className="text-muted-foreground ml-10">
            Gerencie suas rifas e acompanhe seus ganhos.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full md:w-auto">
          {/* Card de Saldo */}
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-emerald-500/20 to-teal-500/10 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
            <Card className="relative flex items-center justify-between sm:justify-start gap-4 p-4 pr-6 rounded-2xl border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-green-500/60 to-transparent opacity-50" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-green-500/20 rounded-full blur-[40px] pointer-events-none" />
              <div className="relative bg-gradient-to-br from-green-400/20 to-emerald-900/40 p-3 rounded-full border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Wallet className="h-6 w-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              </div>
              <div className="relative flex flex-col items-end sm:items-start">
                <p className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-widest mb-0.5">
                  Saldo Disponível
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-green-500/70">
                    R$
                  </span>
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-green-100 to-green-500 tracking-tighter drop-shadow-sm">
                    {state.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <Link href="/create" className="w-full sm:w-auto mt-2 sm:mt-0">
            <Button className="w-full h-14 sm:h-[68px] px-6 gap-2 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all hover:scale-105 active:scale-95">
              <Plus className="h-5 w-5" />
              Nova Rifa
            </Button>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
        {state.raffles.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 border border-dashed border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm">
            <div className="p-4 rounded-full bg-primary/10 mb-4 animate-bounce">
              <Ticket className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Nenhuma rifa criada</h3>
            <p className="text-muted-foreground mb-8 text-center max-w-sm">
              Comece criando sua primeira ação agora mesmo. Financie seus
              projetos engajando seus contatos.
            </p>
            <Link href="/create">
              <Button
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/20 hover:text-primary"
              >
                Começar
              </Button>
            </Link>
          </div>
        ) : (
          state.raffles.map((raffle, index) => {
            const isClosed = !!raffle.closedAt;

            return (
              <Card
                key={raffle.id}
                className={`flex flex-col group relative overflow-hidden backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isClosed
                    ? "bg-card/20 border-white/5 opacity-80 hover:opacity-100"
                    : "bg-card/40 border-white/5 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Linha de destaque no topo */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r transition-opacity duration-500 ${
                    isClosed
                      ? "from-transparent via-amber-500/50 to-transparent opacity-100"
                      : "from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Badge de encerrada */}
                {isClosed && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    <Lock className="h-3 w-3" />
                    Encerrada
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {raffle.title}
                    </CardTitle>
                    {!isClosed && (
                      <span className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-bold uppercase tracking-wider text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all">
                        {raffle.theme}
                      </span>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2 min-h-[40px] text-sm mt-3">
                    {raffle.description ||
                      "Nenhuma descrição fornecida para esta rifa."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Ganhador (se encerrada) */}
                  {isClosed && raffle.winner !== undefined && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-400 shrink-0" />
                        <span className="text-sm font-semibold text-amber-300">
                          Número Ganhador
                        </span>
                      </div>
                      <span className="text-3xl font-black text-amber-400 tabular-nums">
                        #{raffle.winner}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm bg-black/20 p-3 rounded-lg border border-white/5">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground mb-1">
                        Cota
                      </span>
                      <span className="font-bold text-foreground">
                        R$ {raffle.ticketPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground mb-1">
                        Vendidos
                      </span>
                      <span className="font-bold text-foreground">
                        <span className="text-primary">
                          {raffle.soldTickets.length}
                        </span>{" "}
                        / {raffle.totalTickets}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="text-primary">
                        {Math.round(
                          (raffle.soldTickets.length / raffle.totalTickets) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-secondary/30 h-1.5 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                          isClosed
                            ? "bg-gradient-to-r from-amber-500/60 to-amber-400"
                            : "bg-gradient-to-r from-primary/50 to-primary"
                        }`}
                        style={{
                          width: `${Math.max(2, (raffle.soldTickets.length / raffle.totalTickets) * 100)}%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-2 border-t border-white/5 pt-5 bg-black/10">
                  {!isClosed ? (
                    <>
                      <Link href={`/raffle/${raffle.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent border-white/10 hover:bg-white/5 hover:border-white/20 transition-all font-semibold"
                        >
                          Gerenciar Ação
                        </Button>
                      </Link>

                      {/* Botão Fechar Rifa */}
                      <Button
                        variant="outline"
                        className="shrink-0 bg-transparent border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/60 transition-all gap-1.5 font-semibold"
                        onClick={() => setDrawRaffle(raffle)}
                      >
                        <Trophy className="h-4 w-4" />
                        Fechar
                      </Button>

                      {/* Botão Deletar */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 bg-transparent border-white/10 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all"
                            onClick={() => setDeleteId(raffle.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] border-red-500/20 bg-background/95 backdrop-blur-xl">
                          <DialogHeader className="pt-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-4">
                              <Trash2 className="h-8 w-8 text-red-500" />
                            </div>
                            <DialogTitle className="text-center text-2xl font-bold">
                              Excluir Rifa
                            </DialogTitle>
                            <DialogDescription className="text-center pt-2 text-base">
                              Isso removerá{" "}
                              <span className="text-foreground font-bold">
                                &quot;{raffle.title}&quot;
                              </span>{" "}
                              para sempre. Todos os bilhetes vendidos e
                              simulações serão perdidos.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-center gap-2 pt-6">
                            <Button
                              variant="ghost"
                              className="hover:bg-white/5"
                              onClick={() => setDeleteId(null)}
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="destructive"
                              className="bg-red-500 hover:bg-red-600 font-bold"
                              onClick={handleDelete}
                            >
                              Sim, Excluir Agora
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground w-full justify-center py-1">
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                      <span>
                        Encerrada em{" "}
                        {raffle.closedAt
                          ? new Date(raffle.closedAt).toLocaleDateString(
                              "pt-BR",
                            )
                          : "—"}
                      </span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal de Sorteio */}
      {drawRaffle && (
        <DrawRaffleModal
          raffle={drawRaffle}
          open={!!drawRaffle}
          onClose={() => setDrawRaffle(null)}
          onConfirm={handleDrawConfirm}
        />
      )}
    </div>
  );
}
