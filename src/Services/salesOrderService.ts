import type { SalesOrder, SalesOrderFormData, PaginatedResponse } from "../types";

export interface SalesOrderQuery {
  q?: string;
  status?: string;
  customerId?: string;
  page?: number;
  limit?: number;
}

async function parseJson(response: Response) {
  return response.json().catch(() => ({}));
}

export const getSalesOrders = async (query: SalesOrderQuery = {}): Promise<PaginatedResponse<SalesOrder>> => {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.status) params.set("status", query.status);
  if (query.customerId) params.set("customerId", query.customerId);
  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 10));

  const response = await fetch(`/api/sales-orders?${params.toString()}`);
  const body = await parseJson(response);
  if (!response.ok) throw new Error(body.error ?? "Failed to load sales orders");
  return body as PaginatedResponse<SalesOrder>;
};

export const addSalesOrder = async (order: SalesOrderFormData): Promise<SalesOrder> => {
  const response = await fetch("/api/sales-orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const body = await parseJson(response);
  if (!response.ok) throw new Error(body.error ?? "Failed to add sales order");
  return body.data as SalesOrder;
};

export const updateSalesOrder = async (
  id: string,
  updatedData: Partial<SalesOrderFormData>
): Promise<SalesOrder> => {
  const response = await fetch(`/api/sales-orders/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  const body = await parseJson(response);
  if (!response.ok) throw new Error(body.error ?? "Failed to update sales order");
  return body.data as SalesOrder;
};

export const deleteSalesOrder = async (id: string): Promise<void> => {
  const response = await fetch(`/api/sales-orders/${id}`, { method: "DELETE" });
  if (!response.ok) {
    const body = await parseJson(response);
    throw new Error(body.error ?? "Failed to delete sales order");
  }
};
