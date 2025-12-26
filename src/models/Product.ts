import mongoose, { type InferSchemaType } from "mongoose";

const { Schema, model, models } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, index: true },
    price: { type: Number, required: true, min: 0 },
    shortDesc: { type: String, default: "" },
    longDesc: { type: String, default: "" },
    images: { type: [String], default: [] },
    categories: { type: [String], default: [] }, // store category slugs for simplicity
    isFeatured: { type: Boolean, default: false },
    specs: { type: Schema.Types.Mixed, default: null } // { weight, burnTime, ingredients, freebies: [] }
  },
  { timestamps: true }
);

export type Product = InferSchemaType<typeof ProductSchema>;

export const ProductModel = models.Product || model("Product", ProductSchema);
