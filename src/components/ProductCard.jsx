export default function ProductCard({ product, inCart, addToCart }) {
  return (
    <div className="product-card">
      {inCart && <div className="in-cart-indicator">In bag</div>}

      <div
        className="product-img"
        style={{ background: product.color + "22" }}
      >
        {product.image}
      </div>

      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <div className="product-name">{product.name}</div>

        <div className="product-footer">
          <div className="product-price">
            ${product.price.toFixed(2)}
          </div>

          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}