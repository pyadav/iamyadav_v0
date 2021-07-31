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
            "font-medium transition-colors text-sky-500 hover:text-sky-700"
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
          className={
            "font-medium transition-colors text-sky-500 hover:text-sky-700"
          }
          {...props}
        />
      </NextLink>
    );
  },
};

export default components;