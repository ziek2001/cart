export default function CartItem({ item, updateQty, removeItem }) {
  return (
    <div className="cart-item">
      <div
        className="cart-item-emoji"
        style={{ background: item.color + "22" }}
      >
        {item.image}
      </div>

      <div>
        <div className="cart-item-name">{item.name}</div>

        <div className="cart-item-controls">
          <button
            className="qty-btn"
            onClick={() => updateQty(item.id, -1)}
          >
            −
          </button>

          <span className="qty-num">{item.qty}</span>

          <button
            className="qty-btn"
            onClick={() => updateQty(item.id, 1)}
          >
            +
          </button>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div className="cart-item-price">
          ${(item.price * item.qty).toFixed(2)}
        </div>

        <button
          className="remove-btn"
          onClick={() => removeItem(item.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
}