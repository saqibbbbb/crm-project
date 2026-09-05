import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CustomerOption, SalesOrder, SalesOrderFormData } from "../../types";

interface SalesOrderFormProps {
  customers: CustomerOption[];
  onAdd: (order: SalesOrderFormData) => void;
  onUpdate: (id: string, data: SalesOrderFormData) => void;
  editingOrder: SalesOrder | null;
  onCancelEdit: () => void;
}

const emptyForm: SalesOrderFormData = {
  customerId: "",
  productName: "",
  quantity: 1,
  totalAmount: "",
  status: "created",
};

function toFormData(order: SalesOrder | null): SalesOrderFormData {
  if (!order) return emptyForm;
  return {
    customerId: order.customerId,
    productName: order.productName,
    quantity: order.quantity,
    totalAmount: order.totalAmount,
    status: order.status,
  };
}

/** Parent remounts this via `key={editingOrder?.id ?? "new"}` so the
 * lazy initializer below is all that's needed to load edit data — no effect. */
const SalesOrderForm = ({ customers, onAdd, onUpdate, editingOrder, onCancelEdit }: SalesOrderFormProps) => {
  const [formData, setFormData] = useState<SalesOrderFormData>(() => toFormData(editingOrder));

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.customerId || !formData.productName) return;

    const payload: SalesOrderFormData = {
      ...formData,
      quantity: Number(formData.quantity),
      totalAmount: Number(formData.totalAmount),
    };

    if (editingOrder) {
      onUpdate(editingOrder.id, payload);
    } else {
      onAdd(payload);
    }
    setFormData(emptyForm);
  };

  const inputClass = "glass-input rounded-xl p-2.5";
  const labelClass = "text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 block";

  return (
    <form
      className="glass rounded-2xl p-6"
      onSubmit={handleSubmit}
    >
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-5">
        {editingOrder ? "Update Sales Order" : "Create Sales Order"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="sm:col-span-2">
          <span className={labelClass}>Customer</span>
          <select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>

        <label className="sm:col-span-2">
          <span className={labelClass}>Product</span>
          <input name="productName" placeholder="Product name" value={formData.productName} onChange={handleChange} className={inputClass} />
        </label>

        <label>
          <span className={labelClass}>Quantity</span>
          <input name="quantity" type="number" min={1} value={formData.quantity} onChange={handleChange} className={inputClass} />
        </label>

        <label>
          <span className={labelClass}>Amount (₹)</span>
          <input name="totalAmount" placeholder="0" value={formData.totalAmount} onChange={handleChange} className={inputClass} />
        </label>

        {editingOrder && (
          <label className="sm:col-span-2">
            <span className={labelClass}>Status</span>
            <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
              <option value="created">Created</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        )}
      </div>

      <div className="flex gap-3 mt-5">
        <button className="btn-primary px-4 py-2.5 rounded-xl text-sm">
          {editingOrder ? "Update Order" : "Add Order"}
        </button>
        {editingOrder && (
          <button type="button" onClick={onCancelEdit} className="btn-ghost px-4 py-2.5 rounded-xl text-sm">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default SalesOrderForm;
