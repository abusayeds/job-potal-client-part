/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchGetApi, fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";
import { useMyContext } from "../MyContext";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required!.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required!.",
  }),

});


export function ProfileInfoForm() {
  const {refetchUser} = useMyContext()
  const [userInfo, setUser] = useState<any>()
  const [isEdit, setIsEdit] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetchPostApi(`user/update`, values);
    if (response?.success === true) {
      await Swal.fire({
        icon: "success",
        title: "Successfully Submitted",
        text: "profile updated successfully !",
        confirmButtonText: "OK",
      });
      refetchUser()
    } else {
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          response?.message ||
          " Please try again later.",
        confirmButtonText: "OK",
      });
      Swal.close();
    }
    setIsEdit(false);
  }
  const fetchUser = async () => {
    const users = await fetchGetApi(`user/my-profile`);
    return users;
  }
  const getUserData = async () => {
    const data = await fetchUser();
    setUser(data?.data);

  };
  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {

    form.reset({ firstName: userInfo?.fristName, lastName: userInfo?.lastName })
  }, [userInfo])
  return (
    <div className="max-w-3xl mx-auto">
      <div className="pb-4 flex justify-end">
        <Button
          onClick={() => setIsEdit(true)}
          size={"lg"}
          className={cn(
            "min-w-40 w-fit rounded-full py-6 uppercase invisible",
            {
              visible: !isEdit,
            }
          )}
          variant={"default"}
        >
          Edit Profile <Pencil />
          {/* <Link href={"#profile-edit"}>
            </Link> */}
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="space-y-5 w-full max-w-lg mx-auto bg-[#F7F7F7] p-4 md:p-8 border-4 border-[#AFACFB] rounded-xl">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-black">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEdit}
                      className="h-12 rounded-xl bg-white"
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-black">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEdit}
                      className="h-12 rounded-xl bg-white"
                      placeholder="Due"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="studio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-black">
                    Studio Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={!isEdit}
                      className="h-12 rounded-xl bg-white"
                      placeholder="abc studio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div className="py-10 flex justify-center">
            <Button
              size={"lg"}
              className={cn("w-fit rounded-full py-6 uppercase", {
                invisible: !isEdit,
              })}
              variant={"default"}
              type="submit"
            >
              Save change
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
