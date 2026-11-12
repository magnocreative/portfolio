"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { ArrowRight } from "./Icon";
import { Toast } from "./Toast";
import { MARK_DEEP_PATH, MARK_LIGHT_PATH, MARK_VIEWBOX } from "@/design-system/brand/Logo";

/**
 * The way in while the site is password-protected (src/proxy.ts): a card over
 * the blurred opening of the home page, with the mark, a welcome, and the
 * password field. It replaced the browser's own Basic auth prompt, a system
 * dialog that could say nothing about who the site belongs to or why it asks
 * (Alejandro, November 2026). Mirrors the Password gate component in Figma.
 *
 * THE MARK FILLS AS YOU GO IN. At rest it is an outline. Each keystroke raises
 * the fill a step from the bottom, the deep peak first and the light one a
 * beat behind; it eases toward 70% and never completes while typing. It
 * answers typing, not correctness, on purpose: a mark that filled only for
 * right characters would hand out the password one letter at a time, and it
 * would mean sending the password to the browser to check against. Only the
 * server knows the password. A right one fills the mark to the top and the
 * site comes up under it; a wrong one drains it, the field shakes and clears,
 * and a toast asks for another try.
 *
 * A native <dialog> opened with showModal(): the page behind it is inert, so
 * neither a pointer nor the Tab key can reach the links under the blur, and
 * focus starts in the field. Escape does nothing; there is nowhere to go back
 * to. With reduced motion the fill and the reveal happen at once.
 */

const typed = (n: number) => 0.7 * (1 - Math.pow(0.78, n));

type Phase = "idle" | "checking" | "wrong" | "entering";

async function enter(password: string) {
  const res = await fetch("/api/enter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return res.ok;
}

/** The mark as an outline with two fills that rise inside each mountain. */
export function GateMark({ level, draining = false, entering = false }: { level: number; draining?: boolean; entering?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // Typing eases up; a drain falls a little slower so it reads as letting go;
  // the last fill on entry is the long, even climb.
  const motion = entering
    ? "transition-transform duration-[1000ms] ease-[cubic-bezier(.65,0,.35,1)]"
    : draining
      ? "transition-transform duration-[600ms] ease-[cubic-bezier(.4,0,.6,1)]"
      : "transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)]";
  const rise = (l: number) => ({ transformBox: "fill-box" as const, transform: `translateY(${(1 - Math.min(1, l)) * 100}%)` });
  return (
    <svg viewBox={MARK_VIEWBOX} aria-hidden="true" className="h-auto w-[72px] overflow-visible">
      <defs>
        <clipPath id={`${id}-deep`}>
          <path d={MARK_DEEP_PATH} />
        </clipPath>
        <clipPath id={`${id}-light`}>
          <path d={MARK_LIGHT_PATH} />
        </clipPath>
      </defs>
      {/* 1.5px at any size, the weight of the icon strokes: thinner read as a
          rendering fault in the light theme, heavier competes with the fill. */}
      <g
        fill="none"
        stroke="var(--text-tertiary)"
        strokeOpacity={0.55}
        strokeWidth={1.5}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={`transition-opacity duration-300 motion-reduce:transition-none ${entering ? "opacity-0 delay-[900ms]" : ""}`}
      >
        <path d={MARK_LIGHT_PATH} vectorEffect="non-scaling-stroke" />
        <path d={MARK_DEEP_PATH} vectorEffect="non-scaling-stroke" />
      </g>
      <g clipPath={`url(#${id}-deep)`}>
        <rect x="0" y="0" width="190" height="204" fill="var(--mark-deep)" className={`${motion} motion-reduce:transition-none`} style={rise(level)} />
      </g>
      <g clipPath={`url(#${id}-light)`}>
        <rect
          x="130"
          y="0"
          width="141"
          height="204"
          fill="var(--mark-light)"
          className={`${motion} ${entering ? "delay-150" : "delay-[60ms]"} motion-reduce:transition-none`}
          style={rise(entering ? 1 : level * 0.85)}
        />
      </g>
    </svg>
  );
}

export function PasswordGate({
  contactHref,
  check = enter,
  onEntered,
}: {
  /** Where "Ask me for one" goes: a mailto with the subject filled in. */
  contactHref: string;
  /** Checks a password. Defaults to posting it to /api/enter; stories pass their own. */
  check?: (password: string) => Promise<boolean>;
  /** After the fill completes. Defaults to reloading the address the visitor asked for. */
  onEntered?: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [toast, setToast] = useState(false);
  const [shaking, setShaking] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const d = dialog.current;
    if (d && !d.open) d.showModal();
    return () => clearTimeout(toastTimer.current);
  }, []);

  const entering = phase === "entering";
  const level = entering ? 1 : phase === "wrong" ? 0 : typed(value.length);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (phase === "checking" || entering || !value) return;
    setPhase("checking");
    const ok = await check(value).catch(() => false);
    if (ok) {
      setToast(false);
      setPhase("entering");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // The fill climbs for about a second and a quarter; the card lets go
      // while the site comes up behind it.
      setTimeout(() => {
        if (onEntered) onEntered();
        else window.location.replace(window.location.href);
      }, reduced ? 0 : 1400);
      return;
    }
    setPhase("wrong");
    setValue("");
    setShaking(true);
    setToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(false), 3200);
    input.current?.focus();
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="gate-title"
      aria-describedby="gate-note"
      onCancel={(e) => e.preventDefault()}
      className={[
        "m-auto w-[min(420px,calc(100%-2rem))] overflow-visible rounded-lg border border-border-subtle bg-surface-raised p-8 pt-10 text-text-primary",
        // The one shadow in the system: a card floating over a page it is not
        // part of. Everything else sits flat on its surface.
        "shadow-[0_24px_64px_rgb(3_16_33/0.14)]",
        "backdrop:bg-[color-mix(in_oklab,var(--surface-page)_55%,transparent)] backdrop:backdrop-blur-[14px]",
        "transition-opacity duration-300 motion-reduce:transition-none",
        entering ? "opacity-100" : "",
      ].join(" ")}
    >
      {/* On entry everything but the mark steps back: the fill is the one
          thing answering, so it is the one thing at full strength. No spinner
          on the button as well; two signs of progress compete, and the mark
          is the one worth watching (Alejandro, November 2026). */}
      <div className={`flex flex-col gap-5 [&>*]:transition-opacity [&>*]:duration-300 ${entering ? "[&>*:not(:first-child)]:opacity-40" : ""}`}>
        <GateMark level={level} draining={phase === "wrong"} entering={entering} />

        <div>
          <h2 id="gate-title" className="font-display text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em] text-text-primary">
            Welcome in.
          </h2>
          {/* Works for however the password was given: in person, in an
              email, on a call (Alejandro, November 2026). */}
          <p id="gate-note" className="mt-2.5 text-base leading-[1.65] text-text-secondary text-pretty">
            Thanks for stopping by. While the work is in progress, the portfolio is open by invitation. Enter the
            password I shared with you.
          </p>
        </div>

        <form onSubmit={submit} aria-busy={phase === "checking" || entering} className="mt-1 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="gate-password" className="font-label text-xs uppercase tracking-[0.11em] text-text-tertiary">
              Password
            </label>
            <input
              ref={input}
              id="gate-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={value}
              aria-invalid={phase === "wrong" ? true : undefined}
              onAnimationEnd={() => setShaking(false)}
              onChange={(e) => {
                setValue(e.target.value);
                if (phase === "wrong") setPhase("idle");
              }}
              className={`h-11 w-full rounded-sm border border-border-default bg-surface-page px-3.5 text-base text-text-primary outline-none transition-[border-color,box-shadow] duration-[160ms] focus:border-interactive focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--interactive-default)_25%,transparent)] ${
                shaking ? "[animation:gate-shake_.36s] motion-reduce:[animation:none]" : ""
              }`}
            />
          </div>
          <Button type="submit" variant="primary" iconAfter={<ArrowRight />} className="w-full sm:w-full">
            Enter the site
          </Button>
        </form>

        <p className="text-sm text-text-tertiary">
          No password?{" "}
          <a href={contactHref} className="text-text-accent underline decoration-1 underline-offset-[0.3em] hover:decoration-2">
            Ask me for one
          </a>
        </p>
      </div>

      <Toast open={toast}>That’s not quite it. Try again.</Toast>
    </dialog>
  );
}
