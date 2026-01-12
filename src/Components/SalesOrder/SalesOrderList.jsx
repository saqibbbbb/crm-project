const SalesOrderList = ({ orders }) => {
  if (!orders.length) return <p>No sales orders.</p>;

  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>
          {o.orderNumber} | {o.productName} | ₹{o.totalAmount}
        </li>
      ))}
    </ul>
  );
};

export default SalesOrderList;
