import { Header } from "src/components/Header";

export const BlogLayout: React.FC<{}> = ({ children }) => {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-4xl px-4 py-12 mx-auto antialiased font-body">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};
