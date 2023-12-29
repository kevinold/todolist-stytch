import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PASSWORD = "!qlIb08ue9Ljabfd";
export const defaultData = { users: [], todos: [] };
export const dbFile = path.join(__dirname, "../db.json");
