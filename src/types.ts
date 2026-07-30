export type CustomerStatus = "lead" | "active" | "inactive";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  createdAt: string;
}

export type CustomerFormData = Omit<Customer, "id" | "createdAt">;

export type SalesOrderStatus = "created" | "processing" | "shipped" | "delivered" | "cancelled";

export interface SalesOrder {
  id: number;
  orderNumber: string;
  customerId: number;
  productName: string;
  quantity: number;
  totalAmount: number;
  status: SalesOrderStatus;
  createdAt: string;
}

export interface SalesOrderFormData {
  customerId: number | "";
  productName: string;
  quantity: number;
  totalAmount: number | "";
  status: SalesOrderStatus;
}

export interface NavUser {
  username: string;
  password: string;
}

export type ActivePage = "dashboard" | "customers" | "salesOrders";
