import { ShieldCheck, Award } from "lucide-react";
import { ClientWordmarks } from "./client-wordmarks";
import { SectionHeader } from "./section-header";
import type { Certification, ClientLogo } from "@/types/cms";

interface CertificationsTrustProps {
  certifications: Certification[];
  clientLogos: ClientLogo[];
}

export function CertificationsTrust({ certifications, clientLogos }: CertificationsTrustProps) {
  return (
    <section className="site-section bg-zinc-950 relative overflow-hidden" aria-labelledby="certifications-heading">
      {/* Premium dark mode decorative elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/10 blur-[120px]" />

      <div className="site-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-xs font-bold tracking-[0.2em] text-accent/90 shadow-sm backdrop-blur-sm">
            <Award className="h-4 w-4" />
            <span>INDUSTRY LEADING STANDARDS</span>
          </div>
          
          <SectionHeader
            headline="Certifications & compliance"
            subheadline="Documentation available on request for vendor qualification and audit packages. We maintain the highest standards of quality and safety across our entire supply chain."
            headlineId="certifications-heading"
            align="center"
            dark={true}
          />
          
          {/* Certification Seals */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12 w-full max-w-3xl">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group relative flex flex-col items-center gap-5 rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:bg-zinc-900/80 hover:-translate-y-2 hover:shadow-[0_10px_40px_-15px_rgba(var(--accent),0.3)]"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-inner ring-1 ring-white/5 transition-transform duration-500 group-hover:scale-110">
                  <div className="absolute inset-0 rounded-2xl bg-accent/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                  <ShieldCheck className="relative z-10 h-10 w-10 text-zinc-300 transition-colors duration-500 group-hover:text-accent" aria-hidden />
                </div>
                <span className="text-center font-display text-base font-bold tracking-wide text-zinc-200 transition-colors duration-300 group-hover:text-white">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            Trusted by world-class operations teams
          </p>
          <ClientWordmarks clients={clientLogos} dark={true} />
        </div>
      </div>
    </section>
  );
}
