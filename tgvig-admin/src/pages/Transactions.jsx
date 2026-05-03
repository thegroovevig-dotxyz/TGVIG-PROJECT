import { useEffect, useState } from "react";
import { getTransactions } from "../api/transactions.api";

import TransactionTable from "../components/tables/TransactionTable";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    const res = await getTransactions();
    setTransactions(res.data);
  };

  return (
    <div>
      <h2>Transactions</h2>

      <TransactionTable data={transactions} />
    </div>
  );
}

export default Transactions;