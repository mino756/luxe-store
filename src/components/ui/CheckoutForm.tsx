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
        items: cartItems.map((item: any) => ({
          ...item,
          color: item.color || 'Not specified',
          size: item.size || 'One size',
        })),
        total: totalAmount,
        savings: cartItems.reduce((sum: number, item: any) => {
          const discount = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
          return sum + discount;
        }, 0),
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
              <optgroup label="North America">
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
              </optgroup>
              <optgroup label="Central America">
                <option value="Belize">Belize</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Honduras">Honduras</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Panama">Panama</option>
              </optgroup>
              <optgroup label="South America">
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brazil">Brazil</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Guyana">Guyana</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Suriname">Suriname</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
              </optgroup>
              <optgroup label="Europe">
                <option value="Albania">Albania</option>
                <option value="Andorra">Andorra</option>
                <option value="Austria">Austria</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Croatia">Croatia</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Estonia">Estonia</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="Ireland">Ireland</option>
                <option value="Italy">Italy</option>
                <option value="Kosovo">Kosovo</option>
                <option value="Latvia">Latvia</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Malta">Malta</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Netherlands">Netherlands</option>
                <option value="North Macedonia">North Macedonia</option>
                <option value="Norway">Norway</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="San Marino">San Marino</option>
                <option value="Serbia">Serbia</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Spain">Spain</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Kingdom">United Kingdom</option>
              </optgroup>
              <optgroup label="Africa">
                <option value="Algeria">Algeria</option>
                <option value="Angola">Angola</option>
                <option value="Benin">Benin</option>
                <option value="Botswana">Botswana</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Egypt">Egypt</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Ghana">Ghana</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Ivory Coast">Ivory Coast</option>
                <option value="Kenya">Kenya</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Mali">Mali</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Namibia">Namibia</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Sudan">Sudan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Togo">Togo</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Uganda">Uganda</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </optgroup>
              <optgroup label="Middle East & Central Asia">
                <option value="Afghanistan">Afghanistan</option>
                <option value="Armenia">Armenia</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Georgia">Georgia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Israel">Israel</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Oman">Oman</option>
                <option value="Qatar">Qatar</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Syria">Syria</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Yemen">Yemen</option>
              </optgroup>
              <optgroup label="South Asia">
                <option value="Afghanistan">Afghanistan</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bhutan">Bhutan</option>
                <option value="India">India</option>
                <option value="Maldives">Maldives</option>
                <option value="Nepal">Nepal</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Sri Lanka">Sri Lanka</option>
              </optgroup>
              <optgroup label="Southeast Asia">
                <option value="Brunei">Brunei</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Laos">Laos</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Philippines">Philippines</option>
                <option value="Singapore">Singapore</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Vietnam">Vietnam</option>
              </optgroup>
              <optgroup label="East Asia">
                <option value="China">China</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Japan">Japan</option>
                <option value="Mongolia">Mongolia</option>
                <option value="North Korea">North Korea</option>
                <option value="South Korea">South Korea</option>
                <option value="Taiwan">Taiwan</option>
              </optgroup>
              <optgroup label="Oceania">
                <option value="Australia">Australia</option>
                <option value="Fiji">Fiji</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Micronesia">Micronesia</option>
                <option value="Nauru">Nauru</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Palau">Palau</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Samoa">Samoa</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Tonga">Tonga</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Vanuatu">Vanuatu</option>
              </optgroup>
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