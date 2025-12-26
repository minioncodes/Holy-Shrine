import { dbConnect } from "@/lib/mongodb";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";

export async function listCategories() {
  await dbConnect();
  return CategoryModel.find({}).sort({ sortOrder: 1, name: 1 }).lean();
}

export async function getCategoryBySlug(slug: string) {
  await dbConnect();
  return CategoryModel.findOne({ slug }).lean();
}

export async function listProductsByCategorySlug(slug: string) {
  await dbConnect();
  return ProductModel.find({ categories: slug }).sort({ createdAt: -1 }).lean();
}
