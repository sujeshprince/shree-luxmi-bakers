import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "cn";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  /** Breadcrumb trail, e.g. [{ label: "Home", href: "/" }, { label: "Menu" }] */
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}

/** Shared dark hero band for inner pages (below the fixed navbar). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 pb-14 gradient-brown sm:pt-32 sm:pb-16",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 surface-lattice opacity-35" />
      <div
        aria-hidden
        className="absolute -top-24 -right-16 size-80 rounded-full bg-gold/12 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 sm:px-6 lg:px-8">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-cream/55">
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition-colors hover:text-gold"
            >
              <Home className="size-3.5" />
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 text-gold/50" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-gold"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-cream/85">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="max-w-3xl font-heading text-4xl leading-[1.06] font-semibold text-cream sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle ? (
          <p className="max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
            {subtitle}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
