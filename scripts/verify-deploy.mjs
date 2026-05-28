import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = new URL("../dist/", import.meta.url);
const allowPlaceholder = process.argv.includes("--allow-placeholder");
const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://example.com";
const checks = [];

function check(name, passed, detail) {
  checks.push({ name, passed, detail });
}

function distFileUrl(path) {
  return new URL(path, distDir);
}

function hasFile(path) {
  return existsSync(distFileUrl(path));
}

function readDistFile(path) {
  const file = distFileUrl(path);

  if (!existsSync(file)) {
    return "";
  }

  return readFileSync(file, "utf8");
}

let parsedSiteUrl;

try {
  parsedSiteUrl = new URL(siteUrl);
  check("PUBLIC_SITE_URL is a valid URL", true);
} catch {
  check("PUBLIC_SITE_URL is a valid URL", false, `Received: ${siteUrl}`);
}

if (parsedSiteUrl) {
  const isPlaceholder =
    parsedSiteUrl.hostname === "example.com" ||
    parsedSiteUrl.hostname.endsWith(".example") ||
    parsedSiteUrl.hostname.includes("your-domain");

  check("PUBLIC_SITE_URL uses https", parsedSiteUrl.protocol === "https:", `Received: ${siteUrl}`);
  check("PUBLIC_SITE_URL is not a placeholder", allowPlaceholder || !isPlaceholder, `Received: ${siteUrl}`);
}

check("dist directory exists", existsSync(distDir), `Expected: ${distDir.pathname}`);

const requiredFiles = [
  "index.html",
  "blog/index.html",
  "projects/index.html",
  "search/index.html",
  "rss.xml",
  "robots.txt",
  "sitemap-index.xml",
  "_headers",
  "pagefind/pagefind.js",
  "pagefind/pagefind-ui.css",
];

for (const file of requiredFiles) {
  check(`${file} exists`, hasFile(file), `Expected in ${join("dist", file)}`);
}

const indexHtml = readDistFile("index.html");
const postHtml = readDistFile("blog/hello-astro/index.html");
const rssXml = readDistFile("rss.xml");
const robotsTxt = readDistFile("robots.txt");
const sitemapIndex = readDistFile("sitemap-index.xml");

if (parsedSiteUrl) {
  const normalizedSite = parsedSiteUrl.toString().replace(/\/$/, "");

  check(
    "homepage canonical uses PUBLIC_SITE_URL",
    indexHtml.includes(`<link rel="canonical" href="${normalizedSite}/"`),
    `Expected canonical for ${normalizedSite}/`,
  );
  check(
    "sample post canonical uses PUBLIC_SITE_URL",
    postHtml.includes(`${normalizedSite}/blog/hello-astro/`),
    `Expected post URL under ${normalizedSite}`,
  );
  check(
    "rss.xml uses PUBLIC_SITE_URL",
    rssXml.includes(normalizedSite),
    `Expected RSS links under ${normalizedSite}`,
  );
  check(
    "robots.txt points at sitemap",
    robotsTxt.includes(`${normalizedSite}/sitemap-index.xml`),
    `Expected sitemap URL under ${normalizedSite}`,
  );
  check(
    "sitemap index uses PUBLIC_SITE_URL",
    sitemapIndex.includes(normalizedSite),
    `Expected sitemap URLs under ${normalizedSite}`,
  );
}

const failed = checks.filter((item) => !item.passed);

for (const item of checks) {
  const prefix = item.passed ? "[ok]" : "[fail]";
  console.log(`${prefix} ${item.name}`);
  if (!item.passed && item.detail) {
    console.log(`       ${item.detail}`);
  }
}

if (failed.length > 0) {
  console.error(`\nDeploy verification failed: ${failed.length} check(s) failed.`);
  process.exit(1);
}

console.log("\nDeploy verification passed.");
