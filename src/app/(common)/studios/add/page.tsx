"use client";
import React from "react";
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
import Container from "@/components/Container";
import WebsiteBranding from "@/components/SubComponent/WebsiteBranding";
import { fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  studioName: z.string().nonempty({ message: "Company name is required!" }).trim(),
  neighborhood: z
    .string()
    .nonempty({ message: "Neighborhood is required!" })
    .trim(),
  studioCity: z.string().nonempty({ message: "City name is required!" }).trim(),

});

const Page = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studioName: "",
      neighborhood: "",
      studioCity: "",

    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetchPostApi(`studio/create-studio`, values);
      if (response?.success === true) {
        await Swal.fire({
          icon: "success",
          title: "Trainer Added",
          text: "The Studio has been successfully added. Thank you!",
          confirmButtonText: "OK",
        });
        form.reset();
        router.push(`/studios/${response?.data?._id}`)
      } else {
        await Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            response?.message ||
            "There was an issue submitting the studio. Please try again later.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <Container className="space-y-5 lg:space-y-6 mb-10 md:mb-20">
      <WebsiteBranding className="pt-3" />
      <hr className="bg-[#AFACFB] h-0.5" />
      <div className="grid grid-cols-1 md:grid-cols-12 lg:gap-12 md:px-4 lg:16 pt-4">
        <div className="col-span-9">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-full max-w-3xl mx-auto p-4 sm:p-8 lg:p-16 border-2 border-[#AFACFB] rounded-lg"
            >
              <h1 className="text-center text-2xl md:text-3xl font-medium py-4">
                Add a Studio
              </h1>
              <FormField
                control={form.control}
                name="studioName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-black">
                      Studio Company
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl"
                        placeholder="Solidcore"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-black">
                      Studio Neighborhood
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl"
                        placeholder="Hollywood"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studioCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-black">
                      Studio City
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-xl"
                        placeholder="Los Angeles, CA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
             
              <div className="pb-4">
                <Button
                  size={"lg"}
                  className="w-full max-w-md rounded-full py-6 uppercase"
                  variant={"default"}
                  type="submit"
                >
                  Add a Studio
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-3 h-full hidden md:flex flex-col justify-around gap-5">
          <div className="bg-[#F7F7F7] rounded-sm h-52">
            <h1 className="bg-white w-full text-center">Advertisement</h1>
          </div>
          <div className="bg-[#F7F7F7] rounded-sm h-52">
            <h1 className="bg-white w-full text-center">Advertisement</h1>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
