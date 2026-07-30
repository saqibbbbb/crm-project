import { useEffect, useState } from "react";
import { getCustomers } from "../Services/customerService";
import { getSalesOrders, addSalesOrder } from "../Services/salesOrderService";
import SalesOrderForm from "../Components/SalesOrder/SalesOrderForm";
import SalesOrderList from "../Components/SalesOrder/SalesOrderList";
import type { Customer, SalesOrder as SalesOrderType, SalesOrderFormData } from "../types";

const SalesOrder = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<SalesOrderType[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
    setOrders(getSalesOrders());
  }, []);

  const handleAdd = (order: SalesOrderFormData) => {
    addSalesOrder(order);
    setOrders(getSalesOrders());
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-zinc-500">
        Track orders placed by your customers.
      </p>
      <SalesOrderForm customers={customers} onAdd={handleAdd} />
      <SalesOrderList orders={orders} />
    </div>
  );
};

export default SalesOrder;
