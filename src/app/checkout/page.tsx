'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import DemoNotice from '@/components/ui/DemoNotice';
import CheckoutForm from '@/components/ui/CheckoutForm';
import OrderSummary from '@/components/ui/OrderSummary';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('luxeCart') || '[]');
    setItems(savedCart);
    setMounted(true);
  }, []);

  const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Spacing */}
      <div className="h-20 sm:h-24"></div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Shopping</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Checkout</h1>
              <p className="text-gray-600 mt-2">Complete your demo order</p>
            </div>
            {items.length > 0 && (
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-600">Items in cart</p>
                <p className="text-2xl font-bold text-black">{items.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Empty Cart Check */}
        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 sm:p-12 text-center">
            <div className="mb-6">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to your cart before checking out</p>
            <Link
              href="/collection"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Demo Notice */}
            <DemoNotice />

            {/* Progress Indicator */}
            <div className="mb-8 p-4 bg-white rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">1</div>
                  <p className="ml-3 text-sm font-medium text-gray-900">Shipping</p>
                </div>
                <div className="flex-1 mx-4 h-1 bg-gray-200"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold">2</div>
                  <p className="ml-3 text-sm font-medium text-gray-500">Review</p>
                </div>
              </div>
            </div>

            {/* Checkout Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <CheckoutForm totalAmount={total} cartItems={items} />
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 sm:top-32">
              <OrderSummary items={items} total={total} />
            </div>
          </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Spacing */}
      <div className="h-12"></div>
    </div>
  );
}