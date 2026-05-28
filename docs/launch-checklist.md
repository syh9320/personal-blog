# 上线清单

## 1. 准备仓库

- 确认 `npm run build` 本地通过。
- 将本地仓库推送到 GitHub。
- 确认 GitHub Actions 的 `Build` 工作流通过。

## 2. 选择第一阶段部署平台

推荐先用 Cloudflare Pages。

Cloudflare Pages 设置：

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22`
- Environment variable: `PUBLIC_SITE_URL=https://你的域名`

Vercel 设置：

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `PUBLIC_SITE_URL=https://你的域名`

## 3. 域名与站点元信息

- 如果暂时没有自定义域名，可以先使用平台生成的预览域名。
- 一旦绑定自定义域名，立即把部署平台里的 `PUBLIC_SITE_URL` 改成正式域名。
- 修改后重新部署，确认 `rss.xml`、`robots.txt`、`sitemap-index.xml` 和页面 canonical URL 都指向正式域名。

## 4. 上线后检查

- 首页可以打开。
- `/blog/` 可以打开。
- 文章详情页可以打开。
- `/projects/` 可以打开。
- `/search/` 可以搜索到文章。
- `/rss.xml` 可以打开。
- `/sitemap-index.xml` 可以打开。
- `/robots.txt` 可以打开。
- 明暗主题切换可用。

## 5. 暂缓项

- 评论默认关闭，后续再选择 Giscus、Twikoo 或 Waline。
- 统计默认关闭，后续再选择 Cloudflare Web Analytics、Umami、Plausible 或 Google Analytics。
- 如果主要读者在中国大陆，并且需要更稳定访问，再单独推进 ICP 备案、国内 CDN、对象存储或国内服务器部署。
