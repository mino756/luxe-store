'use client';

import Link from 'next/link';
import { Package, Home, ChevronLeft } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md">
        {/* 404 Text */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-2">404</h1>
          <div className="h-1 sm:h-1.5 bg-gradient-to-r from-transparent via-black to-transparent w-full"></div>
        </div>

        {/* Icon */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <Package className="w-16 h-16 sm:w-20 sm:h-20 text-black opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl sm:text-3xl">📦</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Product Not Found</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-12">
          Sorry! This product is no longer available or doesn't exist. Browse our collection to find similar items.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/collection"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors text-sm sm:text-base"
          >
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            View Collections
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Go Back
          </button>
        </div>

        {/* Recommendations */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Need help?</p>
          <div className="flex flex-col gap-2">
            <Link href="/collection" className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors font-medium">
              → Browse All Products
            </Link>
            <Link href="/about" className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors font-medium">
              → Contact Us
            </Link>
            <Link href="/" className="text-sm sm:text-base text-gray-700 hover:text-black transition-colors font-medium">
              → Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
