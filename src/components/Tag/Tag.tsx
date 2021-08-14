import Link from "next/link";

interface Props {
  tag: string;
}

export const Tag: React.FC<Props> = ({ tag }) => {
  return (
    <Link
      href={{ pathname: "/tags/[tag]", query: { tag } }}
      passHref
      scroll={false}
    >
      <a
        className={`text-purple-500 transition-colors cursor-pointer ont-medium dark:text-yellow-500 hover:text-purple-700 dark:hover:text-yellow-700`}
      >
        &nbsp; #{tag}
      </a>
    </Link>
  );
};
