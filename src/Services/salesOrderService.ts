import initialOrders from "../data/salesOrders.json";
import type { SalesOrder, SalesOrderFormData } from "../types";

let salesOrders: SalesOrder[] = [...(initialOrders as SalesOrder[])];

export const getSalesOrders = () => salesOrders;

export const addSalesOrder = (order: SalesOrderFormData) => {
  salesOrders = [
    ...salesOrders,
    {
      id: Date.now(),
      orderNumber: `SO-${Date.now()}`,
      ...order,
      customerId: Number(order.customerId),
      totalAmount: Number(order.totalAmount),
      createdAt: new Date().toISOString(),
    },
  ];
};

export const deleteSalesOrder = (id: number) => {
  salesOrders = salesOrders.filter((o) => o.id !== id);
};

export const getOrdersByCustomer = (customerId: number) => {
  return salesOrders.filter((o) => o.customerId === customerId);
};
