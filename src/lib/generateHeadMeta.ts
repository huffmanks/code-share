type GenerateHeadMetaProps = {
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  parentTitle?: string;
};

type HeadConfig = {
  tag: "title" | "base" | "link" | "style" | "meta" | "script" | "noscript" | "template";
  attrs?: Record<string, string | boolean | undefined>;
  content?: string;
};

export function generateHeadMeta({ pageTitle, pageDescription, pageUrl, parentTitle = "" }: GenerateHeadMetaProps): HeadConfig[] {
  const siteSuffix = " | CodeShare";
  const parentSuffix = parentTitle ? ` - ${parentTitle}` : "";
  const imageUrl = "https://codeshare.huffmanks.com/meta.png";

  return [
    {
      tag: "title",
      content: `${pageTitle}${parentSuffix}${siteSuffix}`,
    },
    {
      tag: "meta",
      attrs: {
        name: "title",
        property: "title",
        content: `${pageTitle}${parentSuffix}${siteSuffix}`,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "description",
        property: "description",
        content: pageDescription,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "url",
        property: "url",
        content: pageUrl,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "image",
        property: "image",
        content: imageUrl,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "og:title",
        property: "og:title",
        content: `${pageTitle}${parentSuffix}${siteSuffix}`,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "og:description",
        property: "og:description",
        content: pageDescription,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "og:url",
        property: "og:url",
        content: pageUrl,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "og:image",
        property: "og:image",
        content: imageUrl,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "twitter:title",
        property: "twitter:title",
        content: `${pageTitle}${parentSuffix}${siteSuffix}`,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "twitter:description",
        property: "twitter:description",
        content: pageDescription,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "twitter:url",
        property: "twitter:url",
        content: pageUrl,
      },
    },
    {
      tag: "meta",
      attrs: {
        name: "twitter:image",
        property: "twitter:image",
        content: imageUrl,
      },
    },
  ];
}
