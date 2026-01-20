#!/usr/bin/env node

import { execSync } from "child_process";
import inquirer from "inquirer";


function run(cmd) {
  return execSync(cmd, { encoding: "utf-8" }).trim();
}

function getCurrentBranch() {
  return run("git branch --show-current");
}

function getMergedBranches() {
  const output = run("git branch --merged");
  return output
    .split("\n")
    .map(line => line.replace("*", "").trim())
    .filter(Boolean);
}

function filterDeletableBranches(branches, currentBranch) {
  const protectedBranches = new Set([
    "main",
    "master",
    currentBranch
  ]);

  return branches.filter(b => !protectedBranches.has(b));
}

async function main() {
  try {
    const currentBranch = getCurrentBranch();
    const merged = getMergedBranches();
    const deletable = filterDeletableBranches(merged, currentBranch);

    if (deletable.length === 0) {
      console.log("✅ No merged branches to delete.");
      return;
    }

    console.log("\nMerged branches:");
    deletable.forEach(b => console.log("  •", b));

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Delete these branches?",
        default: false
      }
    ]);

    if (!confirm) {
      console.log("❌ Aborted. No branches deleted.");
      return;
    }

    for (const branch of deletable) {
      console.log(`🗑 Deleting ${branch}...`);
      run(`git branch -d ${branch}`);
    }

    console.log("\n🎉 Cleanup complete!");

  } catch (err) {
    console.error("⚠️ Error:", err.message);
    console.error("Make sure you are inside a Git repository.");
  }
}

main();
