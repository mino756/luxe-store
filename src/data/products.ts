// This is the centralized product database
// To use real products: Replace this with API calls to your database
// Examples: MongoDB, PostgreSQL, Firebase, Shopify API, etc.

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[]; // Multiple product images
  description: string;
  longDescription: string;
  category: 'clothing' | 'shoes' | 'accessories';
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating: number;
  reviews: number;
  inStock: boolean;
  sku: string;
  material?: string;
  care?: string[];
  shipping?: string;
  tags?: string[];
}

export const productDatabase: Product[] = [
  {
    id: '1',
    title: 'Sweat Shirt',
    price: 29,
    originalPrice: 49,
    image: '/sweatshirt.jpg',
    gallery: ['/sweatshirt.jpg', '/model-fullbody.jpg'],
    description: 'Comfortable modern sweatshirt',
    longDescription: 'Elevate your casual wardrobe with this premium sweatshirt. Crafted from soft 100% cotton blend, this versatile piece features a contemporary design that works perfectly for any occasion. The relaxed fit provides maximum comfort while maintaining a polished look.',
    category: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    rating: 4.8,
    reviews: 342,
    inStock: true,
    sku: 'SWSH-001',
    material: '100% Cotton Blend',
    care: ['Machine wash cold', 'Gentle cycle', 'Lay flat to dry'],
    shipping: 'Free shipping on orders over $50',
    tags: ['bestseller', 'casual', 'unisex'],
  },
  {
    id: '2',
    title: 'Black Hoodie',
    price: 59,
    originalPrice: 89,
    image: '/black-hoodie.jpg',
    gallery: ['/black-hoodie.jpg', '/model-studio-white.jpg'],
    description: 'Premium black hoodie for all seasons',
    longDescription: 'Experience ultimate comfort with our signature black hoodie. Perfect for layering in cooler weather or wearing solo during milder seasons. Features a spacious kangaroo pocket, adjustable drawstrings, and ribbed cuffs for a perfect fit.',
    category: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Navy', hex: '#000080' },
    ],
    rating: 4.9,
    reviews: 521,
    inStock: true,
    sku: 'HOOD-001',
    material: '75% Cotton, 25% Polyester',
    care: ['Machine wash cold', 'Turn inside out before washing', 'Tumble dry low'],
    shipping: 'Free shipping on orders over $50',
    tags: ['bestseller', 'winter', 'premium'],
  },
  {
    id: '3',
    title: 'Denim Jacket',
    price: 89,
    originalPrice: 129,
    image: '/denim-jacket.jpg',
    gallery: ['/denim-jacket.jpg', '/model-portrait-bw.jpg'],
    description: 'Classic denim jacket with modern edge',
    longDescription: 'A timeless essential with contemporary styling. This durable denim jacket features a fitted silhouette, functional pockets, and classic button closure. The versatile wash pairs beautifully with almost any outfit in your wardrobe.',
    category: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Classic Blue', hex: '#1E90FF' },
      { name: 'Dark Wash', hex: '#1C1C1C' },
      { name: 'Light Wash', hex: '#87CEEB' },
    ],
    rating: 4.7,
    reviews: 289,
    inStock: true,
    sku: 'DENIM-001',
    material: '100% Cotton Denim',
    care: ['Machine wash cold with like colors', 'Air dry recommended', 'Iron on reverse if needed'],
    shipping: 'Free shipping on orders over $50',
    tags: ['classic', 'versatile', 'must-have'],
  },
  {
    id: '4',
    title: 'Summer Dress',
    price: 49,
    originalPrice: 79,
    image: '/summer-dress-blue.jpg',
    gallery: ['/summer-dress-blue.jpg', '/summer-dress-yellow.jpg'],
    description: 'Breezy summer dress for warm days',
    longDescription: 'Stay cool and chic with our lightweight summer dress. Perfect for beach days, casual outings, or warm weather adventures. The breathable fabric and relaxed fit ensure comfort all day long.',
    category: 'clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Sunny Yellow', hex: '#FFFF00' },
      { name: 'Coral', hex: '#FF7F50' },
    ],
    rating: 4.6,
    reviews: 198,
    inStock: true,
    sku: 'DRESS-001',
    material: '100% Linen',
    care: ['Hand wash cold', 'Lay flat to dry', 'Iron on low heat if needed'],
    shipping: 'Free shipping on orders over $50',
    tags: ['summer', 'casual', 'lightweight'],
  },
  {
    id: '5',
    title: 'Leather Boots',
    price: 129,
    originalPrice: 189,
    image: '/leather-boots.jpg',
    gallery: ['/leather-boots.jpg', '/model-male.jpg'],
    description: 'Premium leather boots for any season',
    longDescription: 'Invest in quality with these stunning leather boots. Crafted from genuine premium leather with a comfortable insole, these boots are perfect for elevating any outfit. The durable construction ensures years of wear.',
    category: 'shoes',
    sizes: ['5', '6', '7', '8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    rating: 4.9,
    reviews: 412,
    inStock: true,
    sku: 'BOOTS-001',
    material: 'Genuine Leather',
    care: ['Wipe with soft cloth', 'Use leather conditioner monthly', 'Store in cool dry place'],
    shipping: 'Free shipping on all orders',
    tags: ['premium', 'leather', 'investment'],
  },
  {
    id: '6',
    title: 'Canvas Bag',
    price: 39,
    originalPrice: 59,
    image: '/canvas-bag.jpg',
    gallery: ['/canvas-bag.jpg', '/handbag-orange.jpg'],
    description: 'Versatile canvas tote bag',
    longDescription: 'The perfect everyday companion. This durable canvas bag features spacious interior, sturdy handles, and a sleek design that works with any style. Ideal for work, shopping, or travel.',
    category: 'accessories',
    sizes: ['One Size'],
    colors: [
      { name: 'Natural Canvas', hex: '#D4A574' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
    ],
    rating: 4.5,
    reviews: 156,
    inStock: true,
    sku: 'BAG-001',
    material: '100% Canvas',
    care: ['Spot clean with damp cloth', 'Air dry', 'Do not bleach'],
    shipping: 'Free shipping on orders over $50',
    tags: ['everyday', 'versatile', 'durable'],
  },
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return productDatabase.find(product => product.id === id);
}

// Helper function to get all products
export function getAllProducts(): Product[] {
  return productDatabase;
}

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return productDatabase.filter(product => product.category === category);
}

// Helper function to get related products (same category, exclude current)
export function getRelatedProducts(productId: string, limit: number = 3): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  return productDatabase
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}
