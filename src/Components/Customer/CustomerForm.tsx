import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Customer, CustomerFormData } from "../../types";

interface CustomerFormProps {
  onAdd: (customer: CustomerFormData) => void;
  onUpdate: (id: string, data: CustomerFormData) => void;
  editingCustomer: Customer | null;
}

const emptyForm: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "lead",
};

/** Parent remounts this via `key={editingCustomer?.id ?? "new"}` so the
 * lazy initializer below is all that's needed to load edit data — no effect. */
const CustomerForm = ({ onAdd, onUpdate, editingCustomer }: CustomerFormProps) => {
  const [formData, setFormData] = useState<CustomerFormData>(() => editingCustomer ?? emptyForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      return;
    }

    if (editingCustomer) {
      onUpdate(editingCustomer.id, formData);
    } else {
      onAdd(formData);
    }

    setFormData(emptyForm);
  };

  const inputClass = "glass-input rounded-xl p-2.5";
  const labelClass = "text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 block";

  return (
    <form
      className="glass p-6 rounded-2xl"
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

      <button className="btn-primary mt-5 px-4 py-2.5 rounded-xl text-sm">
        {editingCustomer ? "Update Customer" : "Add Customer"}
      </button>
    </form>
  );
};

export default CustomerForm;
