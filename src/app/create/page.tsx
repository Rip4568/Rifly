"use client";

import { useRaffle } from "@/context/RaffleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Ticket, DollarSign, Palette, CheckCircle2 } from "lucide-react";
import { Theme } from "@/types";

const themes = [
  { value: "default", label: "Padrão", color: "bg-gray-100" },
  { value: "football", label: "Futebol", color: "bg-green-600 text-white" },
  { value: "baby", label: "Chá de Bebê", color: "bg-pink-100 border-pink-300" },
  { value: "money", label: "Dinheiro", color: "bg-emerald-900 text-gold" },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (state.balance < 2.00) {
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
    <div className="container mx-auto p-4 md:p-8 max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Criar Nova Rifa</h1>
        <p className="text-muted-foreground">Defina os detalhes e personalize a aparência do seu sorteio.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Rifa</CardTitle>
              <CardDescription>Informações básicas sobre o sorteio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Rifa <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ex: Cesta de Natal Beneficente"
                  value={formData.title}
                  onChange={handleChange}
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Preço do Bilhete (R$) <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ticketPrice"
                      name="ticketPrice"
                      type="number"
                      placeholder="10.00"
                      className="pl-8"
                      value={formData.ticketPrice}
                      onChange={handleChange}
                      required
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalTickets">Qtd. de Números <span className="text-red-500">*</span></Label>
                   <div className="relative">
                    <Ticket className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="totalTickets"
                      name="totalTickets"
                      type="number"
                      placeholder="100"
                      className="pl-8"
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

          <Card>
            <CardHeader>
              <CardTitle>Personalização</CardTitle>
              <CardDescription>Escolha um tema visual para sua página.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Tema Visual</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {themes.map((theme) => (
                    <div
                      key={theme.value}
                      className={`
                        cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105
                        ${formData.theme === theme.value ? "border-primary ring-2 ring-primary ring-offset-2" : "border-muted hover:border-primary/50"}
                        ${theme.color.includes("bg-") ? theme.color : "bg-card"}
                      `}
                      onClick={() => handleThemeChange(theme.value)}
                    >
                      <Palette className={`h-6 w-6 ${theme.value === 'money' || theme.value === 'football' ? 'text-white' : 'text-foreground'}`} />
                      <span className={`text-xs font-medium ${theme.value === 'money' || theme.value === 'football' ? 'text-white' : 'text-foreground'}`}>{theme.label}</span>
                      {formData.theme === theme.value && (
                        <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary bg-background rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-8 bg-muted/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa de Criação:</span>
                <span className="font-semibold text-red-500">- R$ 2,00</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Potencial de Arrecadação:</span>
                <span className="font-bold text-green-600">
                  R$ {((parseFloat(formData.ticketPrice || "0") * parseInt(formData.totalTickets || "0"))).toFixed(2)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleSubmit}>
                Confirmar e Criar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
