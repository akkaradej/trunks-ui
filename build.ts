import { rm, readdir, mkdir } from "node:fs/promises";
import { join } from "node:path";

async function removeDirectory(dir) {
  try {
    await rm(dir, { recursive: true, force: true });
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`Error removing directory '${dir}': ${err.message}`);
    }
  }
}

async function createDirectory(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    console.error(`Error creating directory '${dir}': ${err.message}`);
  }
}

async function copyFile(src, dest) {
  try {
    const content = await Bun.file(src).text();
    await Bun.write(dest, content);
  } catch (err) {
    console.error(`Error copying file '${src}': ${err.message}`);
  }
}

async function copyDirectory(src, dest) {
  try {
    await createDirectory(dest);
    const entries = await readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`Error copying directory '${src}': ${err.message}`);
  }
}

async function cleanLib() {
  console.log("Cleaning directories...");
  await removeDirectory(".tmp");
  await removeDirectory("dist-lib");
}

async function stylesLib() {
  console.log("Copying files and directories...");
  await createDirectory("dist-lib");
  await copyFile("package.json", "dist-lib/package.json");
  await copyDirectory("lib", "dist-lib/lib");
}

async function main() {
  try {
    await cleanLib();
    await stylesLib();
    console.log("Build complete!");
  } catch (err) {
    console.error(`Build failed: ${err.message}`);
  }
}

main();
