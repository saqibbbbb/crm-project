import initialCustomers from "../data/customers.json";

let customers = [...initialCustomers];

export const getCustomers = () => customers;

export const addCustomer = (customer) => {
  customers = [
    ...customers,
    {
      id: Date.now(),
      ...customer,
      createdAt: new Date().toISOString(),
    },
  ];
};

export const updateCustomer = (id, updatedData) => {
  customers = customers.map((c) =>
    c.id === id ? { ...c, ...updatedData } : c
  );
};

export const deleteCustomer = (id) => {
  customers = customers.filter((c) => c.id !== id);
};
