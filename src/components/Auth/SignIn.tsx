"use client"

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authPayloads } from "@/constants/others.constants";
import Cookies from "js-cookie";
import { fetchPostApi } from "@/lib/fetchApi";
import { useRouter } from "next/navigation";
import { useMyContext } from "../MyContext";
const formSchema = z.object({
  email: z
    .string({ message: "Email is required!." })
    .email({ message: "Invalid email!." }),
  password: z.string({ message: "Password is required!." }).min(6, {
    message: "Strong password is required!.",
  }),
});

type TAuthFormProps = {
  setModalTitleData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      forword: string;
      redirect?: string;
      des: string;
      back?: boolean;
    } | null>
  >;
  modalTitleData: {
    title: string;
    forword: string;
    redirect?: string;
    des: string;
    back?: boolean;
  };
  closeModal: () => void
};

export function SignIn({ modalTitleData, setModalTitleData, closeModal }: TAuthFormProps) {
  const { setReportModelIsOpen,
    getUser } = useMyContext()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {

    setError(null);
    try {
      const response = await fetchPostApi(
        "user/login",
        values
      );
      if (response?.data?.token) {
        Cookies.set("authToken", response?.data?.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
          path: "/",
        });

        if (modalTitleData?.redirect === "flagopen") {
          setReportModelIsOpen(true);
        } else if (modalTitleData?.redirect) {
          router.push(modalTitleData.redirect);
        }
        closeModal()
        getUser()
      } else {
        setError(response?.message);
      }
    } catch (err: any) {
      console.log(error);
      setError(err.message || "An unexpected error occurred.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-md mx-auto py-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">Your Email</FormLabel>
              <FormControl>
                <Input
                  className="h-12 rounded-xl"
                  placeholder="john.doe@gmail.com"
                  {...field}
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
              <FormLabel className="text-sm text-black">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="h-12 rounded-xl"
                  placeholder="**********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => setModalTitleData(authPayloads["Forget Password"])}
            size={"sm"}
            variant="link"
            className="px-0 py-0 -mt-4"
          >
            Forget your password
          </Button>
        </div>
        <div className="pb-4">
          <Button
            size={"lg"}
            className="w-full rounded-full py-6 uppercase"
            variant={"default"}
            type="submit"

          >
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
}

