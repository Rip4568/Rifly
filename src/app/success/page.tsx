"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Ticket as TicketIcon,
  PartyPopper,
  Home,
  Share2,
  Loader2,
} from "lucide-react";
import { useMemo, Suspense } from "react";
import { useToast } from "@/components/ui/use-toast";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const raffleId = searchParams.get("raffleId");
  const ticketsParam = searchParams.get("tickets");

  const ticketNumbers = useMemo(() => {
    if (!ticketsParam) return [];
    return ticketsParam
      .split(",")
      .map(Number)
      .sort((a, b) => a - b);
  }, [ticketsParam]);

  if (!raffleId || ticketNumbers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-400">
        <p>Dados da compra não encontrados.</p>
        <Button variant="link" onClick={() => router.push("/dashboard")}>
          Voltar para o Início
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-emerald-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-950 to-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Animated Celebration Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <PartyPopper className="absolute top-[10%] left-[10%] w-32 h-32 text-emerald-500/10 -rotate-12 animate-[pulse_4s_infinite]" />
        <PartyPopper className="absolute bottom-[10%] right-[10%] w-48 h-48 text-emerald-400/10 rotate-45 animate-[pulse_6s_infinite]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        {/* Success Badge Floating */}
        <div className="flex justify-center mb-[-40px] relative z-20">
          <div className="bg-emerald-500 text-white p-4 rounded-full border-4 border-emerald-950 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>

        <Card className="bg-emerald-900/40 backdrop-blur-xl border-emerald-500/30 shadow-[0_20px_60px_rgba(4,120,87,0.4)] pt-14 pb-4 px-2 sm:px-6 overflow-hidden relative">
          {/* Receipt jagged edge top simulation */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgICA8cG9seWdvbiBwb2ludHM9IjAsMCAxMCwyMCAyMCwwIiBmaWxsPSJyZ2JhKDIwOSwgMjUwLCAyMjksIDAuMSkiLz4KPC9zdmc+')] opacity-20" />

          <CardContent className="space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white tracking-tight">
                Pagamento Aprovado!
              </h1>
              <p className="text-emerald-200/80 font-medium">
                Sua participação foi garantida com sucesso.
              </p>
            </div>

            <div className="bg-black/20 rounded-2xl p-5 border border-emerald-500/20 shadow-inner">
              <div className="flex items-center justify-center gap-3 mb-4 text-emerald-400">
                <TicketIcon className="w-6 h-6" />
                <span className="text-lg font-bold uppercase tracking-wider">
                  Seus Bilhetes da Sorte
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-emerald-700">
                {ticketNumbers.map((num) => (
                  <div
                    key={num}
                    className="bg-emerald-500 text-emerald-950 font-black text-lg w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform hover:scale-110"
                  >
                    {num}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-emerald-300/70 font-medium">
                Total de {ticketNumbers.length} cota(s) adquirida(s)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-emerald-800/50">
              <Button
                variant="outline"
                className="w-full h-12 bg-transparent border-emerald-700/50 text-emerald-100 hover:bg-emerald-800 hover:text-white"
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.host + `/raffle/${raffleId}`,
                  );
                  toast({
                    title: "Link Copiado!",
                    description: "Envie para amigos participarem também.",
                  });
                }}
              >
                <Share2 className="mr-2 w-4 h-4" /> Compartilhar
              </Button>
              <Button
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                onClick={() => router.push("/dashboard")}
              >
                <Home className="mr-2 w-4 h-4" /> Ir para Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-950 text-emerald-200">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-4" />
          <p>Verificando participação...</p>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
