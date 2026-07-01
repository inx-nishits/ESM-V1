import Image from "next/image";
import { Leaf, Recycle, Globe2 } from "lucide-react";

import type { SustainabilityContent } from "@/types/cms";

interface SustainabilitySectionProps {
  content: SustainabilityContent;
}

export function SustainabilitySection({ content }: SustainabilitySectionProps) {
  const icons = [Recycle, Leaf, Globe2];

  return (
    <section className="relative overflow-hidden site-section-compact bg-[var(--esm-navy-900)]" aria-labelledby="sustainability-heading">
      {/* Background gradients for premium feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--esm-navy-800)]/60 via-[var(--esm-navy-900)] to-[var(--esm-navy-900)]"></div>
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      </div>

      <div className="site-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Image Side (Left on Desktop) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl group">
              <Image
                src={content.image}
                alt="Sustainable PPE packaging and distribution"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent"></div>
              
              {/* Glassmorphism Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-500 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-white/20">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/50 shadow-[0_0_15px_rgba(var(--esm-coral-500),0.3)]">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white text-lg">Committed to Future</p>
                    <p className="text-sm text-zinc-300">Continuous reduction of impact</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_2px,_transparent_2px)] bg-[length:16px_16px] -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_2px,_transparent_2px)] bg-[length:16px_16px] -z-10" />
          </div>

          {/* Text & Features Side (Right on Desktop) */}
          <div className="lg:col-span-7 lg:pl-8 xl:pl-12 order-1 lg:order-2">
            <div className="mb-10 lg:mb-14">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-accent/90 shadow-sm backdrop-blur-sm">
                <Globe2 className="h-4 w-4" />
                <span className="uppercase">Responsibility</span>
              </div>
              <h2
                id="sustainability-heading"
                className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {content.headline}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
                {content.subheadline}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {content.points.map((point, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <div 
                    key={point.id} 
                    className="group relative flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-white/10 shadow-md hover:shadow-accent/5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:ring-accent/50">
                      <Icon className="h-4 w-4 text-zinc-400 group-hover:text-accent transition-colors" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-zinc-100 transition-colors group-hover:text-white">
                        {point.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400 group-hover:text-zinc-300">
                        {point.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
