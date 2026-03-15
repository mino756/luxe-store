'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ShoppingBag, Menu, X, MapPin, Mail, Phone, Instagram, Twitter, Facebook, Youtube, ChevronLeft, ChevronRight, Star, Zap, Truck, Shield, RotateCcw } from 'lucide-react';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { getAllProducts } from '@/data/products';

const products = getAllProducts();

const carouselImages = [
  { src: '/model-portrait-bw.jpg', alt: 'Fashion model portrait' },
  { src: '/model-studio-white.jpg', alt: 'Fashion model in studio' },
  { src: '/model-fullbody.jpg', alt: 'Fashion model full body' },
  { src: '/model-male.jpg', alt: 'Male fashion model' },
];

export default function HomePage() {
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
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

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  return (

    <div className="bg-white text-black antialiased">
      {/* Skip Navigation Target */}
      <a id="main-content" className="sr-only">Main Content</a>
      
      {/* Navbar */}

      <header role="banner"
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
        style={{ 
          backgroundColor: navbarBg,
          boxShadow: navbarBg !== 'transparent' ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight" aria-label="LuxeCart Home">
              <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent" aria-hidden="true">LUXE</span>
              <span className="text-black" aria-hidden="true">CART</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
              <Link href="/" className="nav-link relative text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">Home</Link>
              <Link href="/collection" className="nav-link relative text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">Collections</Link>
              <Link href="/about" className="nav-link relative text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">About</Link>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <button onClick={() => setCartOpen(!cartOpen)} className="relative p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors" aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}>
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full font-bold px-1" aria-hidden="true">
                    {totalItems}
                  </span>
                )}
              </button>

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full" aria-expanded={menuOpen} aria-label="Toggle navigation menu" aria-controls="mobile-menu">
                {menuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200" id="mobile-menu">
            <nav className="px-4 sm:px-6 py-3 sm:py-4 space-y-1" aria-label="Mobile navigation">
              <Link href="/" className="block text-gray-700 hover:text-black font-medium py-2.5 px-2 rounded transition-colors">Home</Link>
              <Link href="/collection" className="block text-gray-700 hover:text-black font-medium py-2.5 px-2 rounded transition-colors">Collections</Link>
              <Link href="/about" className="block text-gray-700 hover:text-black font-medium py-2.5 px-2 rounded transition-colors">About</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
        <div className="absolute inset-0 -z-10 top-16">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-140px)]">
            {/* Left Content */}
            <div className="flex flex-col justify-center py-6 md:py-0 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-black text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-slide-in w-fit">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                New Collection 2024
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
                <span className="animate-slide-in delay-100 block">Elevate</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 animate-slide-in delay-200 block">Your Style</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mb-6 sm:mb-8 leading-relaxed animate-slide-in delay-300">
                Discover our curated collection of premium essentials designed for the modern wardrobe. Quality meets style.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-slide-in delay-400">
                <Link href="/collection" className="magnetic-btn bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform text-sm sm:text-base">
                  Shop Now
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/collection" className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium border-2 border-gray-200 hover:border-black transition-colors text-center text-sm sm:text-base">
                  View Collections
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 animate-slide-in delay-500">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">50K+</p>
                  <p className="text-sm sm:text-base text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">200+</p>
                  <p className="text-sm sm:text-base text-gray-600">Products</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold">4.9</p>
                  <p className="text-sm sm:text-base text-gray-600">Rating</p>
                </div>
              </div>
            </div>

            {/* Right - Image Carousel */}
            <div className="order-1 lg:order-2 w-full animatescale-in delay-200">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg sm:rounded-2xl bg-gray-100">
                {carouselImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    className="carousel-slide absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                    style={{ opacity: currentSlide === index ? 1 : 0, pointerEvents: currentSlide === index ? 'auto' : 'none' }}
                    loading="lazy"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                {/* Navigation Buttons */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                  className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] md:min-w-[56px] md:min-h-[56px] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={`Previous image, currently viewing image ${currentSlide + 1} of ${carouselImages.length}`}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
                  className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] md:min-w-[56px] md:min-h-[56px] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={`Next image, currently viewing image ${currentSlide + 1} of ${carouselImages.length}`}
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" aria-hidden="true" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 z-20">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center min-w-[44px] min-h-[44px] ${
                        currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                      }`}
                      style={{
                        background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)'
                      }}
                      aria-label={`Go to slide ${index + 1} of ${carouselImages.length}`}
                      aria-current={currentSlide === index ? 'page' : 'false'}
                    >
                      <span className={`transition-all duration-300 rounded-full ${
                        currentSlide === index ? 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-black' : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-600'
                      }`}></span>
                    </button>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-white transition-none"
                    style={{
                      width: '100%',
                      animation: `carouselProgress 5000ms linear 1 forwards`,
                      animationDelay: '0ms'
                    }}
                    key={currentSlide}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:block">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50" aria-label="Features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Why Choose LuxeCart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: 'truck', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: 'shield', title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: 'rotate', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: 'star', title: 'Premium Quality', desc: 'Curated selection' },
            ].map((feature, i) => {
              const iconMap: { [key: string]: React.ReactNode } = {
                truck: <Truck className="w-7 h-7" />,
                shield: <Shield className="w-7 h-7" />,
                rotate: <RotateCcw className="w-7 h-7" />,
                star: <Star className="w-7 h-7" />,
              };
              return (
                <div key={i} className="text-center p-4 sm:p-6 lg:p-8 reveal hover:bg-white hover:rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 hover:rotate-6 hover:scale-110 transition-transform duration-300 flex-shrink-0" aria-hidden="true">
                    {iconMap[feature.icon]}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-20 md:py-24" aria-label="Featured products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider reveal">Our Collection</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-4 reveal">Featured Products</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto reveal px-2" id="products-description">
              Handpicked essentials that combine comfort, style, and quality. Each piece is designed to elevate your everyday look.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="product-wrapper relative reveal" style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="glow-effect"></div>
                <Link href={`/products/${product.id}`} className="product-card relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 block group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img src={product.image} alt={`${product.title} - Premium fashion item`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product.id);
                      }}
                      className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
                    >
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      Add to Cart
                    </button>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex flex-col items-end gap-1">
                      <span>${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-gray-600">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-2">{product.title}</h3>
                    <div className="flex items-center gap-2 mt-2 sm:mt-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm" aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}>({product.reviews})</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12 reveal">
            <Link href="/collection" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors text-sm sm:text-base">
              View All Products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 sm:py-20 md:py-24 bg-black text-white overflow-hidden" aria-label="Promotional offer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="reveal order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-6">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                Limited Time Offer
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Get 20% Off Your First Order</h2>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                Subscribe to our newsletter and receive exclusive discounts, early access to new collections, and style tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label htmlFor="newsletter-email-1" className="sr-only">Email address for newsletter</label>
                <input type="email" id="newsletter-email-1" placeholder="Enter your email" className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm sm:text-base" />
                <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-xl font-medium hover:scale-105 transition-transform text-sm sm:text-base whitespace-nowrap" type="button">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden reveal order-1 md:order-2">
              <img src="/black-hoodie.jpg" alt="Summer sale promotional image featuring luxury clothing at special discount" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <p className="text-2xl sm:text-3xl font-bold">SUMMER SALE</p>
                <p className="text-sm sm:text-base text-gray-300">Up to 50% off selected items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50" aria-label="Customer testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 reveal">
            <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { content: 'LuxeCart has completely transformed my wardrobe. The quality is unmatched!', name: 'Sarah Johnson', role: 'Fashion Blogger', image: '/model-portrait-bw.jpg' },
              { content: 'The attention to detail in every piece is incredible. My go-to store!', name: 'Michael Chen', role: 'Stylist', image: '/model-male.jpg' },
              { content: 'Fast shipping and amazing customer service. Highly recommend!', name: 'Emma Davis', role: 'Influencer', image: '/model-studio-white.jpg' },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm reveal hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="flex gap-1 mb-3 sm:mb-4" role="img" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img src={testimonial.image} alt={`${testimonial.name}, ${testimonial.role}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 sm:py-20 md:py-24" aria-label="Instagram feed gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 reveal">
            <span className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">@luxecart</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-3">Follow Us on Instagram</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4" role="region" aria-label="Product gallery">
            {products.map((product, index) => (
              <button key={index} className="relative aspect-square rounded-xl overflow-hidden group reveal hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }} aria-label={`View ${product.title} on Instagram`}>
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">View Post</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white" role="contentinfo">
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="reveal">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Join the LuxeCart Family</h2>
                <p className="text-sm sm:text-base text-gray-300">Subscribe for exclusive offers, early access to new collections, and style tips.</p>
              </div>

              <div className="reveal">
                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <label htmlFor="footer-email" className="sr-only">Email address for newsletter</label>
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <input type="email" id="footer-email" placeholder="Enter your email" className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-sm sm:text-base" />
                  </div>
                  <button type="submit" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform text-sm sm:text-base whitespace-nowrap">
                    Subscribe
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
            <div className="sm:col-span-2 reveal">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">LUXE<span className="text-gray-300">CART</span></h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 max-w-sm leading-relaxed">Elevating everyday style with premium essentials designed for the modern wardrobe.</p>

              <div className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
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
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><Link href="/collection" className="text-gray-300 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link href="/collection" className="text-gray-300 hover:text-white transition-colors">Best Sellers</Link></li>
                <li><Link href="/collection" className="text-gray-300 hover:text-white transition-colors">Sale</Link></li>
                <li><Link href="/collection" className="text-gray-300 hover:text-white transition-colors">Collections</Link></li>
              </ul>
            </div>

            <div className="reveal">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>

            <div className="reveal">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sustainability</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
              <p className="text-xs sm:text-sm text-gray-300">© 2024 LuxeCart. All rights reserved. Elevating everyday style.</p>

              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Settings</a>
              </div>

              <div className="flex gap-4">
                <a href="#" aria-label="Visit our Instagram page" className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </a>
                <a href="#" aria-label="Visit our Twitter page" className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </a>
                <a href="#" aria-label="Visit our Facebook page" className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                </a>
                <a href="#" aria-label="Visit our YouTube channel" className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] rounded-full bg-gray-900 hover:bg-white hover:text-black transition-all flex items-center justify-center group">
                  <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes carouselProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-slide-in { animation: slideIn 0.6s ease-out forwards; opacity: 0; }
        .animatescale-in { animation: scaleIn 0.5s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: slideIn 0.5s ease-out forwards; opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .product-wrapper { position: relative; }
        .glow-effect { position: absolute; inset: -4px; background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899); border-radius: 1rem; opacity: 0; filter: blur(16px); transition: opacity 0.3s ease; z-index: -1; }
        .product-wrapper:hover .glow-effect { opacity: 0.2; }
        .cart-drawer { transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .cart-drawer.open { transform: translateX(0); }
        .scroll-dot { animation: float 1.5s ease-in-out infinite; }
        
        @media (max-width: 768px) {
          .animate-slide-in, .animate-fade, .fade-in { animation: none !important; opacity: 1; transform: none !important; }
          .animatescale-in { animation: none !important; opacity: 1; transform: none !important; }
          .reveal { transition: none; animation: none !important; }
          .reveal.visible { opacity: 1; transform: none !important; }
          .glow-effect { display: none !important; }
          .product-wrapper:hover .glow-effect { opacity: 0 !important; }
          .scroll-dot { animation: none !important; }
          * { transition-duration: 0.1s !important; }
        }
      `}</style>
    </div>
  );
}
