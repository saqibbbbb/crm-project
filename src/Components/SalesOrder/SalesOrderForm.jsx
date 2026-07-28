import { useState } from "react";

const SalesOrderForm = ({ customers, onAdd }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    productName: "",
    quantity: 1,
    totalAmount: "",
    status: "created",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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

  const inputClass =
    "w-full p-2.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors";
  const labelClass = "text-xs text-zinc-500 mb-1.5 block";

  return (
    <form
      className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-100 dark:bg-zinc-900 p-6"
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

      <button className="mt-5 px-4 py-2.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors">
        Add Order
      </button>
    </form>
  );
};

export default SalesOrderForm;
