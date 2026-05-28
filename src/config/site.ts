const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? "https://example.com";

export const siteConfig = {
  lang: "zh-CN",
  name: "Personal Blog",
  title: "Personal Blog",
  description: "A refined personal blog built with Astro, MDX, and Tailwind CSS.",
  url: siteUrl,
  author: {
    name: "Blog Author",
    avatar: "/images/avatar-placeholder.svg",
    bio: "Writing about technology, projects, and long-form notes.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/",
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
