"use client";

import Label from "@/app/ui/label";
import Input from "@/app/ui/input";
import Button from "@/app/ui/button";
import { useActionState, useState } from "react";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* email input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" nameOfLabel="Email" important />
          <div className="flex flex-col gap-1.5">
            <Input
              id="email"
              name="email"
              required
              placeholder="Type your email"
              type="email"
            />
            {state?.errors?.email?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.email[0]}
              </p>
            )}
            {/* message */}
            {state?.message && (
              <p className="text-[12px] text-red-700">{state?.message}</p>
            )}
          </div>
        </div>
        {/* password input */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" nameOfLabel="Password" important />
          <div className="flex flex-col gap-1.5">
            <div className="relative">
              <Input
                id="password"
                name="password"
                required
                placeholder="Type your password"
                type={isVisible ? "text" : "password"}
                autoComplete="current-password"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
                type="button"
              >
                {!isVisible ? (
                  <span className="material-symbols-outlined h-fit">
                    visibility_off
                  </span>
                ) : (
                  <span className="material-symbols-outlined h-fit">
                    visibility
                  </span>
                )}
              </button>
            </div>
            {state?.errors?.password?.[0] && (
              <p className="text-[12px] text-red-700">
                {state.errors.password[0]}
              </p>
            )}
          </div>
        </div>
      </div>
      <Button
        nameOfButton="Sign In"
        name="signIn"
        id="signIn"
        uiType="primary"
        size="default"
        type="submit"
        disabled={isPending}
      />
    </form>
  );
}
