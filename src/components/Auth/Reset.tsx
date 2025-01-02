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
import { fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";
const formSchema = z
  .object({
    newPassword: z.string({ message: "Password is required!." }).min(6, {
      message: "Strong password is required!.",
    }),
    confirmPassword: z
      .string({ message: "Confirm password is required!." })
      .min(6, {
        message: "Strong password is required!.",
      }),
  })
  .refine(
    (data) => {
      if (!data.confirmPassword || !data.newPassword) {
        return true;
      }
      if (data.newPassword === data.confirmPassword) {
        return true;
      } else {
        return false;
      }
    },
    {
      message: "New password and confirm password be same!",
      path: ["confirmPassword"],
    }
  );

export function Reset({setIsAuthOpen, setAuthTitleData } : any ) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetchPostApi("user/reset-password", values);
  
       if (response?.success === true) {
            await Swal.fire({
              icon: "success",
              title: "Registration Completed",
              text: "Changed Password  successfully!",
              confirmButtonText: "OK",
            });
            setIsAuthOpen(false)
            setAuthTitleData(null)
          } else {
            await Swal.fire({
              icon: "error",
              title: "Registration Failed",
              timer: 3000,
              text:
                response?.errorSources[0].message ||
                "There was an issue submitting your registration. Please try again later.",
              confirmButtonText: "OK",
            });
            setIsAuthOpen(false)
            setAuthTitleData(null)
          }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-md mx-auto py-3"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="h-12 rounded-xl"
                  placeholder="**********"
                  {...field}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">
                Confirm Password
              </FormLabel>
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
        <div className="pb-4 pt-1">
          <Button
            size={"lg"}
            className="w-full rounded-full py-6 uppercase"
            variant={"default"}
            type="submit"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
}
