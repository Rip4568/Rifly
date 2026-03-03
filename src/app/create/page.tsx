"use client";

import { useRaffle } from "@/context/RaffleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Ticket,
  DollarSign,
  Palette,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Theme } from "@/types";

const themes = [
  {
    value: "default",
    label: "Padrão",
    color:
      "bg-gradient-to-br from-zinc-800 to-zinc-950 border-zinc-700 hover:border-zinc-500",
    iconColor: "text-zinc-300",
  },
  {
    value: "football",
    label: "Futebol",
    color:
      "bg-gradient-to-br from-green-500 to-emerald-800 border-green-600 hover:border-green-400",
    iconColor: "text-white",
  },
  {
    value: "baby",
    label: "Chá de Bebê",
    color:
      "bg-gradient-to-br from-pink-400 to-rose-600 border-pink-500 hover:border-pink-300",
    iconColor: "text-white",
  },
  {
    value: "money",
    label: "Dinheiro",
    color:
      "bg-gradient-to-br from-amber-400 to-yellow-700 border-amber-500 hover:border-amber-300",
    iconColor: "text-amber-50",
  },
  {
    value: "party",
    label: "Festa & Balada",
    color:
      "bg-gradient-to-br from-fuchsia-600 to-purple-900 border-fuchsia-500 hover:border-fuchsia-300",
    iconColor: "text-fuchsia-50",
  },
  {
    value: "wedding",
    label: "Casamento",
    color:
      "bg-gradient-to-br from-stone-200 to-orange-100 border-stone-300 hover:border-stone-400",
    iconColor: "text-stone-800",
  },
  {
    value: "birthday",
    label: "Aniversário",
    color:
      "bg-gradient-to-br from-yellow-300 to-amber-600 border-yellow-400 hover:border-yellow-200",
    iconColor: "text-yellow-950",
  },
  {
    value: "carnival",
    label: "Carnaval",
    color:
      "bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-600 border-rose-400 hover:border-violet-300",
    iconColor: "text-white",
  },
  {
    value: "christmas",
    label: "Natalino",
    color:
      "bg-gradient-to-br from-red-600 to-emerald-800 border-red-500 hover:border-emerald-400",
    iconColor: "text-white",
  },
  {
    value: "beach",
    label: "Praia / Verão",
    color:
      "bg-gradient-to-br from-cyan-400 to-sky-700 border-cyan-300 hover:border-cyan-100",
    iconColor: "text-cyan-950",
  },
];

export default function CreateRafflePage() {
  const { createRaffle, state } = useRaffle();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ticketPrice: "",
    totalTickets: "",
    theme: "default",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThemeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, theme: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.ticketPrice || !formData.totalTickets) {
      toast({
        title: "Erro no formulário",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (state.balance < 2.0) {
      toast({
        title: "Saldo Insuficiente",
        description: "Você precisa de pelo menos R$ 2,00 para criar uma rifa.",
        variant: "destructive",
      });
      return;
    }

    createRaffle({
      title: formData.title,
      description: formData.description,
      ticketPrice: parseFloat(formData.ticketPrice),
      totalTickets: parseInt(formData.totalTickets, 10),
      theme: formData.theme as Theme,
    });

    toast({
      title: "Rifa Criada com Sucesso!",
      description: "Sua rifa já está disponível para venda.",
    });

    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500 relative">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <header className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 md:h-8 md:w-8 rounded-full hover:bg-primary/20 transition-colors"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="h-5 w-5 md:h-4 md:w-4" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Criar Nova Rifa
          </h1>
        </div>
        <p className="text-muted-foreground ml-12 md:ml-10 text-sm md:text-base max-w-xl">
          Defina os detalhes, escolha as cotas e personalize a aparência do seu
          sorteio para construir engajamento.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/40 backdrop-blur-xl border-white/5 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                Detalhes da Rifa
              </CardTitle>
              <CardDescription>
                Informações básicas sobre o sorteio. Seja persuasivo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Título da Rifa <span className="text-primary">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Cesta de Natal Beneficente, iPhone 15 Pro Max..."
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-background/50 border-white/10 focus-visible:ring-primary h-12 text-base transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descreva o prêmio e o objetivo da rifa..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice" className="text-sm font-medium">
                    Preço do Bilhete (R$){" "}
                    <span className="text-primary">*</span>
                  </Label>
                  <div className="relative group/input">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                    <Input
                      id="ticketPrice"
                      name="ticketPrice"
                      type="number"
                      placeholder="10.00"
                      className="pl-10 h-12 bg-background/50 border-white/10 font-medium text-lg focus-visible:ring-primary transition-all"
                      value={formData.ticketPrice}
                      onChange={handleChange}
                      required
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTickets" className="text-sm font-medium">
                    Quantas Cotas? <span className="text-primary">*</span>
                  </Label>
                  <div className="relative group/input">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                    <Input
                      id="totalTickets"
                      name="totalTickets"
                      type="number"
                      placeholder="Ex: 100"
                      className="pl-10 h-12 bg-background/50 border-white/10 font-medium text-lg focus-visible:ring-primary transition-all"
                      value={formData.totalTickets}
                      onChange={handleChange}
                      required
                      min="10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 backdrop-blur-xl border-white/5 shadow-2xl relative overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Identidade Visual
              </CardTitle>
              <CardDescription>
                Escolha o tema que melhor combina com seu público.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label className="text-sm font-medium">Tema do Sorteio</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {themes.map((theme) => {
                    const isSelected = formData.theme === theme.value;
                    return (
                      <div
                        key={theme.value}
                        onClick={() => handleThemeChange(theme.value)}
                        className={`
                          relative cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300
                          ${
                            isSelected
                              ? "border-primary/50 ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-100"
                              : "border-white/10 hover:border-white/20 hover:scale-[1.02] grayscale-[30%] hover:grayscale-0"
                          }
                          ${theme.color}
                        `}
                      >
                        <div
                          className={`p-2 rounded-full bg-black/20 backdrop-blur-md shadow-inner ${theme.iconColor}`}
                        >
                          <Palette className="h-5 w-5" />
                        </div>
                        <span
                          className={`text-sm font-bold tracking-wide shadow-black/50 drop-shadow-md text-center ${theme.iconColor}`}
                        >
                          {theme.label}
                        </span>

                        {isSelected && (
                          <div className="absolute top-2 right-2 animate-in zoom-in">
                            <CheckCircle2
                              className="h-5 w-5 text-white drop-shadow-md"
                              fill="currentColor"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8 bg-gradient-to-b from-primary/10 to-transparent border-primary/20 shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <CardHeader>
              <CardTitle className="text-xl">Resumo do Lançamento</CardTitle>
              <CardDescription>Revise o potencial da sua Rifa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-white/5">
                <span className="text-sm text-muted-foreground">
                  Custo de Servidor:
                </span>
                <span className="font-bold text-red-400">- R$ 2,00</span>
              </div>

              <div className="p-4 rounded-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500/10 transition-colors group-hover:bg-green-500/20" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                <div className="relative flex flex-col gap-1 items-center text-center">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Potencial Máximo
                  </span>
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600 drop-shadow-sm">
                    R${" "}
                    {(
                      parseFloat(formData.ticketPrice || "0") *
                      parseInt(formData.totalTickets || "0")
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pb-6">
              <Button
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all hover:scale-[1.02]"
                onClick={handleSubmit}
              >
                Publicar Rifa Agora
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
