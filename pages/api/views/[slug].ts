import type { NextApiRequest, NextApiResponse } from "next";
import { queryBuilder } from "~/lib/planetscale";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query?.slug as string;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required." });
    }

    const data = await queryBuilder
      .selectFrom("views")
      .where("slug", "=", slug)
      .select(["count"])
      .execute();

    const views = !data.length ? 0 : Number(data[0].count);

    switch (req.method) {
      case "GET": {
        res.status(200).json({ total: views });
        break;
      }
      case "POST": {
        await queryBuilder
          .insertInto("views")
          .values({ slug, count: 1 })
          .onDuplicateKeyUpdate({ count: views + 1 })
          .execute();

        res.status(200).json({
          total: views + 1,
        });
        break;
      }

      default: {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).send("Method Not Allowed");
      }
    }
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ message: e?.message });
  }
}
