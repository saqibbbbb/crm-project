import { config } from "dotenv";
config({ path: ".env.local" });

import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { dbConnect } from "../src/lib/mongodb";
import { User } from "../src/models/User";
import { Customer } from "../src/models/Customer";
import { SalesOrder } from "../src/models/SalesOrder";
import { hashPassword } from "../src/lib/auth";

const CUSTOMER_COUNT = 1000;
const ORDER_COUNT = 2000;

const CUSTOMER_STATUSES = ["lead", "active", "inactive"] as const;
const ORDER_STATUSES = ["created", "processing", "shipped", "delivered", "cancelled"] as const;

async function seedUsers() {
  const users = [
    { username: "admin", password: "admin123", role: "admin" as const },
    { username: "saqib", password: "1234", role: "sales_rep" as const },
  ];

  for (const u of users) {
    const passwordHash = await hashPassword(u.password);
    await User.findOneAndUpdate(
      { username: u.username },
      { username: u.username, passwordHash, role: u.role },
      { upsert: true, returnDocument: "after" }
    );
  }

  console.log(`Seeded ${users.length} users (admin/admin123, saqib/1234)`);
}

async function seedCustomers() {
  await Customer.deleteMany({});

  const docs = Array.from({ length: CUSTOMER_COUNT }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    company: faker.company.name(),
    status: faker.helpers.arrayElement(CUSTOMER_STATUSES),
    createdAt: faker.date.past({ years: 1 }),
  }));

  const inserted = await Customer.insertMany(docs);
  console.log(`Seeded ${inserted.length} customers`);
  return inserted;
}

async function seedSalesOrders(customers: Awaited<ReturnType<typeof seedCustomers>>) {
  await SalesOrder.deleteMany({});

  const docs = Array.from({ length: ORDER_COUNT }, (_, i) => {
    const customer = faker.helpers.arrayElement(customers);
    return {
      orderNumber: `SO-${(i + 1).toString().padStart(6, "0")}`,
      customerId: customer._id,
      productName: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 20 }),
      totalAmount: Number(faker.commerce.price({ min: 50, max: 20000 })),
      status: faker.helpers.arrayElement(ORDER_STATUSES),
      createdAt: faker.date.past({ years: 1 }),
    };
  });

  const inserted = await SalesOrder.insertMany(docs);
  console.log(`Seeded ${inserted.length} sales orders`);
}

async function main() {
  await dbConnect();
  await seedUsers();
  const customers = await seedCustomers();
  await seedSalesOrders(customers);
  await mongoose.disconnect();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
