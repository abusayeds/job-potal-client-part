import React from 'react';
import danger from "@/assets/svgs/danger.svg";

import award from "@/assets/svgs/award.svg";
import check from "@/assets/svgs/check.svg";
import avaibility from "@/assets/svgs/availity.svg";
import earth from "@/assets/svgs/earth.svg";
import location from "@/assets/svgs/location.svg";
import parking from "@/assets/svgs/parking.svg";
import avail from "@/assets/svgs/avail.svg";
import clean from "@/assets/svgs/clean.svg";
import equip from "@/assets/svgs/equip.svg";
import grace from "@/assets/svgs/grace.svg";
import Image from "next/image";
const UserRating = ({item} : any) => {
  
    
    const detailsDatas = [
        { value: item.reputation, icon: award, label: "Reputation" },
        { value: item.location, icon: location, label: "Location" },
        { value: item.parking, icon: parking, label: "Parking" },
        { value: item.atmosphere, icon: earth, label: "Atmosphere" },
        { value: item.availability, icon:  avaibility, label: "Availability" },
        { value: item.cleanliness, icon: clean, label: "Cleanliness" },
        { value: item.equipment, icon: equip, label: "Equipment" },
        { value: item.gracePeriod, icon: grace, label: "Grace Period" },
        { value: item.validateParking, icon: check, label: "Validated Parking" },
        { value: item.socks, icon: award, label: "Socks required" },
    ];
   
      

    return (
        <div className="w-full grid grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-1 space-y-4">
                {detailsDatas.slice(0, 4).map((item) => (
                    <div
                        key={item.label}
                        className="flex justify-between items-center gap-3"
                    >
                        <div className="flex justify-start items-center gap-4">
                            <Image src={item.icon} alt="" className="h-6 w-6" />
                            <span className="text-base">{item.label}</span>
                        </div>
                        <div className="h-6 w-9 flex justify-center items-center bg-[#FFAE00] font-semibold">
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-span-3 md:col-span-1 space-y-4">
                {detailsDatas.slice(4, 8).map((item) => (
                    <div
                        key={item.label}
                        className="flex justify-between items-center gap-3"
                    >
                        <div className="flex justify-start items-center gap-4">
                            <Image src={item.icon} alt="" className="h-6 w-6" />
                            <span className="text-base">{item.label}</span>
                        </div>
                        <div className="h-6 w-9 flex justify-center items-center bg-[#FFAE00] font-semibold">
                        {item.value}
                        </div>
                    </div>
                ))}
            </div>
            <div className="col-span-3 md:col-span-1 space-y-4">
                <div className="flex justify-between items-center gap-3">
                    <span className="text-base">{detailsDatas[8].label}</span>
                    <Image
                        src={detailsDatas[8].value ? check : danger}
                        alt=""
                        className="h-7 w-7 rounded-full mx-1"
                    />
                </div>
                <div className="flex justify-between items-center gap-3">
                    <span className="text-base">{detailsDatas[9].label}</span>
                    <Image
                        src={detailsDatas[9].value ? check : danger}
                        alt=""
                        className="h-7 w-7 rounded-full mx-1"
                    />
                </div>
            </div>
            <div className="col-span-3"> {item?.writeReview}</div>
        </div>
    );
}

export default UserRating;
