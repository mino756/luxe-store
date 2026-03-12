# 🛍️ Product Management Guide - LuxeCart

## ✅ What's Ready

Your e-commerce site now has:
- ✅ **Product detail pages** at `/products/[id]` with full product information
- ✅ **Dynamic routing** - each product gets its own page
- ✅ **Centralized product data** in `src/data/products.ts`
- ✅ **Product features**: images, sizes, colors, ratings, reviews, specifications
- ✅ **Related products** showing on detail pages
- ✅ **Fully linked** - product cards link to detail pages

---

## 🚀 How to Upload Real Products

### **Option 1: Quick Start - Edit the Data File (No Backend Needed)**

Perfect for **small catalogs (1-50 products)** or testing before launching.

#### Step 1: Open the products data file
File: `src/data/products.ts`

#### Step 2: Add your products to the `productDatabase` array

```typescript
export const productDatabase: Product[] = [
  {
    id: '1',                              // Unique ID - must be unique!
    title: 'Your Product Name',           // Product title
    price: 29,                            // Current price (number)
    originalPrice: 49,                    // Optional: original price for discounts
    image: '/image.jpg',                  // Main image (from /public folder)
    gallery: ['/img1.jpg', '/img2.jpg'],  // Optional: multiple images
    description: 'Short description',     // One-line description
    longDescription: 'Full description with details...',  // Detailed description
    category: 'clothing',                 // 'clothing', 'shoes', or 'accessories'
    sizes: ['XS', 'S', 'M', 'L', 'XL'],  // Optional: available sizes
    colors: [
      { name: 'Black', hex: '#000000' },  // Color options
      { name: 'White', hex: '#FFFFFF' },
    ],
    rating: 4.8,                          // 0-5 rating
    reviews: 342,                         // Number of reviews
    inStock: true,                        // Is it available?
    sku: 'PROD-001',                      // Stock keeping unit
    material: '100% Cotton',              // Optional: material info
    care: [                               // Optional: care instructions
      'Machine wash cold',
      'Lay flat to dry',
    ],
    shipping: 'Free shipping on orders over $50',  // Shipping info
    tags: ['bestseller', 'sale'],         // Optional: tags for filtering
  },
  // Add more products here...
];
```

#### Step 3: Follow this checklist

- [ ] Each product has a unique `id` (don't reuse IDs)
- [ ] `price` is a number (not a string)
- [ ] `image` points to a file in `/public` folder
- [ ] `category` is exactly 'clothing', 'shoes', or 'accessories'
- [ ] `rating` is between 0-5
- [ ] `inStock: true` (or false if out of stock)

#### Step 4: Save the file

```bash
npm run dev
# Then visit: http://localhost:3000/products/1
```

---

### **Option 2: Add Product Images**

1. **Prepare your images** (JPG, PNG, WebP)
   - Recommended size: **800x1000px minimum** (3:4 aspect ratio)
   - Optimized size: **1200x1500px**
   - Format: JPG (faster) or WebP (better quality)

2. **Place in public folder**
   ```
   public/
   ├── product1.jpg
   ├── product2.jpg
   ├── product3.jpg
   └── ... (add more images here)
   ```

3. **Reference in products.ts**
   ```typescript
   image: '/product1.jpg',
   gallery: ['/product1.jpg', '/product1-side.jpg'],
   ```

---

### **Option 3: Professional Setup - Database + CMS (100+ Products)**

For large catalogs or real-time inventory, set up a database.

#### **A) MongoDB + Express.js Backend**

1. **Install dependencies**
   ```bash
   npm install mongodb express cors dotenv
   ```

2. **Create backend API** (`src/api/products.js`)
   ```javascript
   const express = require('express');
   const { MongoClient } = require('mongodb');

   const app = express();
   const client = new MongoClient(process.env.MONGODB_URI);

   // GET all products
   app.get('/api/products', async (req, res) => {
     const db = client.db('luxestore');
     const products = await db.collection('products').find({}).toArray();
     res.json(products);
   });

   // GET single product
   app.get('/api/products/:id', async (req, res) => {
     const db = client.db('luxestore');
     const product = await db.collection('products').findOne({
       id: req.params.id
     });
     res.json(product);
   });

   app.listen(3001, () => console.log('API running on port 3001'));
   ```

3. **Update products.ts to fetch from API**
   ```typescript
   export async function getProductById(id: string) {
     const res = await fetch(`http://localhost:3001/api/products/${id}`);
     return res.json();
   }
   ```

#### **B) Firebase (Easiest Cloud Option)**

```typescript
// src/data/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getAllProducts() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => doc.data());
}
```

#### **C) Shopify Integration**

```typescript
// Fetch products from your Shopify store
export async function getShopifyProducts() {
  const response = await fetch(
    `https://your-store.myshopify.com/admin/api/2024-01/products.json`,
    {
      headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN }
    }
  );
  return response.json();
}
```

---

### **Option 4: Headless CMS - Strapi or Contentful**

**Best for:** Teams managing products with a dashboard UI

#### **Strapi Setup**
```bash
npm create strapi-app@latest my-cms
# Visit http://localhost:1337/admin
# Create products collection
# Connect to Next.js API routes
```

---

## 📋 Product Data Structure Reference

### **Required Fields**
```typescript
id: string              // Unique identifier
title: string          // Product name
price: number          // Current selling price
image: string          // Main product image path
description: string    // Short description
longDescription: string // Detailed description  
category: string       // Category for filtering
rating: number         // 0-5 star rating
reviews: number        // Number of reviews
inStock: boolean       // Availability
sku: string            // Stock keeping unit
```

### **Optional Fields**
```typescript
originalPrice?: number         // Sales price tracking
gallery?: string[]             // Multiple images
sizes?: string[]               // Available sizes
colors?: Color[]               // Color options
material?: string              // Material info
care?: string[]                // Care instructions
shipping?: string              // Shipping details
tags?: string[]                // For filtering/search
```

---

## 🎨 Product Photo Guidelines

**Best Practices:**

1. **Main Image**
   - Clear, well-lit product photo
   - Plain background (white or light gray)
   - Product centered in frame
   - Size: 1200x1500px (3:4 aspect ratio)

2. **Gallery Images**
   - Show product from multiple angles
   - Include lifestyle shots (being worn/used)
   - Detail shots for textures/materials
   - 3-5 images per product recommended

3. **File Optimization**
   - JPG format (smaller file size)
   - Max file size: <500KB per image
   - Use tools: TinyPNG, ImageOptim, WebP converter

---

## 🔄 Workflow: From CSV to Products

### **Step 1: Export from spreadsheet to CSV**
```csv
title,price,originalPrice,category,image,description,sku
"Sweatshirt",29,49,"clothing","/sweatshirt.jpg","Comfortable sweatshirt","SW001"
"Jeans",59,89,"clothing","/jeans.jpg","Classic denim","JN001"
```

### **Step 2: Convert CSV to JSON**
```bash
npm install csv-to-json
```

```javascript
const csvToJson = require('csv-to-json');

csvToJson()
  .fromFile('products.csv')
  .then(jsonObj => {
    console.log(JSON.stringify(jsonObj, null, 2));
  });
```

### **Step 3: Paste into productDatabase array**

---

## ✨ Adding New Product Features

### **Feature 1: Product Search**
```typescript
// In src/data/products.ts
export function searchProducts(query: string): Product[] {
  const lowercase = query.toLowerCase();
  return productDatabase.filter(p =>
    p.title.toLowerCase().includes(lowercase) ||
    p.description.toLowerCase().includes(lowercase) ||
    p.tags?.some(tag => tag.toLowerCase().includes(lowercase))
  );
}
```

### **Feature 2: Inventory Tracking**
```typescript
// Add to Product interface
inventory: number;  // Stock quantity
lowStockThreshold: number;  // Alert at this level
```

### **Feature 3: Discount System**
```typescript
export function applyDiscount(product: Product, discountPercent: number): number {
  return product.price * (1 - discountPercent / 100);
}
```

### **Feature 4: Product Variants (Sizes/Colors)**
```typescript
interface ProductVariant {
  size: string;
  color: string;
  sku: string;
  inventory: number;
}

// In Product interface
variants: ProductVariant[];
```

---

## 🗂️ File Structure After Setup

```
src/
├── data/
│   ├── products.ts           ← Product database
│   └── firebase.ts           ← Optional: Firebase config
├── app/
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx      ← Product detail page
│   ├── page.tsx              ← Home page
│   ├── collection/
│   │   └── page.tsx          ← Collection page
│   └── api/                  ← Optional: Backend routes
│       └── products/
│           └── route.ts      ← API endpoints
└── ...

public/
└── *.jpg images              ← Product images go here
```

---

## 🚀 Next Steps

1. **Immediate (This Week)**
   - [ ] Add your products to `src/data/products.ts`
   - [ ] Upload product images to `public/`
   - [ ] Test on localhost:3000/products/1

2. **Short Term (Next Week)**
   - [ ] Add 20+ real products
   - [ ] Set up product search
   - [ ] Add inventory tracking

3. **Medium Term (Next 2-4 Weeks)**
   - [ ] Set up database (MongoDB/Firebase)
   - [ ] Create admin dashboard for product management
   - [ ] Deploy to Vercel

4. **Long Term (1-2 Months)**
   - [ ] Integrate payment processing (Stripe)
   - [ ] Set up inventory management system
   - [ ] Launch marketing campaigns

---

## 🆘 Troubleshooting

### **Product not showing?**
- Check ID is unique
- Verify image file exists in `/public`
- Check browser console for errors
- Ensure JSON syntax is valid

### **Images not loading?**
- Image path must start with `/`
- File must be in `public/` folder
- Check file name spelling (case-sensitive on Linux)

### **Performance slow?**
- Compress images (target: 100-200KB each)
- Use WebP format instead of PNG
- Consider lazy loading for gallery images

---

## 💡 Tips & Best Practices

✅ **DO:**
- Keep product IDs simple (1, 2, 3...)
- Use high-quality images (800x1000px minimum)
- Fill in all product details for better SEO
- Add honest ratings and reviews
- Use descriptive product tags

❌ **DON'T:**
- Use duplicate product IDs
- Forget category assignment
- Use poor quality/blurry images
- Make inStock false for available products
- Leave descriptions empty

---

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB**: https://www.mongodb.com/docs
- **Firebase**: https://firebase.google.com/docs
- **Strapi CMS**: https://docs.strapi.io
- **LuxeCart Docs**: See projects README.md

---

**Ready to add products? Start with Option 1 (data file) today! 🚀**
