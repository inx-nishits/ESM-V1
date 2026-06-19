import { ShieldCheck } from "lucide-react";
import { ClientWordmarks } from "./client-wordmarks";
import { SectionHeader } from "./section-header";
import type { Certification, ClientLogo } from "@/types/cms";

interface CertificationsTrustProps {
  certifications: Certification[];
  clientLogos: ClientLogo[];
}

export function CertificationsTrust({ certifications, clientLogos }: CertificationsTrustProps) {
  return (
    <section className="site-section-compact bg-muted/50" aria-labelledby="certifications-heading">
      <div className="site-container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <SectionHeader
              headline="Certifications & compliance"
              subheadline="Documentation available on request for vendor qualification and audit packages."
              headlineId="certifications-heading"
            />
            <ul className="mt-6 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <li
                  key={cert.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
                  {cert.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:max-w-[50%]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground lg:text-right">
              Trusted by operations teams at
            </p>
            <ClientWordmarks clients={clientLogos} className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
