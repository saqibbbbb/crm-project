export type CustomerStatus = "lead" | "active" | "inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  createdAt: string;
}

export type CustomerFormData = Omit<Customer, "id" | "createdAt">;

export interface CustomerOption {
  id: string;
  name: string;
  company: string;
}

export type SalesOrderStatus = "created" | "processing" | "shipped" | "delivered" | "cancelled";

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: SalesOrderStatus;
  createdAt: string;
}

export interface SalesOrderFormData {
  customerId: string;
  productName: string;
  quantity: number;
  totalAmount: number | "";
  status: SalesOrderStatus;
}

export type UserRole = "admin" | "sales_rep";

export interface AuthUser {
  username: string;
  role: UserRole;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ActivePage = "dashboard" | "customers" | "salesOrders";
