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
import Cookies from "js-cookie";
const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required!." })
    .email({ message: "Invalid email!." }),
});

export type TAuthFormProps = {
  setModalTitleData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      forword: string;
      redirect?: string;
      des: string;
      back?: boolean;
    } | null>
  >;
  setIsAuthOpen?: (isOpen: boolean) => void;
};

export function Forgot({ setModalTitleData, setIsAuthOpen, setAuthTitleData }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetchPostApi("user/forget-password", values);
    
   
      if (response?.data?.token) {
        Cookies.set("authToken", response?.data?.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
          path: "/",
        })
      
        setModalTitleData(authPayloads["Verification Code"])
      
    } else {
      await Swal.fire({
        icon: "error",
        title: " Varify  Failed",
        timer: 3000,
        text:
          response?.errorSources[0].message ||
          "There was an issue varify your email . Please try again later.",
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
                  placeholder="john.due@gmail.com"
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
            Get Verification Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
