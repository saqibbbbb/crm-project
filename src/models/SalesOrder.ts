import mongoose, { Schema, type Document, type Model } from "mongoose";

export type SalesOrderStatus = "created" | "processing" | "shipped" | "delivered" | "cancelled";

export interface ISalesOrder extends Document {
  orderNumber: string;
  customerId: mongoose.Types.ObjectId;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: SalesOrderStatus;
  createdAt: Date;
  createdBy: mongoose.Types.ObjectId;
}

const SalesOrderSchema = new Schema<ISalesOrder>({
  orderNumber: { type: String, required: true, unique: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["created", "processing", "shipped", "delivered", "cancelled"],
    default: "created",
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

SalesOrderSchema.index({ orderNumber: "text" });
SalesOrderSchema.index({ createdAt: -1 });

export const SalesOrder: Model<ISalesOrder> =
  mongoose.models.SalesOrder || mongoose.model<ISalesOrder>("SalesOrder", SalesOrderSchema);
