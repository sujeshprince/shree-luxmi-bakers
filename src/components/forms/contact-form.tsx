"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, MessageCircle, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect } from "@/components/forms/form-select";
import { whatsappHref } from "@/lib/links";
import { submitForm } from "@/lib/submit";

const PHONE_RE = /^(?:\+?91)?[6-9]\d{9}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .refine(
      (value) => PHONE_RE.test(value.replace(/[\s-]/g, "")),
      "Enter a valid 10-digit Indian mobile number",
    ),
  email: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Enter a valid email address",
    ),
  topic: z.string().min(1, "Please choose a topic"),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(1000, "Please keep the message under 1,000 characters"),
});

type Values = z.infer<typeof schema>;

const TOPICS = [
  { value: "order", label: "Order Enquiry" },
  { value: "custom-cake", label: "Custom Cake" },
  { value: "bulk", label: "Bulk / Corporate Order" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Something Else" },
];

function labelOf(value: string) {
  return TOPICS.find((topic) => topic.value === value)?.label ?? value;
}

/** General contact form with validation, loading, error & success states. */
export function ContactForm() {
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState<{ demo: boolean; summary: string } | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  const buildSummary = (values: Values) =>
    [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.email ? `Email: ${values.email}` : "",
      `Topic: ${labelOf(values.topic)}`,
      "",
      values.message,
    ]
      .filter((line) => line !== undefined)
      .join("\n");

  const onSubmit = async (values: Values) => {
    setSubmitError(null);
    const summary = buildSummary(values);
    const result = await submitForm({ type: "contact", ...values });
    if (result.ok) {
      setDone({ demo: result.mode === "demo", summary });
      reset();
    } else {
      setSubmitError(result.error);
    }
  };

  if (done) {
    return (
      <div
        className="flex flex-col items-center gap-5 rounded-3xl border border-gold/40 bg-card p-8 text-center shadow-xl sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-green-500/12 text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-8" />
        </span>
        <div>
          <h3 className="font-heading text-2xl font-semibold">
            Thank you! Your message has been received.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            We&apos;ll get back to you shortly. For a quicker reply, send the same
            message on WhatsApp.
          </p>
          {done.demo ? (
            <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground/80">
              Preview mode — no form endpoint is connected yet. The WhatsApp button below
              delivers your message to the bakery for real.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="lg">
            <a
              href={whatsappHref(done.summary)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" />
              Send on WhatsApp
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setDone(null)}
          >
            <RotateCcw className="size-4" />
            Write another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-gold/30 bg-card p-6 shadow-xl sm:p-8"
    >
      <div>
        <h3 className="font-heading text-2xl font-semibold">Send a Message</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Questions, feedback or order queries — we&apos;re happy to help.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-xs text-destructive" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p
              id="contact-phone-error"
              className="text-xs text-destructive"
              role="alert"
            >
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contact-email">
            Email<span className="ml-0.5 text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p
              id="contact-email-error"
              className="text-xs text-destructive"
              role="alert"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <FormSelect
          id="contact-topic"
          label="Topic"
          options={TOPICS}
          registration={register("topic")}
          error={errors.topic?.message}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="How can we help?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="text-xs text-destructive"
            role="alert"
          >
            {errors.message.message}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">Minimum 10 characters.</p>
        )}
      </div>

      {submitError ? (
        <p
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="gold"
        size="2xl"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Send className="size-5" />
        )}
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Prefer chatting? Tap{" "}
        <a
          href={whatsappHref("Hi! I'd like to get in touch with Shree Luxmi Bakers.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-deep underline underline-offset-4 dark:text-gold"
        >
          Chat on WhatsApp
        </a>{" "}
        and tell us directly.
      </p>
    </form>
  );
}
