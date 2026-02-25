import { useState, useRef } from "react";
import CartSidebar from "./components/CartSidebar";
import ProductCard from "./components/ProductCard";
import { products } from "./data";
import "./components/ShoppingCart.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [checkoutDone, setCheckoutDone] = useState(false);
  
  // 1. Create a reference to the cart section
  const cartRef = useRef(null);

  // 2. Create the scroll function
  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCheckoutDone(false);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  const handleCheckout = () => {
    setCart([]);
    setCheckoutDone(true);
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? (subtotal > 300 ? 0 : 12.99) : 0;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="app">
      <header>
        <div className="logo">Ma<span>ison</span></div>
        {/* 3. Attach the scroll function to the button */}
        <button className="cart-toggle" onClick={scrollToCart}>
          Bag
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </button>
      </header>

      <div className="main">
        <div>
          <div className="section-title">New Collection</div>
          <div className="section-sub">Curated essentials for the modern wardrobe</div>
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
        </div>

        {/* 4. Wrap the CartSidebar in a div with our ref */}
        <div ref={cartRef}>
          <CartSidebar
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            totalItems={totalItems}
            updateQty={updateQty}
            removeItem={removeItem}
            clearCart={clearCart}
            handleCheckout={handleCheckout}
            checkoutDone={checkoutDone}
          />
        </div>
      </div>
    </div>
  );
}