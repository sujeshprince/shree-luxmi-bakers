"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitForm } from "@/lib/submit";

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "That doesn't look like a valid email",
    ),
});

type Values = z.infer<typeof schema>;

/** Newsletter signup with validation, loading, error & success states. */
export function NewsletterForm() {
  const [state, setState] = React.useState<
    { kind: "idle" } | { kind: "success"; demo: boolean } | { kind: "error"; message: string }
  >({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    const result = await submitForm({ type: "newsletter", email: values.email });
    if (result.ok) {
      setState({ kind: "success", demo: result.mode === "demo" });
      reset();
    } else {
      setState({ kind: "error", message: result.error });
    }
  };

  if (state.kind === "success") {
    return (
      <div
        className="rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-cream"
        role="status"
        aria-live="polite"
      >
        <p className="flex items-center gap-2 font-medium">
          <MailCheck className="size-4 text-gold" />
          You&apos;re on the list — thanks for subscribing!
        </p>
        {state.demo ? (
          <p className="mt-1.5 text-xs text-cream/55">
            Preview mode: connect a form endpoint in{" "}
            <code className="text-gold">config/site.ts</code> to receive signups.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "newsletter-error" : undefined}
            className="h-11 border-cream/20 bg-cream/10 text-cream placeholder:text-cream/45 focus-visible:border-gold"
            {...register("email")}
          />
        </div>
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="h-11 shrink-0"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
          {isSubmitting ? "Joining…" : "Subscribe"}
        </Button>
      </div>

      {errors.email ? (
        <p id="newsletter-error" className="text-xs text-amber-400" role="alert">
          {errors.email.message}
        </p>
      ) : null}
      {state.kind === "error" ? (
        <p className="text-xs text-amber-400" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
