"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  MessageCircle,
  PartyPopper,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect } from "@/components/forms/form-select";
import { buildCakeEnquiry } from "@/lib/whatsapp";
import { whatsappHref } from "@/lib/links";
import { submitForm } from "@/lib/submit";
import { defer } from "@/lib/defer";

const PHONE_RE = /^(?:\+?91)?[6-9]\d{9}$/;

function isFutureDate(value: string): boolean {
  const chosen = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !Number.isNaN(chosen.getTime()) && chosen >= today;
}

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
  cakeType: z.string().min(1, "Please choose a cake type"),
  flavor: z.string().min(1, "Please choose a flavour"),
  size: z.string().min(1, "Please choose a size"),
  occasion: z.string().min(1, "Please choose an occasion"),
  requiredDate: z
    .string()
    .min(1, "Please choose a date")
    .refine(isFutureDate, "Please choose today or a future date"),
  budget: z.string().min(1, "Please choose a budget"),
  designDescription: z
    .string()
    .max(500, "Please keep the description under 500 characters"),
});

type Values = z.infer<typeof schema>;

const CAKE_TYPES = [
  { value: "birthday", label: "Birthday Cake" },
  { value: "wedding", label: "Wedding / Tiered Cake" },
  { value: "anniversary", label: "Anniversary Cake" },
  { value: "photo", label: "Photo Cake" },
  { value: "kids", label: "Kids / Cartoon Theme" },
  { value: "corporate", label: "Corporate Order" },
  { value: "other", label: "Something Else" },
];

const FLAVORS = [
  { value: "chocolate-truffle", label: "Chocolate Truffle" },
  { value: "black-forest", label: "Black Forest" },
  { value: "red-velvet", label: "Red Velvet" },
  { value: "butterscotch", label: "Butterscotch" },
  { value: "vanilla", label: "Vanilla" },
  { value: "pineapple", label: "Pineapple" },
  { value: "coffee-hazelnut", label: "Coffee Hazelnut" },
  { value: "eggless", label: "Eggless Option" },
  { value: "other", label: "Other / Surprise us" },
];

const SIZES = [
  { value: "0.5kg", label: "0.5 Kg" },
  { value: "1kg", label: "1 Kg" },
  { value: "1.5kg", label: "1.5 Kg" },
  { value: "2kg", label: "2 Kg" },
  { value: "multi-tier", label: "2 Kg+ / Multi-tier" },
];

const OCCASIONS = [
  { value: "birthday", label: "Birthday" },
  { value: "wedding", label: "Wedding" },
  { value: "anniversary", label: "Anniversary" },
  { value: "naming", label: "Naming Ceremony" },
  { value: "festival", label: "Festival" },
  { value: "corporate", label: "Corporate" },
  { value: "just-because", label: "Just Because" },
];

const BUDGETS = [
  { value: "under-500", label: "Under ₹500" },
  { value: "500-1000", label: "₹500 – ₹1,000" },
  { value: "1000-2000", label: "₹1,000 – ₹2,000" },
  { value: "2000-plus", label: "₹2,000+" },
  { value: "discuss", label: "Let's discuss" },
];

/** Custom cake enquiry form with validation, loading, error & success states. */
export function CakeEnquiryForm() {
  const [file, setFile] = React.useState<File | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState<{ demo: boolean; summary: string } | null>(
    null,
  );
  // Earliest selectable date — resolved on the client (clock reads are
  // blocked during static prerendering with Cache Components).
  const [minDate, setMinDate] = React.useState("");

  React.useEffect(() => {
    defer(() =>
      setMinDate(new Date(Date.now() + 86_400_000).toISOString().slice(0, 10)),
    );
  }, []);

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
      cakeType: "",
      flavor: "",
      size: "",
      occasion: "",
      requiredDate: "",
      budget: "",
      designDescription: "",
    },
  });

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = event.target.files?.[0] ?? null;
    setFileError(null);
    if (!chosen) {
      setFile(null);
      return;
    }
    if (!chosen.type.startsWith("image/")) {
      setFileError("Please choose an image file (JPG or PNG).");
      return;
    }
    if (chosen.size > 5 * 1024 * 1024) {
      setFileError("Image must be under 5 MB.");
      return;
    }
    setFile(chosen);
  };

  const buildSummary = (values: Values, fileName?: string) =>
    [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Cake type: ${labelOf(CAKE_TYPES, values.cakeType)}`,
      `Flavour: ${labelOf(FLAVORS, values.flavor)}`,
      `Size: ${labelOf(SIZES, values.size)}`,
      `Occasion: ${labelOf(OCCASIONS, values.occasion)}`,
      `Required by: ${values.requiredDate}`,
      `Budget: ${labelOf(BUDGETS, values.budget)}`,
      values.designDescription
        ? `Design: ${values.designDescription}`
        : "Design: Open to suggestions",
      fileName ? `Reference image: ${fileName} (will attach in chat)` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const onSubmit = async (values: Values) => {
    setSubmitError(null);
    const summary = buildSummary(values, file?.name);
    const result = await submitForm(
      { type: "cake-enquiry", ...values, referenceImageName: file?.name ?? "" },
      file,
    );
    if (result.ok) {
      setDone({ demo: result.mode === "demo", summary });
      reset();
      setFile(null);
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
            Thank you! Your cake enquiry has been received.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            We&apos;ll review your requirements and get back to you shortly. Need a
            quick reply? Send the same details on WhatsApp right now.
          </p>
          {done.demo ? (
            <p className="mx-auto mt-3 max-w-md text-xs text-muted-foreground/80">
              Preview mode — no form endpoint is connected yet. Use the WhatsApp button
              below and your enquiry reaches the bakery for real.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="gold" size="lg">
            <a
              href={whatsappHref(buildCakeEnquiry(done.summary))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setDone(null)}
          >
            <PartyPopper className="size-4" />
            Submit another enquiry
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
        <h3 className="font-heading text-2xl font-semibold">Cake Enquiry</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about your dream cake — we&apos;ll handle the rest.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cake-name">Name</Label>
          <Input
            id="cake-name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cake-name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="cake-name-error" className="text-xs text-destructive" role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cake-phone">Phone</Label>
          <Input
            id="cake-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "cake-phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="cake-phone-error" className="text-xs text-destructive" role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <FormSelect
          id="cake-type"
          label="Cake Type"
          options={CAKE_TYPES}
          registration={register("cakeType")}
          error={errors.cakeType?.message}
          required
        />
        <FormSelect
          id="cake-flavor"
          label="Cake Flavour"
          options={FLAVORS}
          registration={register("flavor")}
          error={errors.flavor?.message}
          required
        />
        <FormSelect
          id="cake-size"
          label="Cake Size"
          options={SIZES}
          registration={register("size")}
          error={errors.size?.message}
          required
        />
        <FormSelect
          id="cake-occasion"
          label="Occasion"
          options={OCCASIONS}
          registration={register("occasion")}
          error={errors.occasion?.message}
          required
        />
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cake-date">
            Required Date<span className="ml-0.5 text-destructive">*</span>
          </Label>
          <Input
            id="cake-date"
            type="date"
            min={minDate}
            aria-invalid={Boolean(errors.requiredDate)}
            aria-describedby={errors.requiredDate ? "cake-date-error" : undefined}
            {...register("requiredDate")}
          />
          {errors.requiredDate ? (
            <p id="cake-date-error" className="text-xs text-destructive" role="alert">
              {errors.requiredDate.message}
            </p>
          ) : null}
        </div>
        <FormSelect
          id="cake-budget"
          label="Budget"
          options={BUDGETS}
          registration={register("budget")}
          error={errors.budget?.message}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cake-design">Design Description</Label>
        <Textarea
          id="cake-design"
          rows={3}
          placeholder="Colours, theme, message on top, allergies…"
          aria-invalid={Boolean(errors.designDescription)}
          aria-describedby={
            errors.designDescription
              ? "cake-design-error"
              : undefined
          }
          {...register("designDescription")}
        />
        <div className="flex items-baseline justify-between gap-2">
          {errors.designDescription ? (
            <p id="cake-design-error" className="text-xs text-destructive" role="alert">
              {errors.designDescription.message}
            </p>
          ) : (
            <span className="text-xs text-muted-foreground">Optional</span>
          )}
        </div>
      </div>

      {/* Reference image */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cake-image">Reference Image</Label>
        <div className="flex items-center gap-3">
          <label
            htmlFor="cake-image"
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-input px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-gold-deep"
          >
            <ImagePlus className="size-4" />
            {file ? file.name : "Choose an image (optional)"}
          </label>
          <input
            id="cake-image"
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="sr-only"
          />
          {file ? (
            <button
              type="button"
              aria-label="Remove selected image"
              onClick={() => {
                setFile(null);
                const input = document.getElementById(
                  "cake-image",
                ) as HTMLInputElement | null;
                if (input) input.value = "";
              }}
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
        {fileError ? (
          <p className="text-xs text-destructive" role="alert">
            {fileError}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">JPG or PNG, up to 5 MB.</p>
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

      <Button type="submit" variant="gold" size="2xl" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Send className="size-5" />
        )}
        {isSubmitting ? "Sending…" : "Submit Cake Enquiry"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Prefer chatting? Tap{" "}
        <a
          href={whatsappHref(
            buildCakeEnquiry(
              "Hi! I'd like to discuss a custom cake order — I'll share the details here.",
            ),
          )}
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

function labelOf(options: Array<{ value: string; label: string }>, value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}
