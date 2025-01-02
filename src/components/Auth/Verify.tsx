import { Button } from "@/components/ui/button";
import { authPayloads } from "@/constants/others.constants";
import { fetchPostApi } from "@/lib/fetchApi";
import { useState } from "react";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";

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
  setAuthTitleData  : any
  setIsAuthOpen : any

};

export function Verify({ setModalTitleData , setIsAuthOpen , setAuthTitleData   }: TAuthFormProps) {
  const [otp, setOtp] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetchPostApi("user/verify-forget-otp", {otp : otp});
    if (response?.success === true) {
      setModalTitleData(authPayloads["Reset Password"]);
    } else {
      await Swal.fire({
        icon: "error",
        title: " Varify  Failed",
        timer: 5000,
        text:
          response?.errorSources[0].message ||
          "There was an issue varify your code . Please try again later.",
        confirmButtonText: "OK",
      });
      setIsAuthOpen(false)
      setAuthTitleData(null)
    }
  }
   
    

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-md mx-auto py-4">
      <div className=" text-2xl">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            height: "60px",
            width: "60px",
            margin: "auto",
            background: "#ECE8F1",
            border: "1px solid #69458B",
            marginRight: "auto",
            outline: "none",
            borderRadius: "8px",
            color: "black",
          }}
          renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <p className="text-sm text-center">
        Didn’t receive the code? {" "}
        <Button type="button" size={"sm"} variant="link" className="text-sm px-0">
          Resend
        </Button>{" "}
      </p>
      <div className="pb-4 pt-1">
        <Button
          size={"lg"}
          className="w-full rounded-full py-6 uppercase"
          variant={"default"}
          type="submit"
        >
          Verify
        </Button>
      </div>
    </form>
  );
}
