"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative">
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-300">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              quality={75}
            />
          </div>

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Add Button */}
          <button
            className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>

          {/* Price Tag */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            ${product.price}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-black transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">Premium Quality</p>
        </div>
      </div>
    </div>
  );
}
