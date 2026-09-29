"use client";

import confetti from "canvas-confetti";
import { CheckIcon, Link2Icon, Share2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AMOUNT,
  isPaymentConfigured,
  money,
  paymentUrl,
} from "@/config";

const COLORS = ["#10b981", "#34d399", "#ffffff", "#fbbf24", "#a78bfa"];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function burst(event: React.MouseEvent<HTMLElement>) {
  if (prefersReducedMotion()) return;
  const rect = event.currentTarget.getBoundingClientRect();
  confetti({
    particleCount: 150,
    spread: 82,
    startVelocity: 42,
    scalar: 1.1,
    ticks: 220,
    colors: COLORS,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
  });
}

export async function openPayment(event: React.MouseEvent<HTMLElement>) {
  burst(event);

  if (isPaymentConfigured) {
    toast.success(`Off you go. ${money} inbound, allegedly.`, {
      description: "Complete it inside Remitly. It is what it is.",
    });
  } else {
    toast.warning("No Remitly link configured yet.", {
      description:
        "Add your payment-request link in src/config.ts or NEXT_PUBLIC_REMITLY_URL.",
    });
  }

  window.open(paymentUrl, "_blank", "noopener,noreferrer");
}

async function sharePage() {
  const url = window.location.href;
  const data = {
    title: `Give me ${money}`,
    text: "No product, no reason. You just can.",
    url,
  };

  if (typeof navigator.share === "function") {
    try {
      await navigator.share(data);
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }

  await navigator.clipboard.writeText(url);
  toast.success("Link copied. Spread the audacity.");
}

export function GiveActions({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied.", {
      description: "Send it to someone with poor boundaries.",
    });
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        onClick={openPayment}
        className={
          compact
            ? "h-12 gap-2 px-6 text-base"
            : "h-14 gap-2.5 rounded-2xl px-9 text-lg font-semibold shadow-[0_10px_40px_-12px_oklch(0.7_0.18_160_/_0.7)]"
        }
      >
        Give me {money}
        <SparklesIcon />
      </Button>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={copy}>
          {copied ? <CheckIcon data-icon="inline-start" /> : <Link2Icon data-icon="inline-start" />}
          {copied ? "Copied" : "Copy link"}
        </Button>
        <Button variant="ghost" size="sm" onClick={sharePage}>
          <Share2Icon data-icon="inline-start" />
          Share
        </Button>
      </div>

      {!compact && (
        <p className="max-w-md text-xs text-balance text-muted-foreground">
          {AMOUNT} dollars, handled by Remitly’s own checkout. It is the least
          Remitly can do, and it is what it is — no account needed on your
          side, and I never see your card details.
        </p>
      )}
    </div>
  );
}
