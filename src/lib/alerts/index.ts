import Swal from "sweetalert2";

export type TResError = {
  data?: {
    message?: string;
  };
  message?: string;
  error?: string;
  status?: number;
  statusCode?: number;
};

export type TRejectResObj = {
  title: string;
  description: string;
};

export const successAlert = ({
  message,
  timer,
  title = true,
  confirmButton = false,
  icon = false,
}: {
  message: string;
  timer?: number;
  title?: boolean;
  confirmButton?: boolean;
  icon?: boolean;
}) => {
  Swal.fire({
    icon: icon ? "success" : undefined,
    title: title ? "Success" : undefined,
    text: message,
    showConfirmButton: confirmButton,
    confirmButtonText: "Ok",
    timer: timer,
  });
};

export const errorAlert = ({
  icon = undefined,
  error,
  title,
}: {
  icon?: "error" | "warning" | "info" | undefined;
  error: TResError;
  title?: string;
}) => {
  Swal.fire({
    icon: icon,
    title: title || "Failed!",
    confirmButtonText: "Ok",
    text:
      error?.data?.message ||
      error?.message ||
      //  error?.error?.slice(10) ||
      "Something went wrong. Please try again later.",
  });
  // console.log(error)
};
export const requiredAlert = ({
  icon = undefined,
  title,
  text,
  pathName
}: {
  icon?: "error" | "warning" | "info" | undefined;
  title?: string;
  text?: string;
  pathName?:string;
}) => {
  Swal.fire({
    icon: icon,
    title: title || "Attention Required!",
    text: text || "To proceed with the registration, please Sign-In or Create an account beforehand. This step is essential to complete your registration process.",
    showDenyButton: false,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Let's Go ➜",
    cancelButtonText: "Not Now",
    // denyButtonText: `Not Now`,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `/sign-in${pathName ? `?redirect=${encodeURIComponent(pathName)}` : ""}`;
      // router.push(`/sign-in?redirect=${encodeURIComponent(pathName)}`);
    } else if (result.isDenied) {
      // Do nothing
    }
  });
  // console.log(error)
};


