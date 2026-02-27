import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Trophy, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center" href="/">
            <Trophy className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">Rifa Fácil</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4 flex items-center" href="/dashboard">
              <Button>Ir para o App</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  Crie, Compartilhe e Gerencie Suas Rifas
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A plataforma mais simples e segura para organizar seus sorteios. Crie sua rifa em minutos e comece a vender bilhetes agora mesmo.
                </p>
              </div>
              <div className="space-x-4 pt-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-12 px-8 text-lg group">
                    Começar Agora
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-3">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Rápido e Fácil</h3>
                <p className="text-muted-foreground">
                  Crie sua rifa em menos de 2 minutos. Interface intuitiva e pensada para você não perder tempo.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Seguro e Confiável</h3>
                <p className="text-muted-foreground">
                  Sistema transparente de gestão de bilhetes. Seus participantes têm a garantia de um sorteio justo.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 p-3 text-primary">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Temas Personalizados</h3>
                <p className="text-muted-foreground">
                  Escolha entre diversos temas visuais para deixar a página da sua rifa com a cara do seu prêmio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Trust */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Por que escolher o Rifa Fácil?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Junte-se a milhares de organizadores que já simplificaram seus sorteios.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="text-lg">Gerenciamento automático de números</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="text-lg">Link de compartilhamento exclusivo</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="text-lg">Controle financeiro integrado</span>
                  </li>
                </ul>
              </div>
               <div className="flex flex-col justify-center space-y-4">
                <div className="rounded-xl border bg-background p-8 shadow-lg">
                  <div className="space-y-2">
                    <h3 className="font-bold">Comece Grátis</h3>
                    <p className="text-muted-foreground">Experimente todas as funcionalidades básicas sem custo inicial.</p>
                    <Link href="/dashboard" className="block pt-4">
                        <Button className="w-full">Criar Minha Primeira Rifa</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Rifa Fácil. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
