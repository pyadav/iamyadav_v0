import { Josefin_Sans } from "next/font/google";
import Header from "~/components/header";

const josefin = Josefin_Sans({
  style: ["normal"],
  subsets: ["latin"],
});

type Props = {
  children?: React.ReactNode;
};
export const BlogLayout: React.FC<Props> = ({ children }) => {
  return (
    <main
      className={`${josefin.className} min-h-screen mx-auto max-w-5xl flex flex-col w-full`}
    >
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6">
        {children}
      </main>
    </main>
  );
};
