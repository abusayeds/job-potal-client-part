import React from "react";
import Container from "../Container";
import { Button } from "antd";
import { HiMiniArrowRight } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

const BecomeUser = () => {
  return (
    <Container mClassName="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
      <div className="w-full p-8 relative rounded-xl overflow-hidden">
        <Image
          src="/images/bgs/become-candidate.svg"
          alt="header"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <div className="max-w-md space-y-3">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-brand">
            {" "}
            Become a Job Seeker
          </h3>
          <p className="text-sm text-brand/60">
            Every application is a step closer to the ‘Yes’ that changes
            everything. Keep showing up.
          </p>
          <Link href={"/sign-up?type=candidate"}>
            <Button size="large" type="text" style={{ background: "white" }}>
              Register Now <HiMiniArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full p-8 relative rounded-xl overflow-hidden">
        <Image
          src="/images/bgs/become-employee.svg"
          alt="header"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <div className="max-w-md space-y-3 text-white">
          <h3 className="text-2xl md:text-3xl lg:text-4xl">
            Become an Employer
          </h3>
          <p className="text-sm text-white/70">
            We don’t just fill roles; we create careers and build futures. Join
            a team that invests in your growth.
          </p>
          <Link href={"/sign-up?type=employer"}>
            <Button size="large" type="text" style={{ background: "white" }}>
              Register Now <HiMiniArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default BecomeUser;
