import initialCustomers from "../data/customers.json";
import type { Customer, CustomerFormData } from "../types";

let customers: Customer[] = [...(initialCustomers as Customer[])];

export const getCustomers = () => customers;

export const addCustomer = (customer: CustomerFormData) => {
  customers = [
    ...customers,
    {
      id: Date.now(),
      ...customer,
      createdAt: new Date().toISOString(),
    },
  ];
};

export const updateCustomer = (id: number, updatedData: Partial<CustomerFormData>) => {
  customers = customers.map((c) =>
    c.id === id ? { ...c, ...updatedData } : c
  );
};

export const deleteCustomer = (id: number) => {
  customers = customers.filter((c) => c.id !== id);
};
