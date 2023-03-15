import clsx from "clsx";
import Image from "next/image";
import { getSiteMetaData } from "~/utils/helpers";

export function Bio({ className }: any) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <div className="flex-shrink-0 mb-0 mr-3 w-14 h-14">
        <Image
          alt="my avatar"
          className="rounded-full"
          src="/static/profile.png"
          width={70}
          height={70}
          quality={100}
          priority={true}
          placeholder="blur"
          blurDataURL="/static/profile.png"
        />
      </div>

      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author}</b>
        <br></br>
        Follow on
        <a href={`https://twitter.com/${social.twitter}`}> twitter</a>,
        <a href={`https://github.com/${social.github}`}> github</a>
      </p>
    </div>
  );
}
