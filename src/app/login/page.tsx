"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Ticket,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Loader2,
  Home,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/dashboard");
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    // Simulate OAuth redirect
    await new Promise((resolve) => setTimeout(resolve, 1200));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[100dvh] w-full flex bg-slate-950 text-slate-300 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />

      {/* Hero / Brand Section (Hidden on small screens) */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 relative z-10 border-r border-white/5 bg-black/20 backdrop-blur-3xl">
        <div className="absolute top-8 left-8">
          <Button
            variant="ghost"
            className="text-slate-400 hover:text-white"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-4 w-4" /> Voltar ao Início
          </Button>
        </div>

        <div className="max-w-md space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Ticket className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight">
              Rifly
            </h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white/90 leading-tight">
              A plataforma definitiva para suas campanhas de sucesso.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Crie, gerencie e venda acesso aos seus sorteios com uma interface
              fluida, rápida e incrivelmente bela que converte muito mais.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-indigo-400 mb-3" />
              <div className="text-white font-bold mb-1">Design Premium</div>
              <div className="text-sm text-slate-400">
                Suas rifas muito mais atraentes
              </div>
            </div>
            <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Lock className="h-6 w-6 text-primary mb-3" />
              <div className="text-white font-bold mb-1">100% Seguro</div>
              <div className="text-sm text-slate-400">
                Dados criptografados e protegidos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16 w-full max-w-2xl mx-auto relative z-10">
        {/* Mobile Header */}
        <div className="flex lg:hidden flex-col items-center mb-10 gap-4">
          <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <Ticket className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Rifly
          </h1>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white">
              {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
            </h2>
            <p className="text-slate-400">
              {isLogin
                ? "Entre para gerenciar suas rifas e ver seus ganhos."
                : "Comece a organizar sorteios profissionais hoje mesmo."}
            </p>
          </div>

          {/* OAuth Google Button Mock */}
          <div className="space-y-4">
            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-12 bg-white text-slate-900 border-none hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.05)] font-semibold transition-transform hover:scale-[1.02] flex items-center justify-center gap-3 rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
              ) : (
                <>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continuar com o Google
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-950 px-3 text-slate-500 font-medium">
                  Ou continue com e-mail
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <div className="relative group/input">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-primary focus-visible:bg-white/10 transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">
                  Senha
                </Label>
                {isLogin && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary text-xs hover:text-primary/80"
                  >
                    Esqueceu a senha?
                  </Button>
                )}
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/input:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-primary focus-visible:bg-white/10 transition-all rounded-xl"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-transform hover:-translate-y-1 group"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center">
                  {isLogin ? "Entrar na Conta" : "Criar Minha Conta"}
                  <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-400">
            {isLogin ? "Ainda não tem uma conta? " : "Já possui uma conta? "}
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="p-0 text-primary font-bold hover:text-primary/80"
            >
              {isLogin ? "Cadastre-se" : "Faça Login"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
