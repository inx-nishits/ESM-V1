import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./section-header";
import type { FaqItem } from "@/types/cms";

interface FaqSectionProps {
  faq: FaqItem[];
}

export function FaqSection({ faq }: FaqSectionProps) {
  if (!faq || faq.length === 0) return null;

  return (
    <section className="site-section bg-[var(--esm-navy-50)]" aria-labelledby="faq-heading">
      <div className="site-container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeader
            overline="FAQ"
            headline="Frequently Asked Questions"
            headlineId="faq-heading"
            align="center"
          />
        </div>
        
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="px-6 border-b border-border last:border-0"
              >
                <AccordionTrigger className="text-left font-display font-bold text-base sm:text-lg text-primary hover:text-[var(--esm-coral-400)] transition-colors py-6 leading-snug">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-6">
                  <div 
                    className="prose prose-sm sm:prose-base max-w-none prose-p:leading-relaxed prose-a:text-[var(--esm-coral-400)] prose-a:underline hover:prose-a:text-[var(--esm-coral-500)]"
                    dangerouslySetInnerHTML={{ __html: item.answer }} 
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
