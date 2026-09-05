import type { Customer, CustomerFormData, CustomerOption, PaginatedResponse } from "../types";

export interface CustomerQuery {
  q?: string;
  status?: string;
  page?: number;
  limit?: number;
}

async function parseJson(response: Response) {
  return response.json().catch(() => ({}));
}

export const getCustomers = async (query: CustomerQuery = {}): Promise<PaginatedResponse<Customer>> => {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.status) params.set("status", query.status);
  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 10));

  const response = await fetch(`/api/customers?${params.toString()}`);
  const body = await parseJson(response);
  if (!response.ok) throw new Error(body.error ?? "Failed to load customers");
  return body as PaginatedResponse<Customer>;
};

export const getCustomerOptions = async (): Promise<CustomerOption[]> => {
  const response = await fetch("/api/customers/options");
  const body = await parseJson(response);
  if (!response.ok) throw new Error(body.error ?? "Failed to load customers");
  return body.data as CustomerOption[];
};

export const addCustomer = async (customer: CustomerFormData): Promise<Customer> => {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });
  const body = await parseJson(response);
  if (!response.ok) throw new Error(body.error ?? "Failed to add customer");
  return body.data as Customer;
};

export const updateCustomer = async (id: string, updatedData: Partial<CustomerFormData>): Promise<Customer> => {
  const response = await fetch(`/api/customers/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  const body = await parseJson(response);
  if (!response.ok) throw new Error(body.error ?? "Failed to update customer");
  return body.data as Customer;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  const response = await fetch(`/api/customers/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const body = await parseJson(response);
    throw new Error(body.error ?? "Failed to delete customer");
  }
};
