import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import notFound from "@/assets/images/not-found.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <Container>
      <div className="text-center space-y-3 p-5">
        <Image src={notFound} alt="" className="mx-auto" />
        <h1>Something is wrong!!</h1>
        <Button
          asChild
          className="rounded-full"
          variant={"default"}
          size={"lg"}
        >
          <Link href={"/"}> Please try Aganin</Link>
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
