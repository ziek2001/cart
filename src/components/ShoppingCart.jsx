import { useState } from "react";
import CartSidebar from "./CartSidebar";
import "./ShoppingCart.css"; // The './' is vital

const products = [
  { id: 1, name: "Merino Wool Sweater", price: 129.99, category: "Clothing", image: "🧥", color: "#C4A882" },
  { id: 2, name: "Leather Tote Bag", price: 249.99, category: "Accessories", image: "👜", color: "#8B6F5E" },
  { id: 3, name: "Minimalist Watch", price: 399.99, category: "Accessories", image: "⌚", color: "#3D3D3D" },
  { id: 4, name: "Linen Trousers", price: 89.99, category: "Clothing", image: "👖", color: "#D4C5B0" },
  { id: 5, name: "Silk Scarf", price: 74.99, category: "Accessories", image: "🧣", color: "#B8A9C9" },
  { id: 6, name: "Canvas Sneakers", price: 109.99, category: "Footwear", image: "👟", color: "#E8E0D5" },
  { id: 7, name: "Cashmere Beanie", price: 59.99, category: "Clothing", image: "🧢", color: "#9CAF88" },
  { id: 8, name: "Leather Loafers", price: 219.99, category: "Footwear", image: "🥿", color: "#A0785A" },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [checkoutDone, setCheckoutDone] = useState(false);

  // ... (all your functions remain the same)

  return (
    <div className="app"> {/* Removed <style> tag */}
      <header>
        <div className="logo">Ma<span>ison</span></div>
        <button className="cart-toggle">
          Bag
          {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </button>
      </header>

      <div className="main">
        <div>
          <div className="section-title">New Collection</div>
          <div className="section-sub">Curated essentials for the modern wardrobe</div>
          <div className="products-grid">
            {products.map((p) => {
              const inCart = cart.find((i) => i.id === p.id);
              return (
                <div key={p.id} className="product-card">
                  {inCart && <div className="in-cart-indicator">In bag</div>}
                  <div className="product-img" style={{ background: p.color + "22" }}>
                    {p.image}
                  </div>
                  <div className="product-info">
                    <div className="product-cat">{p.category}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-footer">
                      <div className="product-price">${p.price.toFixed(2)}</div>
                      <button className="add-btn" onClick={() => addToCart(p)}>+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>
    </div>
  );
}

