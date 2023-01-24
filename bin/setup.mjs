// @ts-check
import fs from "node:fs/promises";
import path from "node:path";

const START_DATE = +new Date(2023,0,1);
const DB_FOLDER = "./db";

const total = Math.floor((+new Date() - START_DATE) / (1000 * 60 * 60 * 24));

fs.readdir(DB_FOLDER).then(async (filenames) => {
    for (const filename of filenames) {
        console.log(Number(path.parse(filename).name));
        if (!(Number(path.parse(filename).name) <= total)) {
            await fs.unlink(path.join(DB_FOLDER, filename));
        }
    }
})