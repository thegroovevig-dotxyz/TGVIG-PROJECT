function TransactionTable({ data }) {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Member</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((t) => (
          <tr key={t._id}>
            <td>
             <td>{t.memberId?.firstName || "N/A"}</td>
            </td>
            <td>{t.type}</td>
            <td>R{t.amount || 0}</td>
            <td>{t.status}</td>
            <td>
              {new Date(t.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;