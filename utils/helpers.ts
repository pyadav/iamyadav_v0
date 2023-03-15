import seoConfiguration from "~/config/seo.json";

export const getSiteMetaData = () => seoConfiguration.siteMetadata;
export const EXTReplacer = (slug: string, ext: RegExp) => slug.replace(ext, "");
export const formateDate = (date: string = "") =>
  Date.parse(date) ? new Date(date).toISOString() : "";
