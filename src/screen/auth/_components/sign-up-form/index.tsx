import React from "react";
import { useForm } from "react-hook-form";
import { SignUpFormType } from "@/types";
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
import { z } from "zod";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import authServices from "@/services/auth";

export default function SignUpForm() {
  const router = useRouter();

  const signUpFormSchema = z
    .object({
      email: z.string().email("Email is invalid"),
      fullName: z
        .string()
        .min(5, "Fullname must be at least 5 characters")
        .max(50, "Fullname must be at most 50 characters"),
      organization_name: z
        .string()
        .min(5, "Organize name must be at least 5 characters")
        .max(50, "Organize name must be at most 50 characters"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/, {
          message:
            "Password harus mengandung huruf besar dan kecil, angka, simbol",
        }),
      confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/, {
          message:
            "Password harus mengandung huruf besar dan kecil, angka, simbol",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Konfirmasi password tidak sama",
      path: ["confirmPassword"],
    });
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "alfian.nuha@gmail.com",
      fullName: "Alfian An Naufal Nuha",
      organization_name: "Alfian's Organization",
      password: "Makeithappen!123",
      confirmPassword: "Makeithappen!123", // Update the default value to an empty string
    },
  });

  const onSignUp = async (data: SignUpFormType) => {
    const res = await authServices.registerAccount(data);

    if (res.status == 200) {
      toast.success("Registration is successfully");
      router.push("/auth/login");
    } else {
      toast.error("Failed to register");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-400">
          Welcome! Please signup to our webiste to create event
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSignUp)}
            className="space-y-8 w-96"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="masukkan nama lengkap disini"
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
              name="organization_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Organisasi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="masukkan Nama Organisasi disini"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="masukkan konfirmasi password disini"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <div className="text-xs text-gray-500">
              Already have an account?{" "}
              <Link className="text-black underline" href="/auth/login">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
