import mongoose, { type InferSchemaType } from "mongoose";

const { Schema, model, models } = mongoose;

const CorporateEnquirySchema = new Schema(
  {
    companyName: { type: String, default: "" },
    contactName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    quantity: { type: Number, default: 0 },
    budget: { type: String, default: "" },
    fragrancePreference: { type: String, default: "" },
    brandingRequired: { type: Boolean, default: false },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export type CorporateEnquiry = InferSchemaType<typeof CorporateEnquirySchema>;
export const CorporateEnquiryModel =
  models.CorporateEnquiry || model("CorporateEnquiry", CorporateEnquirySchema);
