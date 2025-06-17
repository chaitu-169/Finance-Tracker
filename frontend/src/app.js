import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ date: "", category: "", description: "", amount: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/expenses").then((res) => setExpenses(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/expenses", form);
    setForm({ date: "", category: "", description: "", amount: "" });
    const res = await axios.get("http://localhost:5000/expenses");
    setExpenses(res.data);
  };

  return (
    <div className="container">
      <h2>💸 Personal Finance Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input name="date" type="date" onChange={handleChange} value={form.date} required />
        <input name="category" placeholder="Category" onChange={handleChange} value={form.category} required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} />
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} value={form.amount} required />
        <button type="submit">Add Expense</button>
      </form>

      <h3>All Expenses:</h3>
      <ul>
        {expenses.map((e, i) => (
          <li key={i}>{e.date} - ₹{e.amount} [{e.category}] - {e.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
