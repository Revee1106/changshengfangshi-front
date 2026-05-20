"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export default function CreateCharacterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trimmedName = name.trim();
  const canSubmit = useMemo(
    () => trimmedName.length >= 2 && trimmedName.length <= 8 && !isSubmitting,
    [isSubmitting, trimmedName]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (trimmedName.length < 2) {
      setError("姓名至少需要 2 个字。");
      return;
    }

    if (trimmedName.length > 8) {
      setError("姓名最多 8 个字。");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.createCharacter(trimmedName);
      router.push("/");
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "创建角色失败，请稍后再试。");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-ink-900 text-ink-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login-bg.webp')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-rice-50/42 backdrop-blur-[1px]" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,250,244,0.82)_0%,rgba(251,250,244,0.58)_42%,rgba(251,250,244,0.26)_100%)]"
        aria-hidden="true"
      />

      <section className="relative z-10 flex h-dvh items-center justify-center px-4 py-4 md:px-8">
        <div className="w-full max-w-[420px]">
          <div className="mb-4 text-center sm:mb-5 [@media(max-height:640px)]:mb-3">
            <div className="mx-auto mb-2 h-px w-36 bg-gradient-to-r from-transparent via-jade-700/70 to-transparent" />
            <h1 className="font-serif text-[2.65rem] font-semibold leading-none tracking-[0.22em] text-ink-900 drop-shadow-[0_2px_12px_rgba(238,248,243,0.72)] sm:text-5xl [@media(max-height:640px)]:text-4xl">
              长生坊市
            </h1>
            <div className="mx-auto mt-2 h-px w-52 bg-gradient-to-r from-transparent via-amberInk-500/75 to-transparent" />
            <div className="mx-auto mt-2 flex w-28 items-center justify-center gap-2 text-jade-700/85">
              <span className="h-px flex-1 bg-current" />
              <span className="h-1.5 w-1.5 rotate-45 border border-current bg-rice-50/70" />
              <span className="h-px flex-1 bg-current" />
            </div>
          </div>

          <form
            className="w-full rounded-lg border border-white/78 bg-white/76 p-3 shadow-[0_24px_80px_rgba(21,42,40,0.18)] backdrop-blur-md sm:p-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <p className="text-xs font-medium text-jade-700">创建角色</p>
              <h2 className="mt-1 text-xl font-semibold text-ink-900">取一名号</h2>
            </div>

            <label className="block">
              <span className="text-xs font-medium text-stone-600">姓名</span>
              <span className="mt-1.5 flex h-10 items-center gap-2 rounded-md border border-stone-200 bg-white/86 px-3 transition focus-within:border-jade-600 focus-within:ring-2 focus-within:ring-jade-500/15">
                <UserRound className="h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink-900 outline-none placeholder:text-stone-400"
                  autoComplete="off"
                  maxLength={8}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="例如：王长生"
                />
              </span>
            </label>

            <div
              className={cn(
                "mt-3 min-h-9 rounded-md border px-3 py-2 text-xs leading-5",
                error
                  ? "border-cinnabar-100 bg-cinnabar-100/55 text-cinnabar-700"
                  : "border-transparent bg-transparent text-stone-500"
              )}
              aria-live="polite"
            >
              {error || "当前仅需填写姓名，其他设定后续开放。"}
            </div>

            <Button
              type="submit"
              variant="primary"
              icon={isSubmitting ? Loader2 : ArrowRight}
              disabled={!canSubmit}
              className={cn("mt-3 w-full", isSubmitting && "[&>svg]:animate-spin")}
            >
              {isSubmitting ? "正在创建" : "创建角色"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
