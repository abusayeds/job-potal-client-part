/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Container from "@/components/Container";
// import WebsiteBranding from "@/components/SubComponent/WebsiteBranding";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Link from "next/link";
// import { Checkbox } from "@/components/ui/checkbox";
// import { fetchGetApi, fetchPostApi } from "@/lib/fetchApi";
// import Swal from "sweetalert2";

// const trainTypes = ["Heated Yoga", "Pilates", "Lagree", "Boxing", "HIIT", "Others"];;
// const formSchema = z.object({
//   firstName: z.string().nonempty({ message: "First name is required!" }).trim(),
//   lastName: z.string().nonempty({ message: "Last name is required!" }).trim(),
//   studio: z.string().nonempty({ message: "Studio name is required!" }).trim(),
//   trainType: z.enum([...(trainTypes as [string, ...string[]])], {
//     required_error: "Training type is required!",
//   }),
//   terms: z.boolean(),
// });

// const Page = () => {
//   const searchStudioDropdown = async (searchValue: string) => {
//     const queryParams = [
//       { name: "searchTerm", value: searchValue },
//       { name: "ffields", value: "firstName lastName " },
//     ];
//     const endpoint = "trainer/trainers";
//     const studioResponse = await fetchGetApi(endpoint, queryParams,)
//     const studios = studioResponse?.data?.trainers;
//     console.log(studios);
//   }

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       studio: "",
//       trainType: "",
//       terms: false,
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     const response = await fetchPostApi(`trainer/create-trainer`, values);
//     if (response?.success === true) {
//       await Swal.fire({
//         icon: "success",
//         title: "Report Submitted",
//         text: "Your Review has been successfully submitted. Thank you!",
//         confirmButtonText: "OK",
//       });
//     } else {
//       await Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text:
//           response?.message ||
//           "There was an issue submitting your Review. Please try again later.",
//         confirmButtonText: "OK",
//       });
//       Swal.close();
//     }
//   }
//   return (
//     <Container className="space-y-5 lg:space-y-6 mb-10 md:mb-20">
//       <WebsiteBranding className="pt-3" />
//       <hr className="bg-[#AFACFB] h-0.5" />
//       <div className="grid grid-cols-1 md:grid-cols-12 lg:gap-12 md:px-4 lg:16 pt-4">
//         <div className="col-span-9">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-5 w-full max-w-3xl mx-auto p-4 sm:p-8 lg:p-16 border-2 border-[#AFACFB] rounded-lg"
//             >
//               <h1 className="text-center text-2xl md:text-3xl font-medium py-4">
//                 Add a Trainer
//               </h1>
//               <div className="grid md:grid-cols-2 gap-5">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm text-black">
//                         Trainer First Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="h-12 rounded-xl"
//                           placeholder="John"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm text-black">
//                         Trainer Last Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="h-12 rounded-xl"
//                           placeholder="Due"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <FormField
//                 control={form.control}
//                 name="studio"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm text-black">
//                      Search Studio name
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className="h-12 rounded-xl"
//                         placeholder="Studio Company - studio neighborhood"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage className="" />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="trainType"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm text-black">
//                       Select training Type
//                     </FormLabel>
//                     <FormControl>
//                       <Select
//                         onValueChange={field.onChange}
//                         value={field.value}
//                       >
//                         <SelectTrigger className="w-full h-12 rounded-xl">
//                           <SelectValue placeholder="Training Type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectGroup>
//                             {/* <SelectLabel>Fruits</SelectLabel> */}
//                             {trainTypes.map((item) => (
//                               <SelectItem key={item} value={item}>
//                                 {item}
//                               </SelectItem>
//                             ))}
//                           </SelectGroup>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage className="" />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="terms"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center text-sm gap-1.5">
//                     <FormControl>
//                       <Checkbox className=""
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormLabel className="pb-1.5">I have read & agreed to Shower share</FormLabel>
//                     <Link href="/terms" className="underline text-blue-500 pb-1.5">Terms & Condition</Link>
//                   </FormItem>
//                 )}
//               />
//               <div className="pb-4">
//                 <Button
//                   size={"lg"}
//                   className="w-full max-w-md rounded-full py-6 uppercase"
//                   variant={"default"}
//                   type="submit"
//                 >
//                   Add a trainer
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//         <div className="col-span-3 h-full hidden md:flex flex-col justify-around gap-5">
//           <div className="bg-[#F7F7F7] rounded-sm h-52">
//             <h1 className="bg-white w-full text-center">Advertisement</h1>
//           </div>
//           <div className="bg-[#F7F7F7] rounded-sm h-52">
//             <h1 className="bg-white w-full text-center">Advertisement</h1>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Page;

// "use client";
// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Container from "@/components/Container";
// import WebsiteBranding from "@/components/SubComponent/WebsiteBranding";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { fetchGetApi, fetchPostApi } from "@/lib/fetchApi";
// import Swal from "sweetalert2"; // Make sure to install sweetalert2

// const trainTypes = ["Heated Yoga", "Pilates", "Lagree", "Boxing", "HIIT", "Others"];

// const formSchema = z.object({
//   firstName: z.string().nonempty({ message: "First name is required!" }).trim(),
//   lastName: z.string().nonempty({ message: "Last name is required!" }).trim(),
//   studioId: z.string().nonempty({ message: "Studio is required!" }).trim(),
//   trainingType: z.enum([...(trainTypes as [string, ...string[]])], {
//     required_error: "Training type is required!",
//   }),
// });

// const Page = () => {
//   const [studios, setStudios] = useState<{ _id: string; studioName: string }[]>([]);
//   const [isStudiosLoading, setIsStudiosLoading] = useState(false);
//   const [studiosError, setStudiosError] = useState<string | null>(null);

//   const searchStudioDropdown = async (searchValue: string) => {
//     if (!searchValue) {
//       setStudios([]);
//       return;
//     }
//     setIsStudiosLoading(true);
//     setStudiosError(null);
//     try {
//       const queryParams = [
//         { name: "searchTerm", value: searchValue },
//         { name: "fields", value: "studioName, _id" },
//       ];
//       const endpoint = "studio/get-studios";
//       const studioResponse = await fetchGetApi(endpoint, queryParams);
//       const fetchedStudios = studioResponse?.data?.studios;
//       if (fetchedStudios && Array.isArray(fetchedStudios)) {
//         const studioData = fetchedStudios.map((studio: any) => ({
//           _id: studio._id,
//           studioName: studio.studioName,
//         }));
//         setStudios(studioData);
//       }
//     } catch (error) {
//       setStudiosError("Failed to fetch studios. Please try again.");
//       console.error("Error fetching studios:", error);
//     } finally {
//       setIsStudiosLoading(false);
//     }
//   };

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       studioId: "",
//       trainingType: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       const response = await fetchPostApi(`trainer/create-trainer`, values);
//       if (response?.success === true) {
//         await Swal.fire({
//           icon: "success",
//           title: "Trainer Added",
//           text: "The trainer has been successfully added. Thank you!",
//           confirmButtonText: "OK",
//         });
//         form.reset();
//       } else {
//         await Swal.fire({
//           icon: "error",
//           title: "Submission Failed",
//           text:
//             response?.message ||
//             "There was an issue submitting the trainer. Please try again later.",
//           confirmButtonText: "OK",
//         });
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       await Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: "An unexpected error occurred. Please try again later.",
//         confirmButtonText: "OK",
//       });
//     }
//   }

//   return (
//     <Container className="space-y-5 lg:space-y-6 mb-10 md:mb-20">
//       <WebsiteBranding className="pt-3" />
//       <hr className="bg-[#AFACFB] h-0.5" />
//       <div className="grid grid-cols-1 md:grid-cols-12 lg:gap-12 md:px-4 lg:16 pt-4">
//         <div className="col-span-9">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-5 w-full max-w-3xl mx-auto p-4 sm:p-8 lg:p-16 border-2 border-[#AFACFB] rounded-lg"
//             >
//               <h1 className="text-center text-2xl md:text-3xl font-medium py-4">
//                 Add a Trainer
//               </h1>
//               <div className="grid md:grid-cols-2 gap-5">
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm text-black">
//                         Trainer First Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="h-12 rounded-xl"
//                           placeholder="John"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm text-black">
//                         Trainer Last Name
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="h-12 rounded-xl"
//                           placeholder="Doe"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="grid md:grid-cols-2 gap-5">
//                 <FormField
//                   control={form.control}
//                   name="trainingType"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm text-black">
//                         Select Training Type
//                       </FormLabel>
//                       <FormControl>
//                         <Select
//                           onValueChange={(value) => {
//                             field.onChange(value);
//                             searchStudioDropdown(value);
//                             form.setValue("studioId", ""); // Reset studio selection
//                           }}
//                           value={field.value}
//                         >
//                           <SelectTrigger className="w-full h-12 rounded-xl">
//                             <SelectValue placeholder="Training Type" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectGroup>
//                               {trainTypes.map((item) => (
//                                 <SelectItem key={item} value={item}>
//                                   {item}
//                                 </SelectItem>
//                               ))}
//                             </SelectGroup>
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="studioId"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-sm text-black">
//                         Select Studio
//                       </FormLabel>
//                       <FormControl>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value}
//                           disabled={studios.length === 0 || isStudiosLoading}
//                         >
//                           <SelectTrigger className="w-full h-12 rounded-xl">
//                             <SelectValue
//                               placeholder={
//                                 isStudiosLoading
//                                   ? "Loading studios..."
//                                   : "Select Studio"
//                               }
//                             />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectGroup>
//                               {studios.map((studio) => (
//                                 <SelectItem key={studio._id} value={studio._id}>
//                                   {studio.studioName}
//                                 </SelectItem>
//                               ))}
//                             </SelectGroup>
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                       {studiosError && (
//                         <p className="text-red-500 text-sm mt-1">{studiosError}</p>
//                       )}
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="pb-4">
//                 <Button
//                   size={"lg"}
//                   className="w-full max-w-md rounded-full py-6 uppercase"
//                   variant={"default"}
//                   type="submit"
//                 >
//                   Add a Trainer
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//         <div className="col-span-3 h-full hidden md:flex flex-col justify-around gap-5">
//           <div className="bg-[#F7F7F7] rounded-sm h-52">
//             <h1 className="bg-white w-full text-center">Advertisement</h1>
//           </div>
//           <div className="bg-[#F7F7F7] rounded-sm h-52">
//             <h1 className="bg-white w-full text-center">Advertisement</h1>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };
// export default Page;

"use client";
import React, { useState,  useCallback } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { fetchGetApi, fetchPostApi } from "@/lib/fetchApi";
import Swal from "sweetalert2"; 
import debounce from "lodash.debounce"; 
import { useRouter } from "next/navigation";

const trainTypes = ["Heated Yoga", "Pilates", "Lagree", "Boxing", "HILT", "Other"];

const formSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required!" }).trim(),
  lastName: z.string().nonempty({ message: "Last name is required!" }).trim(),
  studioId: z.string().nonempty({ message: "Studio is required!" }).trim(),
  trainingType: z.enum([...(trainTypes as [string, ...string[]])], {
    required_error: "Training type is required!",
  }),
});

const Page = () => {
  const router = useRouter()
  const [studios, setStudios] = useState<{ _id: string; studioName: string }[]>([]);
  const [isStudiosLoading, setIsStudiosLoading] = useState(false);
  const [studiosError, setStudiosError] = useState<string | null>(null);
  const [studioSearchTerm, setStudioSearchTerm] = useState("");
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      searchStudioDropdown(searchValue);
    }, 1000),
    []
  );

  const searchStudioDropdown = async (searchValue: string) => {
    if (!searchValue.trim()) {
      setStudios([]);
      return;
    }
    setIsStudiosLoading(true);
    setStudiosError(null);
    try {
      const queryParams = [
        { name: "searchTerm", value: searchValue },
        { name: "fields", value: "studioName,_id" },
      ];
      const endpoint = "studio/get-studios";
      const studioResponse = await fetchGetApi(endpoint, queryParams);
      const fetchedStudios = studioResponse?.data?.studios;
      if (fetchedStudios && Array.isArray(fetchedStudios)) {
        const studioData = fetchedStudios.map((studio: any) => ({
          _id: studio._id,
          studioName: studio.studioName,
        }));
        setStudios(studioData);
      } else {
        setStudios([]);
      }
    } catch (error) {
      setStudiosError("Failed to fetch studios. Please try again.");
      console.error("Error fetching studios:", error);
    } finally {
      setIsStudiosLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      studioId: "",
      trainingType: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetchPostApi(`trainer/create-trainer`, values);
      if (response?.success === true) {
        await Swal.fire({
          icon: "success",
          title: "Trainer Added",
          text: "The trainer has been successfully added. Thank you!",
          confirmButtonText: "OK",
        });
        form.reset();
        router.push(`/trainers/${response?.data?._id}`)
      } else {
        await Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            response?.message ||
            "There was an issue submitting the trainer. Please try again later.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An unexpected error occurred. Please try again later.",
        confirmButtonText: "OK",
      });
    }
  }

  // Handle changes in the search input
  const handleStudioSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudioSearchTerm(value);
    debouncedSearch(value);
  };

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
                Add a Trainer
              </h1>
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-black">
                        Trainer First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 rounded-xl"
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
                        Trainer Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 rounded-xl"
                          placeholder="Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="trainingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-black">
                        Select Training Type
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full h-12 rounded-xl">
                            <SelectValue placeholder="Training Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {trainTypes.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studioId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-black">
                        Select Studio
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          // Optional: You can handle opening event to trigger an initial search
                        >
                          <SelectTrigger className="w-full h-12 rounded-xl">
                            <SelectValue
                              placeholder={
                                isStudiosLoading
                                  ? "Loading studios..."
                                  : "Search and Select Studio"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {/* Search Input Inside Dropdown */}
                              <div className="px-4 py-2">
                                <Input
                                  placeholder="Type to search..."
                                  value={studioSearchTerm}
                                  onChange={handleStudioSearchChange}
                                  className="h-10 rounded-md"
                                  disabled={isStudiosLoading}
                                />
                              </div>
                              {/* Divider */}
                              {studios.length > 0 && <hr className="my-2" />}
                              {isStudiosLoading && (
                                <div className="px-4 py-2 text-gray-500">
                                  Loading...
                                </div>
                              )}
                              {studiosError && (
                                <div className="px-4 py-2 text-red-500">
                                  {studiosError}
                                </div>
                              )}
                              {studios.length === 0 && !isStudiosLoading && !studiosError && (
                                <div className="px-4 py-2 text-gray-500">
                                  No studios found.
                                </div>
                              )}
                              {studios.map((studio) => (
                                <SelectItem key={studio._id} value={studio._id}>
                                  {studio.studioName}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                      {studiosError && (
                        <p className="text-red-500 text-sm mt-1">{studiosError}</p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="pb-4">
                <Button
                  size={"lg"}
                  className="w-full max-w-md rounded-full py-6 uppercase"
                  variant={"default"}
                  type="submit"
                  disabled={isStudiosLoading}
                >
                  Add a Trainer
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

