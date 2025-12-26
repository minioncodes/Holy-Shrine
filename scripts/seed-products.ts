import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import env from "@next/env";
import mongoose from "mongoose";
import { ProductModel } from "../src/models/Product";
import { CategoryModel } from "../src/models/Category";

const { loadEnvConfig } = env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnvConfig(process.cwd());

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

function readJson(relPath: string) {
  const p = path.join(__dirname, "..", ...relPath.split("/"));
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

async function main() {
  const categories = readJson("src/data/categories.seed.json");
  const products = readJson("src/data/products.seed.json");

  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB || undefined });
  console.log("Connected. Seeding categories + products...");

  for (const c of categories) {
    await CategoryModel.updateOne({ slug: c.slug }, { $set: c }, { upsert: true });
  }

  for (const p of products) {
    await ProductModel.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
  }

  console.log("Done.");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
