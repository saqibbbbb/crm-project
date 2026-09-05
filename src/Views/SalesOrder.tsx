import { useEffect, useState } from "react";
import { getCustomerOptions } from "../Services/customerService";
import {
  getSalesOrders,
  addSalesOrder,
  updateSalesOrder,
  deleteSalesOrder,
} from "../Services/salesOrderService";
import SalesOrderForm from "../Components/SalesOrder/SalesOrderForm";
import SalesOrderList from "../Components/SalesOrder/SalesOrderList";
import Pagination from "../Components/Common/Pagination";
import SearchFilterBar from "../Components/Common/SearchFilterBar";
import type { CustomerOption, SalesOrder as SalesOrderType, SalesOrderFormData } from "../types";

const STATUS_OPTIONS = [
  { value: "created", label: "Created" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const SalesOrder = () => {
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [orders, setOrders] = useState<SalesOrderType[]>([]);
  const [editingOrder, setEditingOrder] = useState<SalesOrderType | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCustomerOptions().then(setCustomers).catch(() => setCustomers([]));
  }, []);

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getSalesOrders({ q: search, status, page, limit: 10 });
      setOrders(result.data);
      setTotalPages(result.totalPages);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sales orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status, page]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleAdd = async (order: SalesOrderFormData) => {
    await addSalesOrder(order);
    await refresh();
  };

  const handleUpdate = async (id: string, data: SalesOrderFormData) => {
    await updateSalesOrder(id, data);
    setEditingOrder(null);
    await refresh();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSalesOrder(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete sales order");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-zinc-500">
        Track orders placed by your customers.
      </p>
      <SalesOrderForm
        key={editingOrder?.id ?? "new"}
        customers={customers}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingOrder={editingOrder}
        onCancelEdit={() => setEditingOrder(null)}
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by order number or product..."
        statusOptions={STATUS_OPTIONS}
        status={status}
        onStatusChange={setStatus}
      />

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
          {error}
        </p>
      )}

      {loading ? (
        <div className="glass-subtle rounded-2xl py-12 text-center text-sm text-zinc-500">Loading...</div>
      ) : (
        <>
          <SalesOrderList orders={orders} onEdit={setEditingOrder} onDelete={handleDelete} />
          <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default SalesOrder;
