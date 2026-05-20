"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  UserRound
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const quickAccounts = [
  { label: "王长生", account: "wangchangsheng", password: "changsheng" },
  { label: "试炼弟子", account: "demo", password: "demo123" }
];

type LoginMode = "quick" | "password";

export default function LoginPage() {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState<LoginMode>("quick");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const canSubmit = useMemo(
    () =>
      loginMode === "password" &&
      account.trim().length > 0 &&
      password.length >= 6 &&
      !isSubmitting,
    [account, password, isSubmitting, loginMode]
  );

  async function enterGame(nextAccount: string, nextPassword: string) {
    setIsSubmitting(true);

    try {
      const result = await apiClient.login(nextAccount, nextPassword, remember);
      router.push(result.hasCharacter ? "/" : "/create-character");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "登录失败，请稍后再试。");
      setIsSubmitting(false);
    }
  }

  function quickLogin(nextAccount: string, nextPassword: string) {
    if (isSubmitting) {
      return;
    }

    setError("");
    setNotice("");
    setAccount(nextAccount);
    setPassword(nextPassword);
    void enterGame(nextAccount, nextPassword);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!account.trim()) {
      setError("请输入道号或账号。");
      return;
    }

    if (password.length < 6) {
      setError("密码至少需要 6 位。");
      return;
    }

    void enterGame(account.trim(), password);
  }

  function showMockNotice(text: string) {
    setError("");
    setNotice(text);
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
            <div className="grid grid-cols-2 gap-1 rounded-md bg-rice-100/88 p-1">
              {[
                { key: "quick", label: "快速登入" },
                { key: "password", label: "账号密码" }
              ].map((item) => {
                const active = loginMode === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    className={cn(
                      "h-9 rounded-md text-sm font-medium transition",
                      active
                        ? "bg-jade-700 text-white shadow-sm"
                        : "text-stone-600 hover:bg-white hover:text-ink-900"
                    )}
                    onClick={() => {
                      setLoginMode(item.key as LoginMode);
                      setError("");
                      setNotice("");
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {loginMode === "quick" ? (
              <div className="mt-4 grid gap-2">
                {quickAccounts.map((item) => (
                  <button
                    key={item.account}
                    type="button"
                    className="flex min-h-14 items-center justify-between gap-3 rounded-md border border-stone-200 bg-rice-50/86 px-3 py-2 text-left transition hover:border-jade-500 hover:bg-white disabled:cursor-not-allowed disabled:opacity-55"
                    onClick={() => quickLogin(item.account, item.password)}
                    disabled={isSubmitting}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink-900">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-stone-500">
                        {item.account}
                      </span>
                    </span>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-jade-700" />
                    ) : (
                      <ArrowRight className="h-4 w-4 shrink-0 text-jade-700" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="mt-4 space-y-3">
                  <label className="block">
                    <span className="text-xs font-medium text-stone-600">道号 / 账号</span>
                    <span className="mt-1.5 flex h-10 items-center gap-2 rounded-md border border-stone-200 bg-white/86 px-3 transition focus-within:border-jade-600 focus-within:ring-2 focus-within:ring-jade-500/15">
                      <UserRound className="h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
                      <input
                        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink-900 outline-none placeholder:text-stone-400"
                        autoComplete="username"
                        value={account}
                        onChange={(event) => setAccount(event.target.value)}
                        placeholder="请输入账号"
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-stone-600">密码</span>
                    <span className="mt-1.5 flex h-10 items-center gap-2 rounded-md border border-stone-200 bg-white/86 px-3 transition focus-within:border-jade-600 focus-within:ring-2 focus-within:ring-jade-500/15">
                      <LockKeyhole className="h-4 w-4 shrink-0 text-stone-400" aria-hidden="true" />
                      <input
                        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink-900 outline-none placeholder:text-stone-400"
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="至少 6 位"
                      />
                      <button
                        type="button"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-stone-500 transition hover:bg-ink-800/5 hover:text-ink-900"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? "隐藏密码" : "显示密码"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  icon={isSubmitting ? Loader2 : ArrowRight}
                  disabled={!canSubmit}
                  className={cn("mt-3 w-full", isSubmitting && "[&>svg]:animate-spin")}
                >
                  {isSubmitting ? "正在入坊" : "进入坊市"}
                </Button>
              </>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-stone-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-4 w-4 rounded border-stone-300 accent-jade-700"
                />
                记住登录
              </label>
              <button
                type="button"
                className="text-xs font-medium text-jade-700 transition hover:text-jade-900"
                onClick={() => showMockNotice("找回密码流程会在接入账号系统后开放。")}
              >
                忘记密码
              </button>
            </div>

            <div
              className={cn(
                "mt-3 min-h-9 rounded-md border px-3 py-2 text-xs leading-5",
                error
                  ? "border-cinnabar-100 bg-cinnabar-100/55 text-cinnabar-700"
                  : notice
                    ? "border-jade-100 bg-jade-50 text-jade-700"
                    : "border-transparent bg-transparent text-transparent"
              )}
              aria-live="polite"
            >
              {error || notice || "状态占位"}
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}
