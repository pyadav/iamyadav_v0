// import 'server-only' not working with API routes yet
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

interface ViewsTable {
  slug: string;
  count: number;
}

interface Database {
  views: ViewsTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.PLANET_DATABASE_URL,
  }),
});
