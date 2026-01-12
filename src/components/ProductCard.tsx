'use client';

import React from 'react';

interface ProductCardProps {
    rank?: 'recommended' | 'alternative' | 'budget';
    name: string;
    brand: string;
    price: number;
    servings: number;
    pricePerServing: number;
    description: string;
    buyLink: string;
    flavors?: string[]; // Available flavor variants
}

const rankLabels: Record<string, string> = {
    recommended: 'რეკომენდებული',
    alternative: 'ალტერნატივა',
    budget: 'ბიუჯეტური',
};

export function ProductCard({
    rank,
    name,
    brand,
    price,
    servings,
    pricePerServing,
    description,
    buyLink,
    flavors,
}: ProductCardProps) {
    return (
        <div className="product-card">
            {rank && (
                <span className={`product-badge product-badge--${rank}`}>
                    {rankLabels[rank]}
                </span>
            )}

            <h3 className="product-name">{name}</h3>
            <p className="product-brand">{brand}</p>

            {/* Flavors display */}
            {flavors && flavors.length > 0 && (
                <p className="product-flavors">
                    <span className="product-flavors-label">გემოები:</span>{' '}
                    {flavors.join(', ')}
                </p>
            )}

            <div className="product-price-section">
                <span className="product-price">{price} ₾</span>
                <span className="product-specs">
                    {servings} პორცია · {pricePerServing.toFixed(2)} ₾/პორცია
                </span>
            </div>

            <p className="product-description">{description}</p>

            <a
                href={buyLink}
                className="product-buy-button"
                target="_blank"
                rel="noopener noreferrer"
            >
                ყიდვა →
            </a>
        </div>
    );
}

export default ProductCard;

