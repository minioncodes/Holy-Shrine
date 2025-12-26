import mongoose, { type InferSchemaType } from "mongoose";

const { Schema, model, models } = mongoose;

const EnquirySchema = new Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    message: { type: String, default: "" }
  },
  { timestamps: true }
);

export type Enquiry = InferSchemaType<typeof EnquirySchema>;
export const EnquiryModel = models.Enquiry || model("Enquiry", EnquirySchema);
