import type { NextApiRequest, NextApiResponse } from "next";
import { queryBuilder } from "~/lib/planetscale";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        const data = await queryBuilder
          .selectFrom("views")
          .select(["slug", "count"])
          .execute();

        res.status(200).json(data);
        break;
      }

      default: {
        res.setHeader("Allow", ["GET"]);
        res.status(405).send("Method Not Allowed");
      }
    }
        
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ message: e?.message });
  }
}
