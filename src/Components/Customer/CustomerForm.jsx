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

  const inputClass =
    "w-full p-2.5 rounded-md bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors";
  const labelClass = "text-xs text-zinc-500 mb-1.5 block";

  return (
    <form
      className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-100 dark:bg-zinc-900"
      onSubmit={handleSubmit}
    >
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-5">
        {editingCustomer ? "Update Customer" : "Add Customer"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label>
          <span className={labelClass}>Name</span>
          <input name="name" placeholder="Jane Doe" value={formData.name} onChange={handleChange} className={inputClass} />
        </label>

        <label>
          <span className={labelClass}>Email</span>
          <input name="email" placeholder="jane@company.com" value={formData.email} onChange={handleChange} className={inputClass} />
        </label>

        <label>
          <span className={labelClass}>Phone</span>
          <input name="phone" placeholder="9876543210" value={formData.phone} onChange={handleChange} className={inputClass} />
        </label>

        <label>
          <span className={labelClass}>Company</span>
          <input name="company" placeholder="Acme Inc." value={formData.company} onChange={handleChange} className={inputClass} />
        </label>

        <label className="sm:col-span-2">
          <span className={labelClass}>Status</span>
          <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
            <option value="lead">Lead</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>

      <button className="mt-5 px-4 py-2.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors">
        {editingCustomer ? "Update Customer" : "Add Customer"}
      </button>
    </form>
  );
};

export default CustomerForm;
