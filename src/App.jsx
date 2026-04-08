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
          // Ghost buyer expiry (10 sec)
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Dorm Marketplace App 🚀</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item name"
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={addItem}>Add Item</button>

      <hr />

      {items.length === 0 && <p>No items listed yet</p>}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <b>{item.name}</b> — {item.status}

          <div style={{ marginTop: "5px" }}>
            {item.status === "available" && (
              <button onClick={() => claimItem(item.id)}>Claim</button>
            )}

            {item.status !== "sold" && (
              <button
                onClick={() => markSold(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Mark as Sold
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;