'use client';

import { AlertCircle } from 'lucide-react';

export default function DemoNotice() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 p-4 sm:p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold text-amber-900">⚠️ Demo Checkout</h3>
          <p className="text-amber-800 mt-2 text-sm sm:text-base leading-relaxed">
            This is a demonstration checkout. No real payments will be processed. Your order data will be saved locally for preview purposes only. To set up real payments, integrate with Stripe, PayPal, or another payment provider.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800\">
              🔒 Secure Demo
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800\">
              💾 Local Storage Only
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}