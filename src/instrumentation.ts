// Schedules the hourly auto-approve sweep. Runs in the long-lived `next start`
// process (Railway), so no external cron is required — though the
// /api/cron/auto-approve route also accepts external triggers via CRON_SECRET.

const SWEEP_INTERVAL_MS = 60 * 60 * 1000;
const FIRST_SWEEP_DELAY_MS = 45 * 1000;

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const g = globalThis as typeof globalThis & { __autoApproveTimer?: unknown };
  if (g.__autoApproveTimer) return;

  const sweep = async () => {
    try {
      const port = process.env.PORT || 3000;
      // Go through the HTTP route (rather than calling the lib directly) so
      // revalidatePath runs inside a request context.
      const res = await fetch(`http://127.0.0.1:${port}/api/cron/auto-approve`, {
        method: "POST",
        headers: process.env.CRON_SECRET
          ? { authorization: `Bearer ${process.env.CRON_SECRET}` }
          : undefined,
      });
      if (!res.ok) {
        console.error(`[auto-approve] Sweep request failed with ${res.status}`);
      }
    } catch (err) {
      console.error("[auto-approve] Sweep request threw", err);
    }
  };

  const interval = setInterval(sweep, SWEEP_INTERVAL_MS);
  interval.unref?.();
  g.__autoApproveTimer = interval;

  const kickoff = setTimeout(sweep, FIRST_SWEEP_DELAY_MS);
  kickoff.unref?.();
}
