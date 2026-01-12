import initialOrders from "../data/salesOrders.json";

let salesOrders = [...initialOrders];

export const getSalesOrders = () => salesOrders;

export const addSalesOrder = (order) => {
  salesOrders = [
    ...salesOrders,
    {
      id: Date.now(),
      orderNumber: `SO-${Date.now()}`,
      ...order,
      createdAt: new Date().toISOString(),
    },
  ];
};

export const deleteSalesOrder = (id) => {
  salesOrders = salesOrders.filter((o) => o.id !== id);
};

export const getOrdersByCustomer = (customerId) => {
  return salesOrders.filter((o) => o.customerId === customerId);
};
