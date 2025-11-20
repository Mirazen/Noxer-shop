import React, { useState } from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  const mainImage = product.images?.find(img => img.MainImage === true) || product.images?.[0];
  const imageUrl = mainImage?.Image_URL || mainImage?.image_url;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {product.old_price && product.old_price > product.price && (
          <span className="discount-badge">
            -{Math.round((1 - product.price / product.old_price) * 100)}%
          </span>
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
            {product.price ? `${product.price} ₽` : 'Цена не указана'}
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
