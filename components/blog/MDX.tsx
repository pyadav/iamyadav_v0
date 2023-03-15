/* eslint-disable react/display-name */
import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
};
const Hello: React.FC<Props> = ({ children }) => <div>{children}</div>;
const components = {
  Hello,
  del: (props: any) => <del className="line-through" {...props} />,
  a: ({ href = "", ...props }) => {
    if (href.startsWith("https")) {
      return (
        <a
          className={
            "font-medium transition-colors hover:text-purple-700 dark:hover:text-yellow-700"
          }
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          {...props}
        />
      );
    }

    return (
      <NextLink
        href={href}
        passHref
        className={"font-medium transition-colors dark:hover:text-yellow-700"}
        {...props}
      ></NextLink>
    );
  },
  h2: ({ ...props }) => {
    return <h2 {...props} data-toc />;
  },
  h3: ({ ...props }) => {
    return <h3 {...props} data-toc />;
  },
  ol: ({ children, ...props }: any) => {
    return (
      <ol {...props} className="mb-8 ml-10">
        {children}
      </ol>
    );
  },
  ul: ({ children, ...props }: any) => {
    return (
      <ol {...props} className="mb-8 ml-10">
        {children}
      </ol>
    );
  },
};

export default components;
