/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  BookOpen, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Quote, 
  Gift, 
  CheckCircle2,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center items-center font-mono text-2xl md:text-4xl font-bold">
      <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 w-20 text-center">
        <div className="text-fire-orange">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-[10px] uppercase tracking-widest opacity-50">Horas</div>
      </div>
      <div className="text-white/30">:</div>
      <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 w-20 text-center">
        <div className="text-fire-orange">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-[10px] uppercase tracking-widest opacity-50">Minutos</div>
      </div>
      <div className="text-white/30">:</div>
      <div className="bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 w-20 text-center">
        <div className="text-fire-orange">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-[10px] uppercase tracking-widest opacity-50">Segundos</div>
      </div>
    </div>
  );
};

const CTAButton = ({ children, className = "", primary = true }: { children: React.ReactNode, className?: string, primary?: boolean }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-8 py-4 rounded-full font-bold text-lg md:text-xl flex items-center justify-center gap-2 transition-all duration-300 ${
      primary 
        ? "bg-fire-orange text-deep-black glow-orange hover:bg-orange-400" 
        : "bg-transparent border-2 border-lightning-blue text-lightning-blue hover:bg-lightning-blue/10"
    } ${className}`}
  >
    {children}
    <ArrowRight className="w-5 h-5" />
  </motion.button>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-display text-3xl md:text-5xl mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Main App ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Elements */}
      <div className="lightning-bg">
        <div className="lightning-flash" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(123,44,191,0.15),transparent_70%)]" />
      </div>

      {/* Sticky Top CTA (Mobile/Desktop) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full z-50 bg-deep-black/80 backdrop-blur-xl border-bottom border-white/10 p-4 flex justify-between items-center"
          >
            <div className="font-display text-xl hidden md:block">Os Caminhos da Tempestade</div>
            <div className="flex items-center gap-4 mx-auto md:mx-0">
              <span className="text-fire-orange font-bold hidden sm:inline">Oferta por tempo limitado!</span>
              <CTAButton className="py-2 px-6 text-sm md:text-base">GARANTIR MEU EXEMPLAR</CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-electric-purple/20 border border-electric-purple/30 px-4 py-1 rounded-full text-lightning-blue text-sm font-bold mb-6">
              <Zap className="w-4 h-4 fill-current" />
              LANÇAMENTO MUNDIAL - EDITORA OPERA
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
              O DESTINO NÃO É TRAÇADO, <br />
              <span className="text-gradient-fire italic">ELE É CONQUISTADO.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 font-serif italic">
              "A fantasia épica mais visceral e surpreendente da década. Prepare-se para rir, chorar e temer o trovão."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton>EU QUERO VIVER ESSA AVENTURA</CTAButton>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i+10}/40/40`} className="w-8 h-8 rounded-full border-2 border-deep-black" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <span>+15.420 leitores ansiosos</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: -5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 w-full max-w-md aspect-[2/3] rounded-lg shadow-2xl overflow-hidden border border-white/20 glow-purple group bg-deep-black">
              <img 
                src="https://i.ibb.co/Nnsyykph/CAPA-indd.png" 
                alt="Capa do Livro Os Caminhos da Tempestade" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 bg-fire-orange text-deep-black p-4 rounded-xl font-bold shadow-xl rotate-12 z-20"
            >
              BEST-SELLER <br /> INTERNACIONAL
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Excerpt Section */}
      <section className="py-24 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="w-12 h-12 text-lightning-blue mx-auto mb-8 opacity-50" />
          <blockquote className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-8">
            "O céu se abriu não para nos destruir, mas para nos lembrar que até a escuridão mais profunda teme a luz de uma alma que se recusa a desistir. A tempestade não é o fim, é o palco onde os heróis nascem."
          </blockquote>
          <div className="h-1 w-24 bg-gradient-to-r from-lightning-blue to-electric-purple mx-auto" />
        </div>
      </section>

      {/* Author Story */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://picsum.photos/seed/author/600/800" 
              alt="Autor" 
              className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-fire-orange font-bold tracking-widest uppercase mb-4">A Mente por Trás do Épico</h3>
            <h2 className="font-display text-4xl md:text-5xl mb-8">UMA JORNADA DE <span className="italic">DOR E TRIUNFO</span></h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Escrever "Os Caminhos da Tempestade" não foi um plano, foi uma necessidade. Durante anos, guardei essas vozes em minha mente, esperando o momento em que a realidade se tornasse insuportável o suficiente para que a fantasia fosse a única saída.
              </p>
              <p>
                Este livro nasceu nas noites mais escuras da minha vida, onde o humor era a única arma contra o desespero. Cada página carrega um pedaço da minha alma, cada piada é um escudo e cada batalha é um grito de liberdade.
              </p>
              <p className="font-bold text-white">
                Eu não criei apenas uma história. Eu criei um refúgio para todos aqueles que sentem que o mundo está desabando ao seu redor.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-electric-purple/10">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Por que este livro está mudando a forma como as pessoas leem fantasia?">
            O QUE VOCÊ VAI ENCONTRAR
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-fire-orange" />,
                title: "Ritmo Alucinante",
                desc: "Capítulos curtos e ganchos impossíveis de ignorar. Você vai dizer 'só mais um' até o sol nascer."
              },
              {
                icon: <BookOpen className="w-8 h-8 text-lightning-blue" />,
                title: "Mundo Imersivo",
                desc: "Um sistema de magia baseado em fenômenos atmosféricos nunca visto antes na literatura."
              },
              {
                icon: <Star className="w-8 h-8 text-electric-purple" />,
                title: "Personagens Humanos",
                desc: "Heróis que erram, vilões que amam e diálogos que vão te fazer rir alto no meio do ônibus."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md"
              >
                <div className="mb-6">{item.icon}</div>
                <h4 className="text-2xl font-display mb-4">{item.title}</h4>
                <p className="text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Milhares de leitores não podem estar errados.">
            PROVA DO IMPACTO
          </SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Mariana S.", role: "Leitora Ávida", text: "Eu nunca ri tanto e chorei tanto no mesmo capítulo. É uma montanha-russa emocional absoluta!" },
              { name: "Ricardo T.", role: "Crítico Literário", text: "A Editora Opera acertou em cheio. É o fôlego que a fantasia nacional precisava." },
              { name: "Ana Paula", role: "Booktoker", text: "O plot twist do final me deixou sem dormir por dois dias. Apenas leiam!" },
              { name: "Lucas M.", role: "Fã de RPG", text: "O sistema de magia é tão bem construído que eu sinto que poderia conjurar um raio agora mesmo." },
              { name: "Carla V.", role: "Escritora", text: "A escrita é afiada, moderna e extremamente visual. Parece que estou assistindo a um filme da Marvel." },
              { name: "Felipe D.", role: "Leitor de Fantasia", text: "Adeus ressaca literária! Esse livro me lembrou por que eu amo ler." }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 italic text-white/80 relative">
                <div className="flex text-fire-orange mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lightning-blue to-electric-purple" />
                  <div>
                    <div className="font-bold text-white not-italic">{t.name}</div>
                    <div className="text-xs opacity-50 not-italic">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses */}
      <section className="py-24 px-6 bg-fire-orange/5 border-y border-fire-orange/20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Comprando hoje, você leva mais do que apenas um livro.">
            BÔNUS EXCLUSIVOS E IRRESISTÍVEIS
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Mapa Digital em Alta Resolução",
                value: "R$ 29,90",
                desc: "Explore cada detalhe do continente de Aethelgard com um mapa interativo e detalhado.",
                icon: <Gift className="w-10 h-10 text-fire-orange" />
              },
              {
                title: "Capítulo Extra: O Passado de Kael",
                value: "R$ 19,90",
                desc: "Um conto exclusivo que revela o segredo sombrio do protagonista antes da tempestade.",
                icon: <Zap className="w-10 h-10 text-fire-orange" />
              },
              {
                title: "Playlist Oficial Imersiva",
                value: "R$ 14,90",
                desc: "Músicas selecionadas pelo autor para criar a atmosfera perfeita durante sua leitura.",
                icon: <Gift className="w-10 h-10 text-fire-orange" />
              },
              {
                title: "Guia de Criaturas e Magia",
                value: "R$ 34,90",
                desc: "Um PDF ilustrado com todas as bestas e feitiços que aparecem na obra.",
                icon: <Zap className="w-10 h-10 text-fire-orange" />
              }
            ].map((bonus, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 items-start">
                <div className="shrink-0">{bonus.icon}</div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold text-xl">{bonus.title}</h5>
                    <span className="text-xs bg-fire-orange text-deep-black px-2 py-1 rounded font-bold">GRÁTIS</span>
                  </div>
                  <p className="text-white/60 text-sm">{bonus.desc}</p>
                  <div className="mt-2 text-xs line-through opacity-30">Valor individual: {bonus.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Offer */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-purple/20 blur-[120px] rounded-full -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="font-display text-5xl md:text-7xl mb-4">OFERTA DE <span className="text-fire-orange">LANÇAMENTO</span></h2>
            <p className="text-xl text-white/60">Não perca a chance de garantir seu exemplar com todos os bônus.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-fire-orange text-deep-black px-8 py-2 rounded-full font-black text-lg shadow-xl">
              ÚLTIMAS UNIDADES
            </div>
            
            <div className="mb-8">
              <Countdown />
            </div>

            <div className="space-y-4 mb-12 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3"><CheckCircle2 className="text-fire-orange w-5 h-5" /> <span>Livro Físico Autografado</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-fire-orange w-5 h-5" /> <span>Todos os 4 Bônus Digitais</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-fire-orange w-5 h-5" /> <span>Marcador de Página Exclusivo</span></div>
              <div className="flex items-center gap-3"><CheckCircle2 className="text-fire-orange w-5 h-5" /> <span>Frete Grátis para todo o Brasil</span></div>
            </div>

            <div className="mb-12">
              <div className="text-white/40 line-through text-2xl mb-2">De R$ 129,90</div>
              <div className="flex justify-center items-baseline gap-2">
                <span className="text-3xl font-bold">Por apenas</span>
                <span className="text-7xl md:text-9xl font-black text-fire-orange">R$ 59</span>
                <span className="text-3xl font-bold">,90</span>
              </div>
              <div className="text-white/60 mt-2">ou 12x de R$ 5,99 no cartão</div>
            </div>

            <CTAButton className="w-full py-6 text-2xl shadow-2xl mb-8">COMPRAR AGORA E VIVER A AVENTURA</CTAButton>
            
            <div className="flex flex-wrap justify-center gap-6 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-6" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-6" alt="Paypal" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Pix.png" className="h-6" alt="Pix" />
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 bg-white/5 p-8 rounded-2xl border border-white/10">
            <ShieldCheck className="w-16 h-16 text-lightning-blue" />
            <div className="text-left">
              <h4 className="text-2xl font-bold mb-2">GARANTIA DE SATISFAÇÃO TOTAL</h4>
              <p className="text-white/60">
                Se em 7 dias você não sentir que esta é uma das melhores histórias que já leu, nós devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia. O risco é todo nosso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-deep-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="font-display text-2xl mb-2">Os Caminhos da Tempestade</div>
            <p className="text-white/40 text-sm">© 2024 Editora Opera. Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-8 text-sm text-white/60">
            <a href="#" className="hover:text-fire-orange transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-fire-orange transition-colors">Privacidade</a>
            <a href="#" className="hover:text-fire-orange transition-colors">Contato</a>
          </div>
          <div className="flex gap-4">
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fire-orange hover:text-deep-black transition-all">
              <Zap className="w-5 h-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2 }} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-fire-orange hover:text-deep-black transition-all">
              <BookOpen className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
