#!/usr/bin/env node
/**
 * Turn Lighthouse CI JSON into a short markdown briefing for the morning review.
 */
import fs from "node:fs";
import path from "node:path";

const REPORT_DIR = ".lighthouseci";
const OUTPUT_PATH = "reports/lighthouse-latest.md";
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

function scorePercent(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "n/a";
  }
  return `${Math.round(value * 100)}`;
}

function loadReports(reportDir) {
  if (!fs.existsSync(reportDir)) {
    return [];
  }

  const fromLhr = fs
    .readdirSync(reportDir)
    .filter((name) => name.startsWith("lhr-") && name.endsWith(".json"))
    .sort()
    .map((name) => JSON.parse(fs.readFileSync(path.join(reportDir, name), "utf8")))
    .filter((report) => report.categories);

  if (fromLhr.length > 0) {
    return fromLhr;
  }

  const manifestPath = path.join(reportDir, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return manifest
    .map((entry) => {
      const jsonPath = entry.jsonPath && path.join(reportDir, path.basename(entry.jsonPath));
      if (jsonPath && fs.existsSync(jsonPath)) {
        return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      }
      return null;
    })
    .filter(Boolean);
}

function hostedReportUrl(reportDir, report) {
  const linksPath = path.join(reportDir, "links.json");
  if (!fs.existsSync(linksPath)) {
    return null;
  }
  const links = JSON.parse(fs.readFileSync(linksPath, "utf8"));
  const url = report.finalUrl ?? report.requestedUrl;
  return links[url] ?? Object.values(links)[0] ?? null;
}

function isActionable(audit) {
  const items = audit.details?.items ?? [];
  return !items.some((item) => item.failureType === "Not actionable");
}

function auditDetail(audit) {
  const items = audit.details?.items ?? [];
  const first = items[0];
  if (first?.description) {
    return first.description;
  }
  if (first?.url) {
    return first.url;
  }
  return audit.description?.split("[")[0].trim() ?? "";
}

function failedAudits(report) {
  return Object.values(report.audits ?? {})
    .filter(
      (audit) =>
        audit.score !== null &&
        audit.score < 0.9 &&
        audit.scoreDisplayMode !== "informative" &&
        !String(audit.id ?? "").endsWith("-insight") &&
        isActionable(audit),
    )
    .sort((left, right) => (left.score ?? 1) - (right.score ?? 1))
    .slice(0, 15)
    .map((audit) => {
      const detail = auditDetail(audit);
      const suffix = detail ? `: ${detail}` : "";
      return `- **${audit.title}** (${scorePercent(audit.score)})${suffix}`;
    });
}

const reports = loadReports(REPORT_DIR);
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

if (reports.length === 0) {
  const emptyBody = [
    "# Lighthouse morning report",
    "",
    "No Lighthouse JSON reports were found in `.lighthouseci/`.",
    "Check the workflow logs for the Lighthouse CI step.",
    "",
  ].join("\n");
  fs.writeFileSync(OUTPUT_PATH, emptyBody);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, emptyBody);
  }
  process.stdout.write(`Wrote ${OUTPUT_PATH} (no reports found)\n`);
  process.exit(0);
}

const latest = reports[reports.length - 1];
const hostedUrl = hostedReportUrl(REPORT_DIR, latest);
const categoryLines = CATEGORIES.map((id) => {
  const category = latest.categories?.[id];
  const label = category?.title ?? id;
  return `- ${label}: **${scorePercent(category?.score)}**`;
});
const failing = failedAudits(latest);

const body = [
  "# Lighthouse morning report",
  "",
  `URL: ${latest.finalUrl ?? latest.requestedUrl ?? "unknown"}`,
  `Generated: ${latest.fetchTime ?? new Date().toISOString()}`,
  ...(hostedUrl ? [`Hosted HTML report: ${hostedUrl}`] : []),
  "",
  "## Scores",
  "",
  ...categoryLines,
  "",
  "## Audits to review",
  "",
  ...(failing.length > 0 ? failing : ["- No failing audits in the latest run."]),
  "",
  "Full HTML/JSON reports are attached to the workflow run as `lighthouse-morning-report`.",
  "The team reviews this briefing in the morning and decides which fixes to apply.",
  "",
].join("\n");

fs.writeFileSync(OUTPUT_PATH, body);
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, body);
}
process.stdout.write(`Wrote ${OUTPUT_PATH}\n`);
