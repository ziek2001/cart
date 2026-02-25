import CartItem from "./CartItem";

export default function CartSidebar({
  cart,
  subtotal,
  shipping,
  total,
  totalItems,
  updateQty,
  removeItem,
  clearCart,
  handleCheckout,
  checkoutDone,
}) {
  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <div className="cart-title">Your Bag</div>
        {totalItems > 0 && (
          <div className="cart-count">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </div>
        )}
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛍</div>
            <p>
              {checkoutDone
                ? "Thank you for your order!"
                : "Your bag is empty"}
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQty={updateQty}
              removeItem={removeItem}
            />
          ))
        )}
      </div>

      <div className="cart-footer">
        {cart.length > 0 && (
          <>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "Free"
                  : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {subtotal > 0 && subtotal < 300 && (
              <div
                style={{
                  fontSize: 11,
                  color: "var(--gold)",
                  letterSpacing: "0.5px",
                  marginBottom: 4,
                }}
              >
                Add ${(300 - subtotal).toFixed(2)} more for free
                shipping
              </div>
            )}
          </>
        )}

        <div className="cart-total-row">
          <span className="total-label">Total</span>
          <span className="total-amount">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>

        {cart.length > 0 && (
          <button className="clear-btn" onClick={clearCart}>
            Clear bag
          </button>
        )}
      </div>
    </div>
  );
}