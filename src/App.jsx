import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input) return;

    const newItem = {
      id: Date.now(),
      name: input,
      status: "available",
      claimedAt: null,
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const claimItem = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.status === "available") {
          // Start expiry timer (Ghost Buyer)
          setTimeout(() => {
            setItems((current) =>
              current.map((i) =>
                i.id === id && i.status === "claimed"
                  ? { ...i, status: "available", claimedAt: null }
                  : i
              )
            );
          }, 10000);

          return {
            ...item,
            status: "claimed",
            claimedAt: Date.now(),
          };
        }
        return item;
      })
    );
  };

  const markSold = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "sold" } : item
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dorm Marketplace</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={addItem}>Add Item</button>

      <hr />

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          <b>{item.name}</b> — {item.status}

          {item.status === "available" && (
            <button onClick={() => claimItem(item.id)}>Claim</button>
          )}

          {item.status !== "sold" && (
            <button onClick={() => markSold(item.id)}>
              Mark as Sold
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;