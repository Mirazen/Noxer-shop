import React, { useState } from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  let imageUrl = null;
  if (product.images && product.images.length > 0) {
    for (let i = 0; i < product.images.length; i++) {
      if (product.images[i].MainImage === true) {
        imageUrl = product.images[i].Image_URL || product.images[i].image_url;
        break;
      }
    }
    if (!imageUrl) {
      imageUrl = product.images[0].Image_URL || product.images[0].image_url;
    }
  }

  let discountPercent = 0;
  if (product.old_price && product.old_price > product.price) {
    discountPercent = Math.round(((product.old_price - product.price) / product.old_price) * 100);
  }

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {discountPercent > 0 && (
          <span className="discount-badge">-{discountPercent}%</span>
        )}
        {!imageError && imageUrl ? (
          <img 
            src={imageUrl} 
            alt=""
            className="product-image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="product-image-placeholder">
            <span>Нет фото</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-pricing">
          <span className="product-price">
            {product.price ? product.price + ' ₽' : 'Цена не указана'}
          </span>
          {product.old_price && product.old_price > product.price && (
            <span className="product-old-price">{product.old_price} ₽</span>
          )}
        </div>
        
        <button className="add-to-cart-button">
          В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
