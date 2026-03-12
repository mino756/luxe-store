'use client';

import Image from 'next/image';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  color?: string;
  size?: string;
}

interface OrderSummaryProps {
  items: OrderItem[];
  total: number;
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200 shadow-sm">
      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-bold rounded-full">
          {items.length}
        </span>
        Order Summary
      </h2>

      {/* Items List */}
      <div className="space-y-0 mb-6 max-h-80 overflow-y-auto">\n        {items && items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 px-3 hover:bg-gray-50 rounded transition border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {item.image && (
                  <div className="relative w-14 h-14 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{item.title}</p>
                  <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                    {item.color && <p>Color: <span className="font-semibold text-gray-700">{item.color}</span></p>}
                    {item.size && <p>Size: <span className="font-semibold text-gray-700">{item.size}</span></p>}
                    <p>Qty: <span className="font-semibold text-gray-700">{item.quantity}</span></p>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="font-bold text-gray-900 text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                {item.originalPrice && item.originalPrice > item.price ? (
                  <div className="text-xs mt-1 space-y-0.5">
                    <p className="text-gray-400 line-through">${(item.originalPrice).toFixed(2)}</p>
                    <p className="text-green-600 font-semibold">Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">${item.price.toFixed(2)}/ea</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-12 text-sm">No items in cart</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t-2 border-gray-200 my-6"></div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900 font-medium">Calculated</span>
        </div>
      </div>

      {/* Total */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-gray-900">Total:</p>
          <p className="text-2xl font-bold text-black">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">💡 Demo Mode:</span> No payment will be charged
        </p>
      </div>
    </div>
  );
}