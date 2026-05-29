import { execSync, spawn } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const checks = [];
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");

function check(name, passed, detail) {
  checks.push({ name, passed, detail });
}

function runSuccess(command, options = {}) {
  try {
    execSync(command, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: "pipe",
      shell: true,
      ...options,
    });
    return true;
  } catch {
    return false;
  }
}

function runCapture(command, options = {}) {
  try {
    const stdout = execSync(command, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: "pipe",
      shell: true,
      ...options,
    });
    return { ok: true, output: stdout };
  } catch (err) {
    return { ok: false, output: err.stderr || err.stdout || err.message };
  }
}

function runWithTimeout(command, args, extraEnv, timeoutMs = 90_000) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: { ...process.env, ...extraEnv },
      stdio: "pipe",
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      resolve({ passed: false, reason: `Timed out after ${timeoutMs}ms` });
    }, timeoutMs);

    child.on("close", (code) => {
      clearTimeout(timer);
      const detail = code === 0 ? undefined : (stderr.trim() || stdout.trim() || `Exit code ${code}`);
      resolve({ passed: code === 0, reason: detail });
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      resolve({ passed: false, reason: `Spawn error: ${err.message}` });
    });
  });
}

const blogDir = join(projectRoot, "src", "content", "blog");
const invalidPostPath = join(blogDir, "__test-invalid.mdx");

function createInvalidPost() {
  writeFileSync(
    invalidPostPath,
    '---\ntitle: "Test Invalid"\ntags: []\ndraft: false\nfeatured: false\n---\n\nMissing description and pubDate.\n',
    "utf8",
  );
}

function removeInvalidPost() {
  if (existsSync(invalidPostPath)) {
    rmSync(invalidPostPath);
  }
}

process.on("exit", removeInvalidPost);
process.on("SIGINT", () => {
  removeInvalidPost();
  process.exit(1);
});

async function main() {
  console.log("=== Pipeline Tests ===\n");

  const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://example.com";
  const isPlaceholder =
    new URL(siteUrl).hostname === "example.com" ||
    new URL(siteUrl).hostname.endsWith(".example") ||
    new URL(siteUrl).hostname.includes("your-domain");

  const env = { ...process.env, PUBLIC_SITE_URL: siteUrl };

  console.log("Building dist with PUBLIC_SITE_URL=" + siteUrl + " ...");
  const buildOk = runSuccess("npm run build", {
    env,
    timeout: 180_000,
  });

  check("npm run build succeeds", buildOk, buildOk ? undefined : `PUBLIC_SITE_URL=${siteUrl}`);

  const distDir = join(projectRoot, "dist");
  const distExists = existsSync(distDir);

  check("dist directory exists", distExists, "Expected: dist/");

  if (distExists) {
    const requiredFiles = [
      "index.html",
      "blog/index.html",
      "projects/index.html",
      "search/index.html",
      "rss.xml",
      "robots.txt",
      "sitemap-index.xml",
      "pagefind/pagefind.js",
    ];

    for (const file of requiredFiles) {
      check(`${file} exists in dist/`, existsSync(join(distDir, file)));
    }
  }

  if (buildOk) {
    if (isPlaceholder) {
      const rejectResult = runCapture("node scripts/verify-deploy.mjs", { env });
      check(
        "verify:deploy rejects placeholder URL (expected: fail)",
        !rejectResult.ok,
        rejectResult.ok ? "Expected non-zero exit but passed" : `Correctly rejected placeholder: ${siteUrl}`,
      );

      const bypassResult = runCapture("node scripts/verify-deploy.mjs --allow-placeholder", { env });
      check(
        "verify:deploy passes with --allow-placeholder",
        bypassResult.ok,
        bypassResult.ok ? undefined : bypassResult.output,
      );
    } else {
      const verifyResult = runCapture("node scripts/verify-deploy.mjs", { env });
      check(
        "verify:deploy passes with valid PUBLIC_SITE_URL",
        verifyResult.ok,
        verifyResult.ok ? undefined : verifyResult.output,
      );
    }
  } else {
    check("verify:deploy tests skipped — build failed", true, "Cannot verify without successful build");
  }

  createInvalidPost();

  const checkEnv = { ASTRO_TELEMETRY_DISABLED: "1", JITI_CACHE: "false" };
  const checkResult = await runWithTimeout("npx", ["astro", "check"], checkEnv);

  check(
    "astro check fails with invalid content (missing required frontmatter)",
    !checkResult.passed,
    checkResult.passed ? "Expected non-zero exit for invalid content" : undefined,
  );

  removeInvalidPost();

  check("invalid test post cleaned up", !existsSync(invalidPostPath));

  const cleanCheckResult = await runWithTimeout("npx", ["astro", "check"], checkEnv);

  check(
    "astro check passes with valid content",
    cleanCheckResult.passed,
    cleanCheckResult.reason,
  );

  const failed = checks.filter((item) => !item.passed);

  for (const item of checks) {
    const prefix = item.passed ? "[ok]" : "[fail]";
    console.log(`${prefix} ${item.name}`);
    if (!item.passed && item.detail) {
      console.log(`       ${item.detail}`);
    }
  }

  if (failed.length > 0) {
    console.error(`\nPipeline tests failed: ${failed.length} check(s) failed.`);
    process.exit(1);
  }

  console.log("\nAll pipeline tests passed.");
}

main();