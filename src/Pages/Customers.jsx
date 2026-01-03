import { useEffect, useState } from "react";
import CustomerForm from "../Components/Customer/CustomerForm";
import CustomerList from "../Components/Customer/CustomerList";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../Services/customerService";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  const refresh = () => setCustomers(getCustomers());

  const handleAdd = (customer) => {
    addCustomer(customer);
    refresh();
  };

  const handleUpdate = (id, data) => {
    updateCustomer(id, data);
    setEditingCustomer(null);
    refresh();
  };

  const handleDelete = (id) => {
    deleteCustomer(id);
    refresh();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customers</h2>

      <CustomerForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingCustomer={editingCustomer}
      />

      <CustomerList
        customers={customers}
        onEdit={setEditingCustomer}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Customer;
