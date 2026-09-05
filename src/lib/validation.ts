import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const customerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(7, "Phone number is too short"),
  company: z.string().trim().min(1, "Company is required"),
  status: z.enum(["lead", "active", "inactive"]).default("lead"),
});

export const customerUpdateSchema = customerSchema.partial();

export const salesOrderSchema = z.object({
  customerId: z.string().trim().min(1, "Customer is required"),
  productName: z.string().trim().min(1, "Product name is required"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
  totalAmount: z.coerce.number().min(0, "Amount must be positive"),
  status: z
    .enum(["created", "processing", "shipped", "delivered", "cancelled"])
    .default("created"),
});

export const salesOrderUpdateSchema = salesOrderSchema.partial();
