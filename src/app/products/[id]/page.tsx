'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductById, getRelatedProducts } from '@/data/products';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { ProductSchema } from '@/components/ProductSchema';
import { ShoppingBag, Menu, X, Star, Check, Truck, RotateCcw, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = useMemo(() => getProductById(productId), [productId]);
  const relatedProducts = useMemo(() => getRelatedProducts(productId, 3), [productId]);

  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState('transparent');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[2] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Load cart from localStorage
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = useCallback((qty: number = quantity) => {
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;

      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: qty, selectedSize, selectedColor }];
      }

      localStorage.setItem('luxeCart', JSON.stringify(newCart));
      setCartOpen(true);
      return newCart;
    });
  }, [product, quantity, selectedSize, selectedColor]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      localStorage.setItem('luxeCart', JSON.stringify(newCart));
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: qty } : item
      );
      localStorage.setItem('luxeCart', JSON.stringify(newCart));
      return newCart;
    });
  }, [removeFromCart]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const galleryImages = useMemo(() => product?.gallery || [product?.image || ''], [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link href="/collection" className="text-blue-600 hover:underline">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black antialiased">
      {/* Product Schema Markup for SEO */}
      <ProductSchema product={product} />
      
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
        style={{
          backgroundColor: navbarBg,
          boxShadow: navbarBg !== 'transparent' ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">LUXE</span>
              <span className="text-black">CART</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/" className="text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">Home</Link>
              <Link href="/collection" className="text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">Collections</Link>
              <Link href="/about" className="text-gray-700 hover:text-black font-medium transition-colors text-sm lg:text-base">About</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={() => setCartOpen(!cartOpen)} className="relative p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full font-bold px-1">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
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
              <Link href="/about" className="block text-gray-700 hover:text-black font-medium py-2">About</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 overflow-x-auto">
            <Link href="/" className="hover:text-black whitespace-nowrap">Home</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-black whitespace-nowrap">Collections</Link>
            <span>/</span>
            <span className="text-black font-medium whitespace-nowrap">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Product Gallery */}
            <div>
              <div className="relative mb-3 sm:mb-4 bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden aspect-square">
                <img
                  src={galleryImages[galleryIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                      className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)}
                      className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndex(idx)}
                      className={`aspect-square rounded-lg sm:rounded-lg overflow-hidden border-2 transition-colors ${
                        galleryIndex === idx ? 'border-black' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              {/* Product Header */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{product.title}</h1>

                <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? 'fill-black' : 'fill-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg sm:text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                      <span className="bg-red-100 text-red-800 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 text-green-600 font-medium mb-4 sm:mb-6 text-sm sm:text-base">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-600 font-medium mb-4 sm:mb-6 text-sm sm:text-base">Out of Stock</span>
                )}
              </div>

              {/* Product Description */}
              <p className="text-gray-600 mb-8 leading-relaxed">{product.longDescription}</p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-4">Color: <span className="text-black">{selectedColor}</span></label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.name ? 'border-black' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold mb-4">Size: <span className="text-black">{selectedSize}</span></label>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="mb-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center font-medium"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => addToCart()}
                  disabled={!product.inStock}
                  className="flex-1 bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors disabled:opacity-50"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>

                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-black transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              {/* Info Boxes */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Truck className="w-4 h-4" />
                    Free Shipping
                  </div>
                  <p className="text-xs text-gray-600">{product.shipping || 'On orders over $50'}</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <RotateCcw className="w-4 h-4" />
                    Easy Returns
                  </div>
                  <p className="text-xs text-gray-600">30-day return policy</p>
                </div>
              </div>

              {/* Specifications */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SKU</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                  {product.material && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium">{product.material}</span>
                    </div>
                  )}
                  {product.care && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Care Instructions</span>
                      <div className="text-right">
                        {product.care.map((instruction, i) => (
                          <div key={i} className="font-medium">{instruction}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {relatedProduct.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold">${relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-gray-400 line-through">${relatedProduct.originalPrice}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
