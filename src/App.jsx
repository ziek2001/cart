import CartSidebar from "./components/CartSidebar";
import { useState } from "react";
import { products } from "./data";
import ProductCard from "./components/ProductCard";
import CartItem from "./components/CartItem";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const shipping =
    subtotal > 0 ? (subtotal > 300 ? 0 : 12.99) : 0;

  const total = subtotal + shipping;

  return (
    <div className="app">
      <div className="main">
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              inCart={cart.find((i) => i.id === p.id)}
              addToCart={addToCart}
            />
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQty={updateQty}
                removeItem={removeItem}
              />
            ))}
          </div>

          <div className="cart-footer">
            <div>Total: ${total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}