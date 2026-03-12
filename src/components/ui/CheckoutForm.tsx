'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  totalAmount: number;
  cartItems: any[];
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutForm({ totalAmount, cartItems }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.replace(/\s/g, '')))
      newErrors.phone = 'Please enter a valid phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      const orderData = {
        id: `DEMO-${Date.now()}`,
        timestamp: new Date().toISOString(),
        customer: formData,
        items: cartItems,
        total: totalAmount,
      };

      // Save to localStorage
      localStorage.setItem('lastDemoOrder', JSON.stringify(orderData));
      setSuccess(true);

      // Redirect to success page after brief delay
      setTimeout(() => {
        router.push('/success');
      }, 800);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${
                errors.fullName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-transparent'
              }`}
              placeholder="John Doe"
              disabled={loading || success}
            />
            {errors.fullName && (
              <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-transparent'
              }`}
              placeholder="john@example.com"
              disabled={loading || success}
            />
            {errors.email && (
              <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <div className="relative">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${
              errors.address
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-transparent'
            }`}
            placeholder="123 Main Street"
            disabled={loading || success}
          />
          {errors.address && (
            <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
          )}
        </div>
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
      </div>

      {/* City, State, Postal Code Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <div className="relative">
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${
                errors.city
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-transparent'
              }`}
              placeholder="New York"
              disabled={loading || success}
            />
            {errors.city && (
              <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
        </div>

        {/* State/Province */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State / Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            placeholder="NY"
            disabled={loading || success}
          />
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code *
          </label>
          <div className="relative">
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${
                errors.postalCode
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-transparent'
              }`}
              placeholder="10001"
              disabled={loading || success}
            />
            {errors.postalCode && (
              <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
        </div>
      </div>

      {/* Country & Phone Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition appearance-none ${
                errors.country
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-transparent'
              }`}
              disabled={loading || success}
            >
              <option value="">Select a country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Australia">Australia</option>
              <option value="Japan">Japan</option>
              <option value="Turkey">Turkey</option>
              <option value="Other">Other</option>
            </select>
            {errors.country && (
              <AlertCircle className="absolute right-10 top-3.5 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-transparent'
              }`}
              placeholder="+1 (555) 123-4567"
              disabled={loading || success}
            />
            {errors.phone && (
              <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />
            )}
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || success}
        className={`w-full font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2 mt-8 ${
          success
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
        }`}
      >
        {success ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Order Placed!
          </>
        ) : loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Demo Order...
          </>
        ) : (
          'Place Demo Order'
        )}
      </button>
    </form>
  );
}