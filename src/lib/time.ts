import { siteConfig, type OpeningHour } from "@/config/site";

/**
 * Time helpers.
 * India observes a fixed +05:30 offset with no DST, so we can compute
 * "now in IST" deterministically without a timezone library.
 */

const IST_OFFSET_MS = siteConfig.utcOffsetMinutes * 60_000;

/** Date whose UTC fields represent current IST wall-clock time. */
export function nowInIST(): Date {
  return new Date(Date.now() + IST_OFFSET_MS);
}

/** Minutes since midnight for an "HH:MM" string. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export interface OpenState {
  isOpen: boolean;
  /** e.g. "Opens at 9:00 AM" / "Closed today" / "Closes at 9:30 PM" */
  status: string;
  today: OpeningHour | null;
}

/** Evaluate opening hours against real IST time. */
export function getOpenState(hours: readonly OpeningHour[] = siteConfig.hours): OpenState {
  const ist = nowInIST();
  const day = ist.getUTCDay();
  const today = hours.find((h) => h.day === day) ?? null;
  const current = ist.getUTCHours() * 60 + ist.getUTCMinutes();

  if (!today || today.open == null || today.close == null) {
    // Find the next upcoming day that has opening hours.
    let next: OpeningHour | undefined;
    for (let offset = 1; offset <= 7; offset++) {
      const candidate = hours.find((h) => h.day === (day + offset) % 7);
      if (candidate && candidate.open != null) {
        next = candidate;
        break;
      }
    }
    return {
      isOpen: false,
      status: next
        ? `Opens ${next.label} at ${formatClock(next.open!)}`
        : "Closed today",
      today,
    };
  }

  const openM = toMinutes(today.open);
  const closeM = toMinutes(today.close);

  if (current >= openM && current < closeM) {
    return {
      isOpen: true,
      status: `Closes at ${formatClock(today.close!)}`,
      today,
    };
  }
  if (current < openM) {
    return { isOpen: false, status: `Opens at ${formatClock(today.open!)}`, today };
  }
  return { isOpen: false, status: "Closed for today", today };
}

/** "09:00" → "9:00 AM" */
export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/**
 * A genuine future timestamp for offer countdowns: the next Sunday 23:59 IST.
 * Falls back to +7 days if that is somehow in the past.
 */
export function nextOfferDeadline(): Date {
  const ist = nowInIST();
  const day = ist.getUTCDay();
  const daysUntilSunday = (7 - day) % 7;
  const deadline = Date.UTC(
    ist.getUTCFullYear(),
    ist.getUTCMonth(),
    ist.getUTCDate() + daysUntilSunday,
    23,
    59,
    0,
  ) - IST_OFFSET_MS;
  const resolved = deadline > Date.now() ? deadline : deadline + 7 * 24 * 3600_000;
  return new Date(resolved);
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  expired: boolean;
}

export function diffTo(target: Date, from: Date = new Date()): Countdown {
  const totalMs = Math.max(0, target.getTime() - from.getTime());
  const seconds = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    totalMs,
    expired: totalMs === 0,
  };
}
