'use client';

import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

export default function AboutErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl sm:text-3xl">ℹ️</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Page Error</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          We encountered an error loading this page. Please try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors text-sm sm:text-base flex-1"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Retry
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm sm:text-base flex-1"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            Home
          </Link>
        </div>

        {/* Support */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Questions?</p>
          <a 
            href="mailto:hello@luxecart.com"
            className="text-sm sm:text-base font-medium text-gray-700 hover:text-black transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
