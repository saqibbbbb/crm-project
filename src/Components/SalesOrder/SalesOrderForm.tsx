import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Customer, SalesOrderFormData } from "../../types";

interface SalesOrderFormProps {
  customers: Customer[];
  onAdd: (order: SalesOrderFormData) => void;
}

const SalesOrderForm = ({ customers, onAdd }: SalesOrderFormProps) => {
  const [formData, setFormData] = useState<SalesOrderFormData>({
    customerId: "",
    productName: "",
    quantity: 1,
    totalAmount: "",
    status: "created",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ ...formData, customerId: Number(formData.customerId) });
    setFormData({
      customerId: "",
      productName: "",
      quantity: 1,
      totalAmount: "",
      status: "created",
    });
  };

  const inputClass = "glass-input rounded-xl p-2.5";
  const labelClass = "text-xs text-zinc-500 mb-1.5 block";

  return (
    <form
      className="glass rounded-2xl p-6"
      onSubmit={handleSubmit}
    >
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-5">Create Sales Order</h3>

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
          <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} className={inputClass} />
        </label>

        <label>
          <span className={labelClass}>Amount (₹)</span>
          <input name="totalAmount" placeholder="0" value={formData.totalAmount} onChange={handleChange} className={inputClass} />
        </label>
      </div>

      <button className="btn-primary mt-5 px-4 py-2.5 rounded-xl text-sm">
        Add Order
      </button>
    </form>
  );
};

export default SalesOrderForm;
