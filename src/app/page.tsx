import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AR.IO",
  description: "Build on the AR.IO Network with docs, SDKs, and APIs.",
};

function PillLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full bg-fd-primary/15 px-4 py-2 text-sm font-medium text-fd-foreground/90 hover:bg-fd-primary/25 transition-colors"
    >
      {children}
    </Link>
  );
}

function PillDropdown({
  label,
  items,
}: {
  label: string;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <details className="relative group">
      <summary className="list-none cursor-pointer rounded-full bg-fd-primary/15 px-4 py-2 text-sm font-medium text-fd-foreground/90 hover:bg-fd-primary/25 transition-colors inline-flex items-center gap-2">
        {label}
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>

      {/* Click outside closes automatically because this is <details> */}
      <div className="absolute left-0 top-full z-50 mt-2 min-w-56 overflow-hidden rounded-2xl border border-fd-border bg-fd-background shadow-lg">
        <div className="p-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2 text-sm text-fd-foreground hover:bg-fd-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}

function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-fd-foreground px-4 py-2 text-sm font-semibold text-fd-background hover:opacity-90 transition-opacity"
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = /^https?:\/\//i.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 py-2 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
      >
        {children}
        <ChevronRight className="size-4" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 py-2 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
    >
      {children}
      <ChevronRight className="size-4" />
    </Link>
  );
}

function PersonaCard({
  kicker,
  title,
  description,
  primary,
  secondary,
  imageSrc,
  imageAlt,
}: {
  kicker: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
}) {
  const isExternalImage = /^https?:\/\//i.test(imageSrc);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-fd-border bg-fd-background shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fd-primary/18" />
      <div className="relative p-8">
        <div className="text-xs font-semibold tracking-widest text-fd-muted-foreground">
          {kicker}
        </div>
        <div className="mt-2 text-3xl font-bold tracking-tight">{title}</div>
        <p className="mt-3 max-w-sm text-sm leading-6 text-fd-muted-foreground">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <PrimaryCta href={primary.href}>{primary.label}</PrimaryCta>
          <SecondaryCta href={secondary.href}>{secondary.label}</SecondaryCta>
        </div>
      </div>

      <div className="relative h-[260px] w-full">
        {isExternalImage ? (
          // Use <img> for external sources to avoid Next Image remote config friction.
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="h-full w-full object-cover object-bottom grayscale"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-bottom grayscale"
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority={false}
          />
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-fd-background">
      <header className="sticky top-0 z-50 border-b border-fd-border bg-fd-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/ario-lockup.svg"
              alt="AR.IO"
              width={134}
              height={32}
              className="block"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <PillLink href="#solutions">Solutions</PillLink>
            <PillLink href="#ecosystem">Ecosystem</PillLink>
            <PillDropdown
              label="Use Cases"
              items={[
                { label: "Overview", href: "#use-cases" },
                {
                  label: "Decentralized AI",
                  href: "/marketing/use-cases/decentralized-ai",
                },
              ]}
            />
            <PillLink href="#contact">Contact</PillLink>
          </nav>

          <div className="flex items-center gap-2">
            <PrimaryCta href="/learn">Get Started</PrimaryCta>
          </div>
        </div>
      </header>

      <main>
        <section className="relative bg-gradient-to-b from-black via-black to-fd-primary/30 pb-24 pt-8">
          <div className="mx-auto max-w-6xl px-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-fd-border bg-fd-background">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fd-primary/55" />

              <div className="relative grid gap-10 p-8 md:grid-cols-2 md:items-center md:p-12">
                <div className="min-w-0">
                  <div className="inline-flex items-center rounded-full border border-fd-border bg-fd-background/70 px-3 py-1 text-xs font-medium text-fd-muted-foreground backdrop-blur">
                    Time with zero data lost: <span className="ml-1 font-semibold text-fd-foreground">2920:23:17:23</span>
                  </div>

                  <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight md:text-6xl">
                    Zero downtime.
                  </h1>

                  <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-fd-muted-foreground">
                    And zero sleepless nights. Secure your files in the permanent cloud with AR.IO.
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-fd-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-md bg-fd-foreground text-fd-background">
                        <Check className="size-3.5" />
                      </span>
                      <span>
                        <span className="font-semibold text-fd-foreground">0</span> data lost and <span className="font-semibold text-fd-foreground">0</span> downtime since launch
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-md bg-fd-foreground text-fd-background">
                        <Check className="size-3.5" />
                      </span>
                      <span>Secure, permanent cloud storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-md bg-fd-foreground text-fd-background">
                        <Check className="size-3.5" />
                      </span>
                      <span>Own your files — stop renting</span>
                    </li>
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <PrimaryCta href="/learn">Secure Your Files</PrimaryCta>
                    <SecondaryCta href="/build/upload">Learn More</SecondaryCta>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-fd-border bg-black/5">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-fd-primary/45" />
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
                    alt="Person smiling while holding a device"
                    className="h-[340px] w-full object-cover md:h-[520px]"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <PersonaCard
                kicker="PERMANENT CLOUD STORAGE FOR"
                title="Enterprise"
                description="Ship compliance-friendly data retention with verifiable permanence — no migrations, no vendor lock-in."
                primary={{ label: "Contact", href: "#contact" }}
                secondary={{ label: "Learn More", href: "/build/upload" }}
                imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
                imageAlt="Modern office tower exterior"
              />
              <PersonaCard
                kicker="SECURELY STORE"
                title="People"
                description="Store files, photos, and projects with pay-once permanence — and share them from resilient links."
                primary={{ label: "Get started", href: "/learn" }}
                secondary={{ label: "Learn More", href: "/build/upload" }}
                imageSrc="https://images.unsplash.com/photo-1603574670812-d24560880210?q=80&w=1600&auto=format&fit=crop"
                imageAlt="A person holding a DSLR camera"
              />
              <PersonaCard
                kicker="PERMANENT CLOUD STORAGE FOR"
                title="Institutions"
                description="Preserve records and public data with decentralized retrieval, high availability, and independent verification."
                primary={{ label: "Contact", href: "#contact" }}
                secondary={{ label: "Learn More", href: "/build/run-a-gateway" }}
                imageSrc="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80"
                imageAlt="Library stacks in a public institution"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 pt-32">
          <div className="grid gap-10 md:grid-cols-3">
            <div id="solutions" className="scroll-mt-28">
              <div className="text-sm font-semibold text-fd-muted-foreground">
                Solutions
              </div>
              <div className="mt-2 text-xl font-semibold">Build &amp; ship</div>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                Upload data, resolve names, and retrieve content with the same
                SDKs and APIs used across the ecosystem.
              </p>
              <div className="mt-4">
                <SecondaryCta href="/build">Explore build docs</SecondaryCta>
              </div>
            </div>

            <div id="ecosystem" className="scroll-mt-28">
              <div className="text-sm font-semibold text-fd-muted-foreground">
                Ecosystem
              </div>
              <div className="mt-2 text-xl font-semibold">Tools &amp; SDKs</div>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                Start from a library, not a blank slate. Wayfinder, Turbo, ArNS,
                and more.
              </p>
              <div className="mt-4">
                <SecondaryCta href="/sdks">Browse SDKs</SecondaryCta>
              </div>
            </div>

            <div id="use-cases" className="scroll-mt-28">
              <div className="text-sm font-semibold text-fd-muted-foreground">
                Use Cases
              </div>
              <div className="mt-2 text-xl font-semibold">Patterns</div>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                Learn by example: gateway operations, decentralized access, ArNS
                integration, and advanced upload flows.
              </p>
              <div className="mt-4">
                <SecondaryCta href="/build/guides">Read guides</SecondaryCta>
              </div>
            </div>
          </div>

          <div
            id="contact"
            className="mt-16 scroll-mt-28 rounded-2xl border border-fd-border bg-fd-card p-8"
          >
            <div className="text-sm font-semibold text-fd-muted-foreground">
              Contact
            </div>
            <div className="mt-2 text-2xl font-semibold">
              Want this to be the real homepage?
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-fd-muted-foreground">
              We can wire these sections to your real marketing content, reuse
              docs navigation/search, and keep everything in one repo with a
              consistent design system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryCta href="/learn">Start in the docs</PrimaryCta>
              <SecondaryCta href="https://discord.gg/cuCqBb5v">
                Join Discord
              </SecondaryCta>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


