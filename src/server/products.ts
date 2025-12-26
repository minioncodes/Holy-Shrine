import { dbConnect } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

export async function listProducts() {
  await dbConnect();
  return ProductModel.find({}).sort({ createdAt: -1 }).lean();
}

export async function getFeaturedProducts() {
  await dbConnect();
  const featured = await ProductModel.find({ isFeatured: true }).limit(6).lean();
  if (featured.length) return featured;
  return ProductModel.find({}).limit(6).lean();
}

export async function getProductBySlug(slug: string) {
  await dbConnect();
  return ProductModel.findOne({ slug }).lean();
}

export async function getProductsByIds(ids: string[]) {
  await dbConnect();
  // ids are Mongo ObjectIds as strings
  return ProductModel.find({ _id: { $in: ids } }).lean();
}
