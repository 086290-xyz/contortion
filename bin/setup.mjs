// @ts-check
import fs from "node:fs/promises";
import path from "node:path";

const START_DATE = +new Date(2023,0,1);
const DB_FOLDER = "./db";

const total = Math.floor((+new Date() - START_DATE) / (1000 * 60 * 60 * 24));

fs.readdir(DB_FOLDER, {
    withFileTypes: true
}).then(async (filenames) => {
    for (const { name, isFile } of filenames) {
        if (!isFile()) continue;
        console.log(Number(path.parse(name).name));
        if (!(Number(path.parse(name).name) <= total)) {
            await fs.unlink(path.join(DB_FOLDER, name));
        }
    }
})