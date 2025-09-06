"use client";

import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import { ProductCardProps } from "@/types/product/productCard";



const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "",
  imageHeight = "h-60",
  showCategory = true,
  showRating = true,
  showActions = true,
  onAddToCart,
  onQuickView,
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add wishlist logic here
    console.log("Added to wishlist:", product);
  };

  // Calculate discount percentage if original price exists
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <CardContainer className={`inter-var ${className}`}>
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 border transition-all duration-300">
        {/* Badges */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {product.isNew && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-xl ">
              NEW
            </span>
          )}
          {product.isSale && discountPercentage > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-xl ">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Category */}
        {showCategory && product.category && (
          <CardItem
            translateZ="20"
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1 "
          >
            {product.category}
          </CardItem>
        )}

        {/* Product Image */}
        <CardItem translateZ="100" className="w-full mt-7 relative">
          <div className={`relative w-full ${imageHeight} overflow-hidden rounded-xl px-1 py-4 `}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover/card:shadow-xl transition-all duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardItem>

        {/* Product Name */}
        <CardItem
          translateZ="50"
          className="text-lg font-bold text-neutral-700 dark:text-white mt-4 line-clamp-1"
        >
          {product.name}
        </CardItem>

        {/* Product Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
        >
          {product.description}
        </CardItem>

        {/* Rating */}
        {showRating && product.rating && (
          <CardItem translateZ="30" className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({product.reviewCount || 0})
              </span>
            </div>
          </CardItem>
        )}

        {/* Price */}
        <CardItem translateZ="40" className="flex items-center mt-3">
          <span className="text-xl font-bold text-neutral-700 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </CardItem>

        {/* Actions */}
        {showActions && (
          <div className="flex justify-between items-center mt-6">
            <CardItem
              translateZ="20"
              as="button"
              onClick={handleQuickView}
              className="px-4 py-2 hover:cursor-pointer rounded-xl text-xs font-normal dark:text-white text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Quick View
            </CardItem>

            <CardItem
              translateZ="20"
              as="button"
              onClick={handleWishlist}
              className="p-2 rounded-xl hover:cursor-pointer text-xs font-normal text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <FaHeart size={18} />
            </CardItem>
            
            <CardItem
              translateZ="20"
              as="button"
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-xl hover:cursor-pointer bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Add to Cart
            </CardItem>
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;