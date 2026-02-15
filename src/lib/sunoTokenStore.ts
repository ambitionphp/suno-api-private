import { promises as fs } from "node:fs";
import path from "node:path";

const STORE_PATH = process.env.SUNO_TOKEN_STORE_PATH || "/data/suno-token.json";

export type SunoTokenState = {
  cookie: string;
  updatedAt: string; // ISO
};

export async function readTokenState(): Promise<SunoTokenState | null> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writeTokenState(state: SunoTokenState): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(state, null, 2), "utf8");
}
