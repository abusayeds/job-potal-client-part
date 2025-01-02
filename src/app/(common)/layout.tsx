import Footer from "@/components/Shared/Footer";
import Nav from "@/components/Shared/Nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "R8 My Trainers | Authentication",
  description:
    "Discover and rate the latest trainers on the market! Share your thoughts, read reviews, and find the perfect pair for your style and comfort with R8 My Trainers.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav />
      <div className="min-h-[calc(100vh-80px)]">{children}</div>
      <Footer/>
    </div>
  );
}
