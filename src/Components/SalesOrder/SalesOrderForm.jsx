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

  return (
    <form className="border p-4 mb-4" onSubmit={handleSubmit}>
      <h3 className="font-semibold">Create Sales Order</h3>

      <select name="customerId" value={formData.customerId} onChange={handleChange} required>
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input name="productName" placeholder="Product" value={formData.productName} onChange={handleChange} />
      <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
      <input name="totalAmount" placeholder="Amount" value={formData.totalAmount} onChange={handleChange} />

      <button>Add Order</button>
    </form>
  );
};

export default SalesOrderForm;
