const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? "https://example.com";

export const siteConfig = {
  lang: "zh-CN",
  name: "OA",
  title: "OA",
  description: "写代码、看书、偶尔画画。一个安静的个人空间。",
  url: siteUrl,
  author: {
    name: "OshinoAoko",
    avatar: "/images/avatar-placeholder.svg",
    bio: "写代码、看书、偶尔画画。在这里记录技术和日常。",
    links: [
      {
        label: "个人主页",
        href: "https://github.com/syh9320",
      },
    ],
  },
  nav: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Search",
      href: "/search",
    },
    {
      label: "Archive",
      href: "/archive",
    },
  ],
  theme: {
    defaultMode: "system",
    modes: ["light", "dark", "system"],
  },
  comments: {
    enabled: false,
    provider: "giscus",
    giscus: {
      repo: "",
      repoId: "",
      category: "",
      categoryId: "",
      mapping: "pathname",
      reactionsEnabled: true,
      inputPosition: "bottom",
    },
    twikoo: {
      envId: "",
    },
    waline: {
      serverUrl: "",
    },
  },
  analytics: {
    enabled: false,
    provider: "cloudflare",
    cloudflare: {
      token: "",
    },
    umami: {
      websiteId: "",
      scriptUrl: "https://cloud.umami.is/script.js",
    },
    plausible: {
      domain: "",
      scriptUrl: "https://plausible.io/js/script.js",
    },
    googleAnalytics: {
      measurementId: "",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
