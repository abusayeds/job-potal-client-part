"use client";

import { cn } from "@/utils/cn";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  TwitterShareButton,
  TwitterIcon,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const ShareComponent = ({ shareUrl, className }: { shareUrl: string; className?: string }) => {
  const  newShareUrl = `${window.location.origin}${shareUrl}`;
  return (
    <div className={cn("flex items-center space-x-4", className)}>
      <div className="">
        <FacebookShareButton url={newShareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookShareCount url={newShareUrl}>
          {(count) => <span className="share-count">{count}</span>}
        </FacebookShareCount>
      </div>
      <div>
        <TwitterShareButton url={newShareUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div>
        <LinkedinShareButton url={newShareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
      <div>
        <WhatsappShareButton url={newShareUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareComponent;
