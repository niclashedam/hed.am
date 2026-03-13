#!/usr/bin/env node
// Deletes old Cloudflare Pages deployments.
// Keeps the most recent KEEP production deployments; deletes all preview deployments.
//
// Required environment variables:
//   CF_TOKEN        - Cloudflare API token with Pages:Edit permission
//   CF_ACCOUNT_ID   - Cloudflare account ID
//   CF_PROJECT_NAME - Cloudflare Pages project name
//
// Optional:
//   KEEP            - Number of production deployments to keep (default: 3)

"use strict";

const https = require("https");

const { CF_TOKEN, CF_ACCOUNT_ID, CF_PROJECT_NAME } = process.env;
const KEEP = parseInt(process.env.KEEP ?? "3", 10);

function validate() {
  const missing = ["CF_TOKEN", "CF_ACCOUNT_ID", "CF_PROJECT_NAME"].filter(
    (k) => !process.env[k],
  );
  if (missing.length) {
    console.error(
      `ERROR: Missing required environment variables: ${missing.join(", ")}`,
    );
    process.exit(1);
  }
  if (isNaN(KEEP) || KEEP < 1) {
    console.error(
      `ERROR: KEEP must be a positive integer, got "${process.env.KEEP}"`,
    );
    process.exit(1);
  }
}

function request(method, path) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.cloudflare.com",
        path: `/client/v4${path}`,
        method,
        headers: {
          Authorization: `Bearer ${CF_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          let json;
          try {
            json = JSON.parse(body);
          } catch {
            return reject(
              new Error(
                `Non-JSON response (HTTP ${res.statusCode}): ${body.slice(0, 200)}`,
              ),
            );
          }
          if (!json.success) {
            const msgs = (json.errors ?? [])
              .map((e) => `[${e.code}] ${e.message}`)
              .join(", ");
            return reject(new Error(`API error: ${msgs || body}`));
          }
          resolve(json);
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

async function fetchAllDeployments() {
  const base = `/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PROJECT_NAME}/deployments`;
  const all = [];
  let page = 1;

  while (true) {
    const res = await request("GET", `${base}?page=${page}`);
    all.push(...res.result);
    const { total_count, per_page } = res.result_info;
    if (all.length >= total_count || res.result.length < per_page) break;
    page++;
  }

  return all;
}

async function deleteDeployment(d) {
  process.stdout.write(`  ${d.id}  (${d.created_on})  [${d.environment}]  ...`);
  await request(
    "DELETE",
    `/accounts/${CF_ACCOUNT_ID}/pages/projects/${CF_PROJECT_NAME}/deployments/${d.id}?force=true`,
  );
  process.stdout.write("  OK\n");
}

async function main() {
  validate();

  const deployments = await fetchAllDeployments();

  const production = deployments.filter((d) => d.environment === "production");
  const previews = deployments.filter((d) => d.environment !== "production");

  console.log(
    `Found ${deployments.length} deployment(s): ${production.length} production, ${previews.length} preview.`,
  );
  console.log(`Keeping the ${KEEP} most recent production deployment(s).`);

  // Deployments are returned newest-first by the API
  const toDelete = [...production.slice(KEEP), ...previews];

  if (toDelete.length === 0) {
    console.log("Nothing to delete.");
    return;
  }

  console.log(`Deleting ${toDelete.length} deployment(s)...`);
  for (const d of toDelete) {
    await deleteDeployment(d);
  }

  console.log(`Done.`);
}

main().catch((err) => {
  process.stdout.write("\n");
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
});
