import { useEffect, useState } from "react";
import { getCustomers } from "../Services/customerService";
import { getSalesOrders, addSalesOrder } from "../Services/salesOrderService";
import SalesOrderForm from "../Components/SalesOrder/SalesOrderForm";
import SalesOrderList from "../Components/SalesOrder/SalesOrderList";

const SalesOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setCustomers(getCustomers());
    setOrders(getSalesOrders());
  }, []);

  const handleAdd = (order) => {
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
