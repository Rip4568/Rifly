"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Trophy, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Decorators */}
      <div className="fixed inset-0 z-[-1] bg-grid-white opacity-20 pointer-events-none" />
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="px-4 lg:px-6 h-20 flex items-center border-b border-white/5 bg-background/80 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center group" href="/">
            <div className="p-2 rounded-xl bg-primary/10 mr-3 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Rifa Fácil
            </span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/dashboard">
              <MagneticButton className="rounded-full px-6 font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow">
                Ir para o App
              </MagneticButton>
            </Link>
          </nav>
        </div>
      </motion.header>

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="w-full relative min-h-[90vh] flex items-center justify-center py-20 px-4">
          <div className="container mx-auto relative z-10 text-center flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 max-w-5xl leading-[1.1]">
              <FadeIn delay={0.1} y={30}>
                Crie, Compartilhe.
              </FadeIn>
              <FadeIn delay={0.2} y={30}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">
                  Escale Suas Rifas.
                </span>
              </FadeIn>
            </h1>

            <FadeIn delay={0.3}>
              <p className="mx-auto max-w-2xl text-lg md:text-2xl text-muted-foreground mb-10 font-light leading-relaxed">
                A plataforma mais elegante e robusta para organizar seus
                sorteios. Crie sua rifa em minutos, sem complicações técnicas.
              </p>
            </FadeIn>

            <FadeIn
              delay={0.4}
              className="flex flex-col sm:flex-row gap-5 items-center justify-center"
            >
              <Link href="/dashboard">
                <MagneticButton
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full group bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  Começar Agora
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </MagneticButton>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 bg-transparent backdrop-blur-sm"
                >
                  Ver Funcionalidades
                </Button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-24 lg:py-32 relative border-t border-white/5 bg-background/50 backdrop-blur-3xl"
        >
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                Projetado para Converter
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Tudo que você precisa para gerir campanhas de sucesso,
                empacotado em uma interface que seus usuários vão amar.
              </p>
            </FadeIn>

            <div className="grid gap-8 sm:px-10 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Rapidez Extrema",
                  desc: "Deploy de novas rifas em menos de 2 minutos. Interface ultra-responsiva focada no essencial.",
                },
                {
                  icon: Shield,
                  title: "Segurança Total",
                  desc: "Números gerados com criptografia e registros imutáveis de transações para máxima transparência.",
                },
                {
                  icon: Trophy,
                  title: "Experiência Premium",
                  desc: "Deixe seus concorrentes para trás com páginas de campanha imersivas que aumentam suas vendas.",
                },
              ].map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="group relative pt-8 pb-10 px-8 rounded-3xl bg-secondary/50 border border-white/5 hover:bg-secondary transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background border border-white/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Trust */}
        <section className="w-full py-24 lg:py-32 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                    Por que o Rifa Fácil?
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]">
                    Venda mais, <br />
                    <span className="text-muted-foreground">
                      gerencie menos.
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Nossa plataforma automatiza as partes chatas para que você
                    foque no que importa: divulgar e engajar seu público.
                  </p>

                  <ul className="grid gap-6 pt-4">
                    {[
                      "Gestão de estoque de bilhetes em tempo real",
                      "Gateway de pagamentos super rápido",
                      "Links mágicos de compartilhamento",
                    ].map((text, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="flex items-center gap-4 text-lg"
                      >
                        <div className="rounded-full bg-primary/20 p-1 text-primary">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-white/80 font-medium">
                          {text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative rounded-3xl border border-white/10 bg-background/80 backdrop-blur-xl p-10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Trophy className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4">
                        Pronto para Lançar?
                      </h3>
                      <p className="text-muted-foreground text-lg mb-8">
                        Crie sua conta agora e ganhe acesso imediato ao painel
                        de controle. Configure sua primeira campanha grátis.
                      </p>
                      <Link href="/dashboard" className="block">
                        <MagneticButton className="w-full rounded-2xl h-16 text-lg font-bold bg-white text-black hover:bg-gray-200 transition-colors">
                          Entrar no Painel de Controle
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 w-full shrink-0 border-t border-white/5 relative z-10 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Rifa Fácil. Reinventando sorteios.
          </p>
          <nav className="flex gap-6">
            <Link
              className="text-sm text-muted-foreground hover:text-white transition-colors"
              href="#"
            >
              Termos
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:text-white transition-colors"
              href="#"
            >
              Privacidade
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
