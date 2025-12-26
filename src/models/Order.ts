import mongoose, { type InferSchemaType } from "mongoose";

const { Schema, model, models } = mongoose;

const OrderSchema = new Schema(
  {
    status: { type: String, enum: ["CREATED", "PAID", "FAILED"], default: "CREATED" },
    currency: { type: String, default: "INR" },
    amount: { type: Number, required: true, min: 0 }, // in paise
    customer: {
      name: String,
      email: String,
      phone: String,
      addressLine1: String,
      city: String,
      state: String,
      pincode: String
    },
    items: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true }, // in rupees (display)
        qty: { type: Number, required: true, min: 1 }
      }
    ],
    razorpay: {
      orderId: String,
      paymentId: String
    }
  },
  { timestamps: true }
);

export type Order = InferSchemaType<typeof OrderSchema>;
export const OrderModel = models.Order || model("Order", OrderSchema);
