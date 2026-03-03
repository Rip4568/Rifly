"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Star, Sparkles } from "lucide-react";
import type { Raffle } from "@/types";

type DrawPhase = "confirm" | "spinning" | "result";

interface DrawRaffleModalProps {
  raffle: Raffle;
  open: boolean;
  onClose: () => void;
  onConfirm: (winner: number) => void;
}

function pickWinner(raffle: Raffle): number {
  const pool =
    raffle.soldTickets.length > 0
      ? raffle.soldTickets
      : Array.from({ length: raffle.totalTickets }, (_, i) => i + 1);
  return pool[Math.floor(Math.random() * pool.length)];
}

export function DrawRaffleModal({
  raffle,
  open,
  onClose,
  onConfirm,
}: DrawRaffleModalProps) {
  const [phase, setPhase] = useState<DrawPhase>("confirm");
  const [displayNumber, setDisplayNumber] = useState<number>(1);
  const [winner, setWinner] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const allNumbers = Array.from(
    { length: raffle.totalTickets },
    (_, i) => i + 1,
  );

  const startDraw = () => {
    const finalWinner = pickWinner(raffle);
    setWinner(finalWinner);
    setPhase("spinning");

    const TOTAL_MS = 5500;
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / TOTAL_MS;

      // Velocidade decresce exponencialmente conforme chega ao fim
      const minDelay = 30;
      const maxDelay = 280;
      const delay = minDelay + (maxDelay - minDelay) * Math.pow(progress, 2.5);

      const pool =
        raffle.soldTickets.length > 0 ? raffle.soldTickets : allNumbers;
      const randomNum = pool[Math.floor(Math.random() * pool.length)];
      setDisplayNumber(randomNum);

      if (elapsed >= TOTAL_MS - 300) {
        clearTimers();
        setDisplayNumber(finalWinner);
        timeoutRef.current = setTimeout(() => {
          setPhase("result");
        }, 400);
      }
    }, 60);
  };

  const handleClose = () => {
    clearTimers();
    setPhase("confirm");
    setWinner(null);
    onClose();
  };

  const handleConfirmResult = () => {
    if (winner !== null) {
      onConfirm(winner);
    }
    handleClose();
  };

  useEffect(() => {
    if (!open) {
      clearTimers();
      setPhase("confirm");
      setWinner(null);
    }
    return () => clearTimers();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-[480px] overflow-hidden">
        {/* Fase 1: Confirmação */}
        {phase === "confirm" && (
          <>
            <DialogHeader className="pt-2">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 mb-4 ring-2 ring-amber-500/20">
                <Trophy className="h-8 w-8 text-amber-400" />
              </div>
              <DialogTitle className="text-center text-2xl font-bold">
                Fechar Rifa
              </DialogTitle>
              <DialogDescription className="text-center pt-2 text-base leading-relaxed">
                Tem certeza que quer encerrar{" "}
                <span className="text-foreground font-bold">
                  &quot;{raffle.title}&quot;
                </span>
                ?<br />
                <span className="text-amber-400 font-semibold">
                  O ganhador será sorteado agora!
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 px-1">
              <div className="rounded-xl bg-muted/40 border border-white/5 p-4 flex justify-between text-sm">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Total de Cotas
                  </span>
                  <span className="font-bold text-xl">
                    {raffle.totalTickets}
                  </span>
                </div>
                <div className="w-px bg-border" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Vendidas
                  </span>
                  <span className="font-bold text-xl text-primary">
                    {raffle.soldTickets.length}
                  </span>
                </div>
                <div className="w-px bg-border" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    Participantes
                  </span>
                  <span className="font-bold text-xl text-amber-400">
                    {raffle.soldTickets.length > 0
                      ? raffle.soldTickets.length
                      : raffle.totalTickets}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:justify-center">
              <Button variant="ghost" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                onClick={startDraw}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                <Trophy className="h-4 w-4" />
                Sortear Agora!
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Fase 2: Girando / Animação */}
        {phase === "spinning" && (
          <div className="flex flex-col items-center justify-center py-10 gap-6 select-none">
            <div className="relative">
              {/* Aura pulsante */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse scale-125" />
              <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-ping" />

              {/* Anel giratório externo */}
              <div
                className="relative w-44 h-44 rounded-full border-4 border-dashed border-primary/40 animate-spin"
                style={{ animationDuration: "1.2s" }}
              />

              {/* Anel giratório interno (sentido oposto) */}
              <div
                className="absolute inset-3 rounded-full border-4 border-dashed border-amber-400/50 animate-spin"
                style={{
                  animationDuration: "0.8s",
                  animationDirection: "reverse",
                }}
              />

              {/* Número central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-primary tabular-nums"
                    style={{ minWidth: "3ch", textAlign: "center" }}
                  >
                    {displayNumber}
                  </span>
                  <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-1">
              <p className="text-lg font-bold text-foreground animate-pulse">
                Sorteando o ganhador...
              </p>
              <p className="text-sm text-muted-foreground">
                Aguarde a roleta parar!
              </p>
            </div>

            {/* Partículas decorativas */}
            <div className="flex gap-3 text-amber-400">
              {[0, 0.2, 0.4, 0.6, 0.8].map((d, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 animate-bounce"
                  style={{ animationDelay: `${d}s` }}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        )}

        {/* Fase 3: Resultado */}
        {phase === "result" && winner !== null && (
          <>
            <div className="flex flex-col items-center justify-center py-6 gap-5 animate-in zoom-in-75 duration-500">
              {/* Troféu com brilho */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/40 rounded-full blur-2xl scale-150 animate-pulse" />
                <div className="relative p-6 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-500/20 border-2 border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                  <Trophy className="h-16 w-16 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm font-semibold text-amber-400 uppercase tracking-widest">
                  🎉 Temos um Ganhador!
                </p>
                <h2 className="text-xl font-bold text-muted-foreground">
                  O número sorteado foi
                </h2>
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 tabular-nums drop-shadow-sm">
                  #{winner}
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Rifa{" "}
                  <span className="text-foreground font-semibold">
                    {raffle.title}
                  </span>{" "}
                  encerrada com sucesso.
                </p>
              </div>
            </div>

            <DialogFooter className="sm:justify-center">
              <Button
                onClick={handleConfirmResult}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                <Trophy className="h-4 w-4" />
                Confirmar e Encerrar Rifa
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
