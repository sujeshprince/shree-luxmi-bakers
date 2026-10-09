import Link from "next/link";
import { ArrowLeft, CakeSlice, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-28 text-center gradient-brown">
      <div aria-hidden className="absolute inset-0 surface-lattice opacity-30" />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-6">
        <span className="flex size-20 items-center justify-center rounded-full border border-gold/40 bg-gold/12 text-gold">
          <CakeSlice className="size-9" aria-hidden />
        </span>

        <p className="text-xs font-semibold tracking-[0.34em] text-gold uppercase">
          Error 404
        </p>

        <h1 className="max-w-2xl font-heading text-5xl leading-[1.05] font-semibold text-cream sm:text-6xl lg:text-7xl">
          This page slipped out of the oven
        </h1>

        <p className="max-w-md text-base leading-relaxed text-cream/70">
          The page you&apos;re looking for doesn&apos;t exist — but fresh cakes, cookies
          and mithai definitely do.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gold" size="xl">
            <Link href="/" className="group">
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            variant="goldOutline"
            size="xl"
            className="border-cream/40 text-cream hover:border-gold hover:text-brown-deep"
          >
            <Link href="/menu">
              <Search className="size-5" />
              Browse the Menu
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
