"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { FC } from 'react';

interface TrainingTypeSelectorProps {
    currentValue: string;
    trainTypes: string[];
}

const TrainingTypeSelector: FC<TrainingTypeSelectorProps> = ({ currentValue, trainTypes }) => {
    const router = useRouter();
    const handleChange = (value: string) => {
        const encodedSearch = encodeURIComponent(currentValue);
        const encodedTrainingType = encodeURIComponent(value);
        router.push(`/studios?search=${encodedSearch}&trainingType=${encodedTrainingType}`);
    };
    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-full max-w-80 h-12 rounded-xl">
                <SelectValue placeholder="Select Training Type" />
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
    );
};

export default TrainingTypeSelector;
