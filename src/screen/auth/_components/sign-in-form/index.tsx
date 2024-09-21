"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { SignInFormType } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
// import Image from 'next/image'

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

export default function SignInForm() {
  // const { push } = NavRouter();
  const { query, push } = useRouter();

  const callbackUrl: string = Array.isArray(query.callbackUrl)
    ? query.callbackUrl[0]
    : query.callbackUrl || "/";

  const signInFormSchema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "alfian.nuha@gmail.com",
      password: "Makeithappen!123",
    },
  });

  const onSignIn = async (data: SignInFormType) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (res?.error) {
      return toast.error("Email atau password salah");
    } else {
      push(callbackUrl as string);
      // push("/auth/login");
    }
  };

  const onHandleSignInWithGoogle = async () => {
    const res = await signIn("google", {
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      return toast.error("Gagal login dengan google");
    } else {
      push(callbackUrl as string);
      // push("/auth/login");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-gray-400">
          Welcome back! Please login to your account to continue
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSignIn)}
            className="space-y-8 w-96"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="masukkan email disini"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="masukkan password disini"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
            <div className="flex justify-center items-center gap-5">
              <Separator className="w-28" />
              <span>Or</span>
              <Separator className="w-28" />
            </div>
            <Button
              onClick={() => onHandleSignInWithGoogle()}
              className="w-full"
              type="button"
            >
              Login With Google
            </Button>
            <div className="text-xs text-gray-500">
              Create account?{" "}
              <Link className="text-black underline" href="/auth/register">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
