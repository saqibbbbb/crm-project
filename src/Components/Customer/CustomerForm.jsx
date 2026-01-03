import { useEffect, useState } from "react";

const CustomerForm = ({ onAdd, onUpdate, editingCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "lead",
  });

  useEffect(() => {
    if (editingCustomer) {
      setFormData(editingCustomer);
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      return;
    }

    if (editingCustomer) {
      onUpdate(editingCustomer.id, formData);
    } else {
      onAdd(formData);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "lead",
    });
  };

  return (
    <form className="mb-6 p-4 border rounded flex flex-col gap-3" onSubmit={handleSubmit}>
      <h3 className="font-semibold">
        {editingCustomer ? "Update Customer" : "Add Customer"}
      </h3>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border rounded" />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded" />
      <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="p-2 border rounded" />

      <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
        <option value="lead">Lead</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button className="border p-2 rounded">
        {editingCustomer ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default CustomerForm;
