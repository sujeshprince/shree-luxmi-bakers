import { siteConfig } from "@/config/site";

export type SubmitResult =
  | { ok: true; mode: "live" | "demo" }
  | { ok: false; error: string };

/**
 * Submits a form payload to the configured endpoint (config/site.ts).
 * When no endpoint is configured the form runs in demo mode: validation
 * and all UI states still work, and the UI clearly notes preview mode —
 * nothing pretends to have been delivered.
 */
export async function submitForm(
  payload: Record<string, unknown>,
  file?: File | null,
): Promise<SubmitResult> {
  const endpoint = siteConfig.formEndpoint.trim();
  if (!endpoint) return { ok: true, mode: "demo" };

  try {
    let body: BodyInit;
    let headers: HeadersInit | undefined;
    if (file) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        formData.append(key, String(value));
      }
      formData.append("file", file);
      body = formData;
    } else {
      headers = { "Content-Type": "application/json" };
      body = JSON.stringify(payload);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });
    if (!response.ok) {
      return {
        ok: false,
        error: `We couldn't send that just now (server responded ${response.status}). Please try WhatsApp instead.`,
      };
    }
    return { ok: true, mode: "live" };
  } catch {
    return {
      ok: false,
      error: "We couldn't reach the server. Please try again or use WhatsApp.",
    };
  }
}
