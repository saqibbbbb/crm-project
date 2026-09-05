import mongoose, { Schema, type Document, type Model } from "mongoose";

export type CustomerStatus = "lead" | "active" | "inactive";

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  createdAt: Date;
  createdBy: mongoose.Types.ObjectId;
}

const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  status: { type: String, enum: ["lead", "active", "inactive"], default: "lead" },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

CustomerSchema.index({ name: "text", email: "text", company: "text" });

export const Customer: Model<ICustomer> =
  mongoose.models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema);
