// @ts-check
import fs from "node:fs/promises";
import path from "node:path";

const START_DATE = +new Date(2023,0,1);
const DB_FOLDER = "./db";
const DIST_FOLDER = "./dist";

const total = Math.floor((+new Date() - START_DATE) / (1000 * 60 * 60 * 24));

await fs.readdir(DB_FOLDER, {
    withFileTypes: true
}).then(async (dirents) => {
    for (const dirent of dirents) {
        if (!dirent.isFile()) continue;
        const filename = dirent.name;
        if (Number(path.parse(filename).name) <= total) {
            await fs.rename(path.join(DB_FOLDER, filename), path.join(DIST_FOLDER, filename));
        }
    }
})
await fs.copyFile("index.html", path.join(DB_FOLDER, "index.html"));