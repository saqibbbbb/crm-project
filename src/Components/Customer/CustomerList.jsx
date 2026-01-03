const CustomerList = ({ customers, onEdit, onDelete }) => {
  if (!customers.length) return <p>No customers found.</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr className="border-b">
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((c) => (
          <tr key={c.id} className="border-b">
            <td>{c.name}</td>
            <td>{c.company}</td>
            <td>{c.email}</td>
            <td>{c.status}</td>
            <td className="flex gap-2">
              <button
                onClick={() => onEdit(c)}
                className="border px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="border px-2 rounded text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerList;
