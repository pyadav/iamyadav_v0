import clsx from "clsx";
import { getSiteMetaData } from "@utils/helpers";

import profileImage from "../../content/assets/profile.png";
export function Bio({ className }: any) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <img
        alt="Profile"
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
        src={profileImage.src}
      />

      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author.name}</b>{" "}
        {author.summary}{" "}
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow him on twitter
        </a>
      </p>
    </div>
  );
}
