import { useEffect } from "react";
import useSWR from "swr";

type PostView = {
  slug: string;
  count: string;
};

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export default function ViewCounter({
  slug,
  trackView,
}: {
  slug: string;
  trackView: boolean;
}) {
  const { data } = useSWR<PostView[]>("/api/views", fetcher);
  const viewsForSlug = Array.isArray(data)
    ? data.find((view) => view.slug === slug)
    : null;
  const views = new Number(viewsForSlug?.count || 0);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      });

    if (trackView) {
      registerView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return data ? (
    <span className="font-mono text-sm text-neutral-500 tracking-tighter">
      {views.toLocaleString()} views
    </span>
  ) : null;
}
