"use client"
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useMyContext } from '../MyContext';
import { authPayloads } from '@/constants/others.constants';
import { getDecodedToken } from '@/utils/decodeToken';
import { MoveRight } from 'lucide-react';

const StudioRatingButton = ({ detailsId }: { detailsId: string }) => {
    const router = useRouter()
    const user = getDecodedToken()
    const { setAuthTitleData, setIsAuthOpen } = useMyContext()
    return (
        <div className="pt-4">
            <Button
                onClick={() => {
                    if (user?.role === "user") {
                        router.push(`/studios/review/${detailsId}`)
                    } else {

                        setAuthTitleData({ ...authPayloads["Log In"], redirect: `/studios/review/${detailsId}` });
                        setIsAuthOpen(true);
                    }
                }
                }
                // asChild
                className="rounded-full uppercase min-w-52"
                variant={"default"}
                size={"lg"}
            >
                {/* <Link href={`/studios/review/${params.detailsId}`}> */}
                <span>Rate This Studio</span> <MoveRight />
                {/* </Link> */}
            </Button>
        </div>
    );
}

export default StudioRatingButton;
