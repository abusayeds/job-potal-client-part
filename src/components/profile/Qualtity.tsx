import React from 'react';

const Qualtity = ({item} : any) => {
    const detailsDatas = [
        { value: item.reputation, },
        { value: item.location, },
        { value: item.parking, },
        { value: item.atmosphere,  },
        { value: item.availability, },
        { value: item.cleanliness, },
        { value: item.equipment,  },
        { value: item.gracePeriod,  },
        { value: item.validateParking,  },
        { value: item.socks,  },
    ];
    const totalValue = detailsDatas.reduce((accumulator, currentItem) => {
        let valueToAdd = 0;
        
        if (typeof currentItem.value === "number") {
          valueToAdd = currentItem.value;
        } else if (typeof currentItem.value === "boolean") {
          valueToAdd = currentItem.value ? 1 : 0; // Convert boolean to 1 or 0
        }
        
        return accumulator + valueToAdd / 10;
      }, 0);
    return (
        <div className="h-16 w-20 flex justify-center items-center text-xl bg-[#FFAE00] font-semibold">
       {totalValue.toFixed(1)}
      </div>
    );
}

export default Qualtity;
