import seoConfiguration from "config/seo.json";

export const getSiteMetaData = () => seoConfiguration.siteMetadata;
export const EXTReplacer = (slug: string, ext: RegExp) => slug.replace(ext, "");
