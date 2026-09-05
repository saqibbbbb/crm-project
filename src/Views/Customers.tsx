import { useEffect, useState } from "react";
import CustomerForm from "../Components/Customer/CustomerForm";
import CustomerList from "../Components/Customer/CustomerList";
import Pagination from "../Components/Common/Pagination";
import SearchFilterBar from "../Components/Common/SearchFilterBar";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../Services/customerService";
import type { Customer as CustomerType, CustomerFormData } from "../types";

const STATUS_OPTIONS = [
  { value: "lead", label: "Lead" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const Customer = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<CustomerType | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getCustomers({ q: search, status, page, limit: 10 });
      setCustomers(result.data);
      setTotalPages(result.totalPages);
      setTotal(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load customers");
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

  const handleAdd = async (customer: CustomerFormData) => {
    await addCustomer(customer);
    await refresh();
  };

  const handleUpdate = async (id: string, data: CustomerFormData) => {
    await updateCustomer(id, data);
    setEditingCustomer(null);
    await refresh();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete customer");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Manage your leads and customer accounts.
      </p>

      <CustomerForm
        key={editingCustomer?.id ?? "new"}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingCustomer={editingCustomer}
      />

      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, or company..."
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
        <div className="glass-subtle rounded-2xl py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">Loading...</div>
      ) : (
        <>
          <CustomerList
            customers={customers}
            onEdit={setEditingCustomer}
            onDelete={handleDelete}
          />
          <Pagination page={page} totalPages={totalPages} total={total} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Customer;
