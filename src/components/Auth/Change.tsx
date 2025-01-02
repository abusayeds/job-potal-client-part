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
import { fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2";

const formSchema = z
  .object({
    oldPassword: z.string({ message: "Password is required!." }).min(6, {
      message: "Strong password is required!.",
    }),
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

};
export function Change({ setModalTitleData }: TAuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetchPostApi(`user/change-password`, values);
    console.log(response);
    if (response?.success === true) {
      await Swal.fire({
        icon: "success",
        title: "Report Submitted",
        text: "Password Changed successfully",
        confirmButtonText: "OK",
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          response?.message ||
          "There was an issue  Please try again later.",
        confirmButtonText: "OK",
      });
      Swal.close();
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
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm text-black">
                Current Password Password
              </FormLabel>
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
