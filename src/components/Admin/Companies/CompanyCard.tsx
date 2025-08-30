import { imageUrl } from "@/config";
import { TUniObject } from "@/types";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { BiCalendar, BiMapPin } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineVerified } from "react-icons/md";

const CompanyCard = ({ data }: { data: TUniObject }) => {
  // console.log(data);
  return (
    <Link
      href={`/admin/companies/${
        data.status === "verified" ? "verified" : "requested"
      }/${data._id}`}
    >
      <div className="w-full bg-white rounded-lg shadow-sm hover:shadow-lg border hover:border-primary border-gray-200 p-6 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-20 rounded-lg overflow-hidden border border-gray-50 drop-shadow-sm">
            <Image
              // src={"/test/employer.svg"}
              src={imageUrl + data?.logo}
              alt="logo"
              width={500}
              height={500}
            />
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {data.fullName}
            </h2>
            <p className="text-gray-600 mb-3">Mail: {data?.email} </p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <BiMapPin className="w-4 h-4 shrink-0" />
                <span>{data?.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <BiCalendar className="w-4 h-4 shrink-0" />
                <span>
                  {data?.foundIn
                    ? new Date(data?.foundIn).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {data?.status === "verified" ? (
          <div className="flex items-center gap-1.5">
            <span className="text-green-500 font-medium">Verified</span>{" "}
            <MdOutlineVerified size={19} className="text-green-500 mb-0.5" />
          </div>
        ) : (
          <Button
            size="large"
            type="text"
            style={{ backgroundColor: "white" }}
            className="flex items-center gap-2"
          >
            View Info <BsArrowRight size={16} />
          </Button>
        )}
      </div>
    </Link>
  );
};

export default CompanyCard;
