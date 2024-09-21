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
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignInForm() {
  // const router = useRouter();

  // const [error, setError] = React.useState<string | null>(null);

  const signInFormSchema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (data: SignInFormType) => {
    console.log(data);

    // const supabase = createClientComponentClient();

    // const { error } = await supabase.auth.signInWithPassword({
    //   email: data.email,
    //   password: data.password,
    // });
    // if (error) {
    //   setError(error.message);
    // }
    // if (!error) {
    //   router.push("/");
    // }
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
