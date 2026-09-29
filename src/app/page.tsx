import {
  BadgeCheckIcon,
  CircleXIcon,
  HandCoinsIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { FloatingBills } from "@/components/floating-bills";
import { GiveActions } from "@/components/give-actions";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AMOUNT, isPaymentConfigured, money } from "@/config";

const RECEIPT = [
  { label: "Coffee, the good kind", amount: "4.00" },
  { label: "The other half of that coffee", amount: "0.50" },
  { label: "Small fee (to me, from me)", amount: "1.00" },
  { label: "It-is-what-it-is surcharge", amount: "4.50" },
];

const NOT_INCLUDED = [
  "Equity in anything",
  "A tote bag",
  "A Discord role",
  "My gratitude, with strings",
  "A timeshare presentation",
];

const STEPS = [
  {
    n: "01",
    icon: HandCoinsIcon,
    title: "Press the big button",
    body: "It opens Remitly in a new tab. Nothing runs in the background, there is no trick, no upsell, no newsletter.",
  },
  {
    n: "02",
    icon: ReceiptTextIcon,
    title: "Confirm ten dollars",
    body: "Remitly shows the amount and any fees before anything is charged. It is the least Remitly can do, and it is what it is.",
  },
  {
    n: "03",
    icon: BadgeCheckIcon,
    title: "Walk away lighter",
    body: "The money lands with me. You get on with your day, ten dollars poorer and one good deed richer.",
  },
];

const FAQ = [
  {
    q: `Why ${money}?`,
    a: "Because it is the least Remitly can do. Beyond that argument, honestly, it is what it is.",
  },
  {
    q: "Why Remitly?",
    a: "Because it moves money between people in about a minute, shows fees upfront, and runs on its own checkout — this site never touches your card details.",
  },
  {
    q: "What do I get?",
    a: "The quiet satisfaction of doing something completely unnecessary on purpose. Also my thanks, which is free and therefore worth exactly what you paid.",
  },
  {
    q: "Is this a scam?",
    a: "No. It is a page with one button. Your payment happens inside Remitly, and the only thing that arrives here is ten dollars and a story.",
  },
  {
    q: "Why should I bother?",
    a: "You should not. That is the whole joke. But you are still reading, which is statistically suspicious.",
  },
  {
    q: "Who even are you?",
    a: "Someone with a website, an amount in mind, and absolutely no shame left.",
  },
];

function OwnerNotice() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6">
      <div className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300">
        <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" />
        <p className="text-balance">
          <span className="font-semibold">Owner notice:</span> no Remitly link
          is configured yet. Open the Remitly app, tap{" "}
          <strong>Request</strong>, enter the amount, then copy the shareable
          payment link. Paste it into{" "}
          <code className="rounded bg-amber-500/20 px-1 font-mono text-xs">
            src/config.ts
          </code>{" "}
          or{" "}
          <code className="rounded bg-amber-500/20 px-1 font-mono text-xs">
            NEXT_PUBLIC_REMITLY_URL
          </code>
          . Until then the button simply visits remitly.com.
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
      <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
        {kicker}
      </span>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {sub ? (
        <p className="text-balance text-muted-foreground">{sub}</p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {!isPaymentConfigured ? <OwnerNotice /> : null}

        <section className="relative overflow-hidden">
          <FloatingBills />
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-4 pt-16 pb-24 text-center sm:px-6 sm:pt-24 sm:pb-28">
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1 font-mono text-xs tracking-wide motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-700"
            >
              No product · No perk · No catch
            </Badge>

            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              Just give me{" "}
              <span className="relative inline-block text-emerald-500 transition-transform duration-300 hover:scale-105">
                {money}
              </span>
            </h1>

            <p className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:delay-150">
              You do not need a reason, and you do not need to know me. Ten
              dollars is the least Remitly can do, it takes about ninety
              seconds, and Remitly handles the money — I never see your card
              details. It is what it is.
            </p>

            <div className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:delay-300">
              <GiveActions />
            </div>

            <dl className="grid w-full max-w-md grid-cols-3 divide-x rounded-2xl border border-border/70 bg-card/60 backdrop-blur">
              {[
                ["Price", `$${AMOUNT}.00`],
                ["Products", "0"],
                ["Time needed", "~90 sec"],
              ].map(([label, value]) => (
                <div key={label} className="px-3 py-4">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="font-mono text-lg font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                The pricing philosophy
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Why {money}, specifically?
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                There is no tier, no shout-out, no early access and no
                roadmap. The transaction itself is the product. You press a
                button, Remitly moves the money, and both of us get a small
                story to tell. It is what it is.
              </p>

              <div className="rounded-xl border border-border/70 bg-muted/40 p-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Not included
                </p>
                <ul className="flex flex-col gap-2">
                  {NOT_INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <CircleXIcon className="size-4 shrink-0 text-muted-foreground/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Card className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-700">
              <CardHeader className="items-center text-center">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Where your {money} goes
                </span>
                <CardTitle className="font-mono text-lg tracking-tight">
                  ITEMISED RECEIPT · DRAFT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3 font-mono text-sm">
                  {RECEIPT.map((line) => (
                    <li
                      key={line.label}
                      className="flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-2"
                    >
                      <span className="text-muted-foreground">
                        {line.label}
                      </span>
                      <span className="tabular-nums">{line.amount}</span>
                    </li>
                  ))}
                  <li className="flex items-baseline justify-between gap-4 pt-1 text-base font-semibold">
                    <span>TOTAL</span>
                    <span className="tabular-nums text-emerald-600 dark:text-emerald-400">
                      ${AMOUNT}.00
                    </span>
                  </li>
                </ul>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Itemised for transparency. None of it has been verified by
                  anyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-border/70 bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
            <SectionHeading
              kicker="Three steps"
              title="How this works"
              sub="A rigorous, fully audited process with zero moving parts."
            />
            <div className="grid gap-5 sm:grid-cols-3">
              {STEPS.map((step) => (
                <Card key={step.n} className="gap-4">
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-3xl font-medium text-emerald-500">
                        {step.n}
                      </span>
                      <step.icon className="size-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
          <SectionHeading
            kicker="Questions I get"
            title="The FAQ, deflected"
            sub="Answers that are honest, legally boring, and only slightly self-serving."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {FAQ.map((item) => (
              <Card key={item.q}>
                <CardHeader>
                  <CardTitle className="text-base">{item.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6">
          <Card className="items-center gap-6 border-emerald-500/30 bg-emerald-500/5 px-6 py-12 text-center">
            <ShieldCheckIcon className="size-6 text-emerald-600 dark:text-emerald-400" />
            <div className="flex flex-col gap-3">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Still here? That is basically a yes.
              </h2>
              <p className="text-balance text-muted-foreground">
                The button has been extremely patient. Remitly does the
                paperwork, I do the thanking, you do almost nothing. It is what
                it is.
              </p>
            </div>
            <GiveActions compact />
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} The Ten Dollar Fund · one button, zero products, built
            with Next.js, shadcn/ui, Tailwind and confetti.
          </p>
          <p>
            Not affiliated with Remitly. Payments run through{" "}
            <a
              href="https://www.remitly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-emerald-500"
            >
              remitly.com
            </a>{" "}
            — it is what it is.
          </p>
        </div>
      </footer>
    </>
  );
}
