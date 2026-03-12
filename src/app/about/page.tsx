'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Heart, Leaf, Gem, MapPin, Mail, Phone, Instagram, Twitter, Facebook, Youtube, Menu, ShoppingBag, X } from 'lucide-react';
import { CartDrawer } from '@/components/ui/CartDrawer';

export default function AboutPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState('transparent');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('luxeCart') || '[]');
    setCart(savedCart);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarBg('rgba(255, 255, 255, 0.95)');
      } else {
        setNavbarBg('transparent');
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

  const toggleCart = useCallback(() => setCartOpen(prev => !prev), []);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

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

  const totalItems = useMemo(() => cart.reduce((sum: number, item: any) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0), [cart]);

  const products = useMemo(() => [
    { id: '1', title: 'Sweat Shirt', price: 29, image: '/sweatshirt.jpg' },
    { id: '2', title: 'Black Hoodie', price: 59, image: '/black-hoodie.jpg' },
    { id: '3', title: 'Denim Jacket', price: 89, image: '/denim-jacket.jpg' },
    { id: '4', title: 'Summer Dress', price: 49, image: '/summer-dress-blue.jpg' },
    { id: '5', title: 'Leather Boots', price: 129, image: '/leather-boots.jpg' },
    { id: '6', title: 'Canvas Bag', price: 39, image: '/canvas-bag.jpg' },
  ], []);

  return (
    <div className="bg-white text-black antialiased">
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
        style={{ backgroundColor: navbarBg, boxShadow: navbarBg !== 'transparent' ? '0 4px 20px rgba(0,0,0,0.1)' : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">LUXE</span>
              <span className="text-black">CART</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/" className="nav-link relative text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">Home</Link>
              <Link href="/collection" className="nav-link relative text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">Collections</Link>
              <span className="nav-link relative text-black font-medium transition-colors text-sm lg:text-base">About</span>
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={toggleCart} className="relative p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full font-bold px-1">
                    {totalItems}
                  </span>
                )}
              </button>

              <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md">
            <nav className="px-4 sm:px-6 pb-4 space-y-2 sm:space-y-3">
              <Link href="/" className="block text-gray-700 hover:text-black font-medium py-2">Home</Link>
              <Link href="/collection" className="block text-gray-700 hover:text-black font-medium py-2">Collections</Link>
              <span className="block text-black font-medium py-2">About</span>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider animate-slide-in">Our Story</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2 sm:mt-3 mb-2 sm:mb-3 md:mb-4 animate-slide-in delay-100">About LuxeCart</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-slide-in delay-200 px-2">
              We're on a mission to elevate everyday style with premium essentials designed for the modern wardrobe. Quality meets style in every piece we create.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Since 2020</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 mb-4 sm:mb-6">Crafting Style, One Piece at a Time</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                LuxeCart began with a simple idea: fashion should be both beautiful and accessible. What started as a small boutique in New York has grown into a global brand loved by thousands.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                We believe that what you wear should make you feel confident, comfortable, and uniquely you. That's why every item in our collection is carefully curated and crafted with attention to detail.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                From sourcing the finest materials to working with skilled artisans, we're committed to delivering quality that lasts. Our pieces are designed to be timeless staples in your wardrobe.
              </p>
            </div>

            <div className="relative reveal">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden">
                <img src="/model-fullbody.jpg" alt="Our Story" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -left-4 sm:-left-6 md:-left-8 bg-black text-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">4+</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-400">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center reveal">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">50K+</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-400">Happy Customers</p>
            </div>
            <div className="text-center reveal">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">200+</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-400">Products</p>
            </div>
            <div className="text-center reveal">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">30+</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-400">Countries</p>
            </div>
            <div className="text-center reveal">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">4.9</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 reveal">
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">What We Stand For</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="value-card bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl reveal hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black text-white rounded-lg sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Gem className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Quality First</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">We never compromise on quality. Every piece is crafted with premium materials and meticulous attention to detail.</p>
            </div>

            <div className="value-card bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl reveal hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black text-white rounded-lg sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Sustainability</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">We're committed to sustainable practices, from eco-friendly materials to ethical manufacturing processes.</p>
            </div>

            <div className="value-card bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl reveal hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-black text-white rounded-lg sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Customer Love</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Our customers are at the heart of everything we do. We're dedicated to providing exceptional service and support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 reveal">
            <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">The People Behind</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3">Meet Our Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Sarah Mitchell', role: 'Founder & CEO', image: '/model-portrait-bw.jpg' },
              { name: 'James Chen', role: 'Creative Director', image: '/model-male.jpg' },
              { name: 'Emma Davis', role: 'Head of Design', image: '/model-studio-white.jpg' },
            ].map((member) => (
              <div key={member.name} className="team-card relative group reveal">
                <div className="relative h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="team-overlay absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-sm sm:text-base text-gray-300">{member.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div className="reveal">
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 mb-4 sm:mb-6">Contact Us</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
                Have a question or feedback? We'd love to hear from you. Reach out to us and our team will get back to you as soon as possible.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Address</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">123 Fashion Ave, New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Email</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">hello@luxecart.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Phone</p>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm reveal">
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message!'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">First Name</label>
                    <input type="text" className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Last Name</label>
                    <input type="text" className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition-colors" placeholder="Doe" />
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Email</label>
                  <input type="email" className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition-colors" placeholder="john@example.com" />
                </div>

                <div className="mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Subject</label>
                  <input type="text" className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition-colors" placeholder="How can we help?" />
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Message</label>
                  <textarea rows={4} className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black transition-colors resize-none" placeholder="Your message..."></textarea>
                </div>

                <button type="submit" className="w-full bg-black text-white py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base hover:bg-gray-900 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
            <div className="sm:col-span-2 reveal">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">LUXE<span className="text-gray-400">CART</span></h2>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-sm leading-relaxed">Elevating everyday style with premium essentials designed for the modern wardrobe.</p>

              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>123 Fashion Ave, New York, NY 10001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>hello@luxecart.com</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">Sale</Link></li>
                <li><Link href="/collection" className="text-gray-400 hover:text-white transition-colors">Collections</Link></li>
              </ul>
            </div>

            <div className="reveal">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>

            <div className="reveal">
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
              <p className="text-xs sm:text-sm text-gray-500">© 2024 LuxeCart. All rights reserved. Elevating everyday style.</p>

              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Cookie Settings</a>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
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
        .value-card { transition: all 0.3s ease; }
        .team-overlay { hover: opacity-100 transition-opacity duration-300; }
        .cart-drawer { transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .cart-drawer.open { transform: translateX(0); }
      `}</style>
    </div>
  );
}
