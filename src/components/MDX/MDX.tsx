/* eslint-disable react/display-name */
import NextLink from "next/link";

const Hello: React.FC<{}> = ({ children }) => (
  <div className="demo">{children}</div>
);

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
      <NextLink href={href} passHref>
        <a
          className={"font-medium transition-colors dark:hover:text-yellow-700"}
          {...props}
        />
      </NextLink>
    );
  },
  h2: ({ ...props }) => {
    return <h2 {...props} data-toc />;
  },
  h3: ({ ...props }) => {
    return <h3 {...props} data-toc />;
  },
};

export default components;
