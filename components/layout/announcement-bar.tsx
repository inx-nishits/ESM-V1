"use client";

import { Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { AnnouncementMessage } from "@/types/cms";

const DISMISS_KEY = "esm_announcement_dismissed";

interface AnnouncementBarProps {
  messages: AnnouncementMessage[];
  enabled?: boolean;
}

function MessageItem({ message }: { message: AnnouncementMessage }) {
  const content = (
    <span className="inline-flex items-center gap-2 text-sm font-medium">
      {message.id === "phone" && <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />}
      {message.text}
    </span>
  );

  if (message.href) {
    return (
      <Link href={message.href} className="transition-colors hover:text-[var(--esm-coral-400)]">
        {content}
      </Link>
    );
  }

  return content;
}

export function AnnouncementBar({ messages, enabled = true }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (!enabled || messages.length === 0 || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  const duplicated = [...messages, ...messages];

  return (
    <div
      className="relative overflow-hidden bg-[var(--esm-navy-800)] text-white"
      role="region"
      aria-label="Announcements"
    >
      <div className="mx-auto site-container flex items-center gap-3 py-2.5">
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="hidden items-center justify-center gap-8 md:flex">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </div>

          <div className="md:hidden">
            <div className={cn("flex w-max gap-10 whitespace-nowrap", "animate-marquee")}>
              {duplicated.map((message, index) => (
                <MessageItem key={`${message.id}-${index}`} message={message} />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 rounded-sm p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Dismiss announcements"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
