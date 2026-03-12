'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, MapPin, Mail, Phone, Instagram, Twitter, Facebook, Youtube, Star } from 'lucide-react';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { getAllProducts } from '@/data/products';

const products = getAllProducts();

export default function CollectionPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [navbarBg, setNavbarBg] = useState('rgba(255, 255, 255, 0.95)');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('luxeCart') || '[]');
    setCart(savedCart);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBg('rgba(255, 255, 255, 0.95)');
      } else {
        setNavbarBg('rgba(255, 255, 255, 0.95)');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Setup reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const addToCart = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem('luxeCart', JSON.stringify(newCart));
      setCartOpen(true);
      return newCart;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('luxeCart', JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem('luxeCart', JSON.stringify(newCart));
      return newCart;
    });
  }, [removeFromCart]);

  const filteredProducts = useMemo(() => filter === 'all' ? products : products.filter(p => p.category === filter), [filter]);
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (
    <div className="bg-white text-black antialiased">
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 shadow-sm"
        style={{ backgroundColor: navbarBg }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-base sm:text-lg md:text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">LUXE</span>
              <span className="text-black">CART</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 lg:gap-8">
              <Link href="/" className="nav-link relative text-gray-700 hover:text-black font-medium transition-colors text-xs md:text-sm lg:text-base">Home</Link>
              <span className="nav-link relative text-black font-medium transition-colors text-xs md:text-sm lg:text-base">Collections</span>
              <Link href="/about" className="nav-link relative text-gray-700 hover:text-black font-medium transition-colors text-xs md:text-sm lg:text-base">About</Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={() => setCartOpen(!cartOpen)} className="relative p-1.5 sm:p-2 md:p-3 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs min-w-4 h-4 flex items-center justify-center rounded-full font-bold px-0.5">
                    {totalItems}
                  </span>
                )}
              </button>

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1.5 hover:bg-gray-100 rounded-full">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md">
            <nav className="px-2 sm:px-4 pb-3 space-y-1.5">
              <Link href="/" className="block text-gray-700 hover:text-black font-medium py-1.5 text-sm">Home</Link>
              <span className="block text-black font-medium py-1.5 text-sm">Collections</span>
              <Link href="/about" className="block text-gray-700 hover:text-black font-medium py-1.5 text-sm">About</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-10 md:pb-14 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs text-gray-500 uppercase tracking-wider animate-slide-in">Explore</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-2 mb-2 md:mb-4 animate-slide-in delay-100">Our Collections</h1>
            <p className="text-xs sm:text-sm md:text-lg text-gray-600 max-w-2xl mx-auto animate-slide-in delay-200 px-1">
              Discover our curated selection of premium fashion essentials. From casual wear to statement pieces, find your perfect style.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-2 sm:py-3 md:py-4 border-b sticky top-16 bg-white/95 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {['all', 'clothing', 'shoes', 'accessories'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full border border-gray-200 font-medium transition-all hover:bg-gray-100 text-xs md:text-sm whitespace-nowrap ${
                  filter === category ? 'bg-black text-white border-black' : ''
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8" style={{ gridAutoRows: 'auto' }}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-wrapper relative reveal">
                <div className="glow-effect"></div>
                <Link href={`/products/${product.id}`} className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 block group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.id);
                      }}
                      className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 bg-white text-black py-2 sm:py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white text-xs sm:text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex flex-col items-end gap-0.5">
                      <span>${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-500">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 md:p-5">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg group-hover:text-blue-600 transition-colors line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-xs sm:text-sm">({product.reviews})</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10 md:mb-16 reveal">
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Browse by</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <a href="#" className="group relative h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden reveal">
              <img src="/sweatshirt.jpg" alt="Clothing" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6">
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">Clothing</h3>
                <p className="text-gray-300 text-xs sm:text-sm">120+ Items</p>
              </div>
            </a>

            <a href="#" className="group relative h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden reveal">
              <img src="/leather-boots.jpg" alt="Shoes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6">
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">Shoes</h3>
                <p className="text-gray-300 text-xs sm:text-sm">45+ Items</p>
              </div>
            </a>

            <a href="#" className="group relative h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden reveal">
              <img src="/handbag-orange.jpg" alt="Accessories" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6">
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">Accessories</h3>
                <p className="text-gray-300 text-xs sm:text-sm">80+ Items</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="reveal">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Get 20% Off Your First Order</h2>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                Subscribe to our newsletter for exclusive discounts and early access to new collections.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input type="email" placeholder="Enter your email" className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs sm:text-sm" />
                <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap text-xs sm:text-sm">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="relative h-40 sm:h-56 md:h-72 rounded-lg overflow-hidden reveal">
              <img src="/summer-dress-yellow.jpg" alt="Newsletter" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            <div className="col-span-2 sm:col-span-2 md:col-span-2 reveal">
              <h2 className="text-base sm:text-lg md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">LUXE<span className="text-gray-400">CART</span></h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4 md:mb-6 max-w-sm leading-relaxed">Elevating everyday style with premium essentials designed for the modern wardrobe.</p>

              <div className="space-y-1.5 sm:space-y-2 md:space-y-3 text-gray-400 text-xs sm:text-sm md:text-base">
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="line-clamp-2">123 Fashion Ave, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>hello@luxecart.com</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <h4 className="font-semibold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Shop</h4>
              <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">Sale</Link></li>
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">Collections</Link></li>
              </ul>
            </div>

            <div className="reveal">
              <h4 className="font-semibold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Support</h4>
              <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>

            <div className="reveal">
              <h4 className="font-semibold mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">Company</h4>
              <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8">
              <p className="text-xs sm:text-xs md:text-sm text-gray-500 text-center sm:text-left">© 2024 LuxeCart. All rights reserved. Elevating everyday style.</p>

              <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 text-xs sm:text-xs md:text-sm justify-center">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookie Settings</a>
              </div>

              <div className="flex gap-2 sm:gap-3 md:gap-4">
                <a href="#" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Twitter className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Facebook className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Youtube className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slideIn 0.6s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .product-wrapper { position: relative; }
        .glow-effect { position: absolute; inset: -4px; background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899); border-radius: 1rem; opacity: 0; filter: blur(16px); transition: opacity 0.3s ease; z-index: -1; }
        .product-wrapper:hover .glow-effect { opacity: 0.2; }
        .cart-drawer { transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .cart-drawer.open { transform: translateX(0); }
        
        @media (max-width: 768px) {
          .animate-slide-in { animation: none; opacity: 1; transform: none; }
          .reveal { transition: none; animation: none; }
          .reveal.visible { opacity: 1; transform: none; }
          .glow-effect { display: none !important; }
          .product-wrapper:hover .glow-effect { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
