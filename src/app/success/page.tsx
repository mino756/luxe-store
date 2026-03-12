'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, Home } from 'lucide-react';

interface DemoOrder {
  id: string;
  timestamp: string;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  items: Array<{
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    color?: string;
    size?: string;
  }>;
  total: number;
  savings?: number;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    // Retrieve order from localStorage
    const savedOrder = localStorage.getItem('lastDemoOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  const handleDownloadReceipt = () => {
    if (!order) return;

    const receiptContent = `
DEMO ORDER RECEIPT
==================

Order ID: ${order.id}
Date: ${new Date(order.timestamp).toLocaleDateString()} at ${new Date(order.timestamp).toLocaleTimeString()}

CUSTOMER INFORMATION
====================
Name: ${order.customer.fullName}
Email: ${order.customer.email}
Phone: ${order.customer.phone}
Address: ${order.customer.address}${order.customer.state ? ', ' + order.customer.state : ''}
City: ${order.customer.city}
Postal Code: ${order.customer.postalCode}
Country: ${order.customer.country}

ORDER ITEMS DETAILS
===================
${order.items
          .map((item) => {
            const itemTotal = item.price * item.quantity;
            const itemSavings = item.originalPrice ? ((item.originalPrice - item.price) * item.quantity).toFixed(2) : '0.00';
            return `
Product: ${item.title}
Color: ${item.color || 'Not specified'}
Size: ${item.size || 'One size'}
Quantity: ${item.quantity}
Price per unit: $${item.price.toFixed(2)}${
              item.originalPrice ? ` (Originally: $${item.originalPrice.toFixed(2)})` : ''
            }
Item Total: $${itemTotal.toFixed(2)}${item.originalPrice && item.originalPrice > item.price ? ` (You save: $${itemSavings})` : ''}
---`;
          })
          .join('\n')}

ORDER SUMMARY
=============
Subtotal: $${order.total.toFixed(2)}
Shipping: Free
Tax: Calculated at checkout
${order.savings && order.savings > 0 ? `Total Savings: $${order.savings.toFixed(2)}` : ''}

TOTAL AMOUNT: $${order.total.toFixed(2)}

NOTE: This is a demonstration checkout. No real payment was processed.
This order exists only for preview purposes in your local storage.
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demo-receipt-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navbar Spacing */}
      <div className="h-20 sm:h-24"></div>

      {/* Success Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Success Icon & Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full animate-pulse"></div>
              <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-600 relative" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            🎉 Demo Order Received
          </h1>

          <p className="text-lg text-gray-600 mb-2">
            Thank you for your demo order!
          </p>

          <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mt-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Demo Mode:</span> This was a simulated checkout used for demonstration purposes. No real payment was processed.
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="text-xl font-mono font-bold text-gray-900">{order.id}</p>
              <p className="text-sm text-gray-500 mt-3">
                Order Date: {new Date(order.timestamp).toLocaleDateString()} at{' '}
                {new Date(order.timestamp).toLocaleTimeString()}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">Name</p>
                  <p className="text-gray-900">{order.customer.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Email</p>
                  <p className="text-gray-900">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Phone</p>
                  <p className="text-gray-900">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Country</p>
                  <p className="text-gray-900">{order.customer.country}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-500 font-medium">Address</p>
                  <p className="text-gray-900">
                    {order.customer.address}, {order.customer.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4 mb-6">
                {order.items.map((item) => {
                  const itemTotal = item.price * item.quantity;
                  const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
                  return (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{item.title}</p>
                          <div className="text-xs text-gray-600 space-y-1 mt-2">
                            {item.color && <p><span className="font-semibold">Color:</span> {item.color}</p>}
                            {item.size && <p><span className="font-semibold">Size:</span> {item.size}</p>}
                            <p><span className="font-semibold">Qty:</span> {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-lg text-gray-900">${itemTotal.toFixed(2)}</p>
                          <p className="text-xs text-gray-500 mt-1">${item.price.toFixed(2)}/ea</p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-gray-400 line-through">${(item.originalPrice * item.quantity).toFixed(2)}</p>
                              <p className="text-xs font-bold text-green-600">Save ${savings.toFixed(2)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t-2 border-gray-300 pt-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-base font-semibold text-gray-700">Subtotal</p>
                  <p className="text-base font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-base font-semibold text-gray-700">Shipping</p>
                  <p className="text-base font-semibold text-green-600">Free</p>
                </div>
                {order.savings && order.savings > 0 && (
                  <div className="flex justify-between items-center mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-base font-bold text-green-700">💰 Total Savings</p>
                    <p className="text-lg font-bold text-green-600">-${order.savings.toFixed(2)}</p>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-4 mt-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">Total</p>
                  <p className="text-2xl font-bold text-black">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs sm:text-sm text-amber-800">
                <span className="font-semibold">Note:</span> This order data has been saved to your browser's local storage. It will not be sent to any server. To view this order again, check the browser console or local storage.
              </p>
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleDownloadReceipt}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            <Download className="w-5 h-5" />
            <span>Download Receipt</span>
          </button>

          <Link
            href="/collection"
            className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition"
          >
            <span>Continue Shopping</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition"
          >
            <Home className="w-5 h-5" />
            <span>Back Home</span>
          </Link>
        </div>

        {/* Educational Note */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">About This Demo</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✓ This checkout system is fully functional but not connected to any payment processor</li>
            <li>✓ Order data is saved to your browser's localStorage (no server transmission)</li>
            <li>✓ Use this to test the checkout flow and user experience</li>
            <li>✓ To integrate real payments, connect a payment gateway like Stripe or PayPal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}