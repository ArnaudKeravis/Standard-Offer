"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial form primitives for Persona Studio create/edit surfaces. They
 * consume the studio CSS tokens, keep accessible label/field associations and
 * visible focus states, and are deliberately quiet (no dashboard chrome).
 */

const baseField =
  "w-full rounded-xl border border-[var(--studio-line)] bg-[var(--studio-paper)] px-3 py-2 text-sm text-[var(--studio-ink)] outline-none transition-colors placeholder:text-[var(--studio-muted)] focus-visible:border-[var(--studio-accent)] focus-visible:ring-2 focus-visible:ring-[var(--studio-accent)]/30 disabled:opacity-60";

export function Field({
  label,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: (props: { id: string }) => React.ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-[var(--studio-muted)]"
      >
        {label}
        {required && <span className="ml-0.5 text-[var(--studio-accent)]">*</span>}
      </label>
      {children({ id })}
      {hint && <p className="text-xs text-[var(--studio-muted)]">{hint}</p>}
    </div>
  );
}

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ className, ...props }, ref) {
  return <input ref={ref} className={cn(baseField, className)} {...props} />;
});

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(baseField, "min-h-20 resize-y", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(baseField, "pr-8", className)} {...props}>
      {children}
    </select>
  );
});

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}) {
  const styles: Record<string, string> = {
    primary:
      "bg-[var(--studio-ink)] text-[var(--studio-paper)] hover:opacity-90",
    secondary:
      "border border-[var(--studio-line)] bg-[var(--studio-paper)] text-[var(--studio-ink)] hover:border-[var(--studio-accent)]",
    ghost:
      "text-[var(--studio-muted)] hover:text-[var(--studio-ink)] hover:bg-[var(--studio-panel)]",
    danger:
      "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
  };
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-accent)] disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
