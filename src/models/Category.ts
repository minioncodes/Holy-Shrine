import mongoose, { type InferSchemaType } from "mongoose";

const { Schema, model, models } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, index: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Category = InferSchemaType<typeof CategorySchema>;
export const CategoryModel = models.Category || model("Category", CategorySchema);
