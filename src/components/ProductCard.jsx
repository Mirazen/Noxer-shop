import React, { useState } from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  const {
    name,
    price,
    old_price,
    image,
    in_stock,
    stock,
    rating,
    reviews_count,
    discount
  } = product;

  const isInStock = in_stock !== false && stock !== 0 && stock !== false;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {discount && discount > 0 && <span className="discount-badge">-{discount}%</span>}
        {!isInStock && <span className="stock-badge">Нет в наличии</span>}
        {!imageError && image ? (
          <img 
            src={image} 
            alt=""
            className="product-image"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="product-image-placeholder">
            <span>Нет фото</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        
        {rating && rating > 0 && (
          <div className="product-rating">
            <span className="stars">{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
            {reviews_count && reviews_count > 0 && <span className="reviews">({reviews_count})</span>}
          </div>
        )}
        
        <div className="product-pricing">
          <span className="product-price">{price ? `${price} ₽` : 'Цена не указана'}</span>
          {old_price && old_price > price && <span className="product-old-price">{old_price} ₽</span>}
        </div>
        
        <button 
          className={`add-to-cart-button ${!isInStock ? 'disabled' : ''}`}
          disabled={!isInStock}
        >
          {isInStock ? 'В корзину' : 'Недоступно'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
