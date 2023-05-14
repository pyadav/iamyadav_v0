import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Notify from "~/icons/notify";

const skills = ["Golang Developer", "Nodejs Developer", "React Developer"];
const Hero = () => {
  const [views, setViews] = useState(null);
  const [skill, setSkill] = useState(0);

  useEffect(() => {
    const getAllBlogViews = async () => {
      const response = await fetch("/api/views", {
        method: "GET",
      });
      return response.json();
    };
    getAllBlogViews().then((data = []) => {
      data = Array.isArray(data) ? data : [];
      const count = data.reduce(
        (acc: number, curr: any) => acc + Number(curr.count),
        0
      );
      setViews(count);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSkill((skill) => (skill + 1) % skills.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center text-center lg:pt-5 lg:pb-7 lg:text-left">
      <div className="flex max-w-[37rem] flex-col py-16 lg:pt-12 lg:pb-11">
        <h1 className="mt-6 text-[1.75rem] font-extrabold leading-9 tracking-tight text-slate-900 dark:text-gray-200 md:text-4xl">
          If you 👀 looking to hire a
          <span className="relative inline-block developer">
            🧑🏿‍💻 versatile&nbsp;
            <span className="typing font-bold">{skills[skill]}</span>
          </span>
        </h1>

        <div className="order-first flex items-center justify-center gap-4 text-[0.8125rem] leading-6 text-slate-500 dark:text-gray-400 lg:justify-start">
          Contact me 👇
        </div>
        <div className="mt-10 flex justify-center gap-8 lg:justify-start">
          <a
            className="rounded-lg text-slate-900 font-semibold transition flex items-center gap-3 text-[0.8125rem] leading-6 py-1 px-1.5 hover:bg-slate-900/[0.03] -my-1 -mx-1.5 dark:text-gray-400"
            href="https://github.com/pyadav"
          >
            <GitHubLogoIcon style={{ marginTop: "-4" }} />
            Github
          </a>
          <a
            className="rounded-lg text-slate-900 font-semibold transition flex items-center gap-3 text-[0.8125rem] leading-6 py-1 px-1.5 hover:bg-slate-900/[0.03] -my-1 -mx-1.5 dark:text-gray-400"
            href="https://www.linkedin.com/in/iamya6av"
          >
            <LinkedInLogoIcon style={{ marginTop: "-4" }} />
            Linkedin
          </a>
          <a
            className="rounded-lg text-slate-900 font-semibold transition flex items-center gap-3 text-[0.8125rem] leading-6 py-1 px-1.5 hover:bg-slate-900/[0.03] -my-1 -mx-1.5 dark:text-gray-400"
            href="mailto:pyadav9678@gmail.com"
          >
            <EnvelopeClosedIcon style={{ marginTop: "-4" }} />
            Email me
          </a>
          {views && (
            <div className="flex justify-center items-center text-sm">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              {views} Views
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-auto lg:justify-center">
        <Notify />
      </div>
    </div>
  );
};
export default Hero;
