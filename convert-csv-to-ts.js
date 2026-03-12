#!/usr/bin/env node

/**
 * CSV to Products Converter
 * Converts products_sample.csv to TypeScript format for src/data/products.ts
 * 
 * Usage: node convert-csv-to-ts.js
 */

const fs = require('fs');
const path = require('path');

function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Handle quoted fields
    const fields = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '"') {
        inQuotes = !inQuotes;
      } else if (line[j] === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += line[j];
      }
    }
    fields.push(current.trim());
    
    if (fields.length === headers.length) {
      const obj = {};
      headers.forEach((header, idx) => {
        obj[header] = fields[idx];
      });
      rows.push(obj);
    }
  }
  
  return rows;
}

function convertToProduct(row) {
  const sizes = row.sizes ? row.sizes.split(';').map(s => s.trim()) : [];
  const colors = row.colors ? row.colors.split(';').map(c => c.trim()).map((name, idx) => ({
    name,
    hex: getColorHex(name)
  })) : [];
  
  const product = {
    id: `'${row.sku.replace(/[^0-9]/g, '') || Math.random().toString(36).substr(2, 9)}'`,
    title: row.title,
    price: parseInt(row.price),
    ...(row.originalprice ? { originalPrice: parseInt(row.originalprice) } : {}),
    image: row.image,
    gallery: [row.image],
    description: row.description,
    longDescription: row.description,
    category: `'${row.category}'`,
    ...(sizes.length > 0 ? { sizes: JSON.stringify(sizes) } : {}),
    ...(colors.length > 0 ? { colors: JSON.stringify(colors) } : {}),
    rating: parseFloat(row.rating || '4.5'),
    reviews: parseInt(row.reviews || '0'),
    inStock: row.instock === 'true' || row.instock === '1' || row.instock === 'true',
    sku: row.sku,
    ...(row.material ? { material: `'${row.material}'` } : {}),
    shipping: "'Free shipping on orders over $50'",
    tags: "['new']"
  };
  
  return product;
}

function getColorHex(colorName) {
  const colors = {
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#808080',
    'charcoal': '#36454F',
    'navy': '#000080',
    'blue': '#1E90FF',
    'dark wash': '#1C1C1C',
    'light wash': '#87CEEB',
    'classic blue': '#1E90FF',
    'sky blue': '#87CEEB',
    'sunny yellow': '#FFFF00',
    'coral': '#FF7F50',
    'brown': '#8B4513',
    'tan': '#D2B48C',
    'natural canvas': '#D4A574',
    'red': '#FF0000',
    'pink': '#FFC0CB',
    'green': '#008000'
  };
  
  return colors[colorName.toLowerCase()] || '#000000';
}

function generateTypeScript(products) {
  let output = `// Auto-generated from CSV
// Edit this file or add products here

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
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
`;

  products.forEach((product, idx) => {
    output += `  {
    id: ${product.id},
    title: ${JSON.stringify(product.title)},
    price: ${product.price},
`;
    
    if (product.originalPrice) {
      output += `    originalPrice: ${product.originalPrice},\n`;
    }
    
    output += `    image: ${JSON.stringify(product.image)},
    gallery: [${JSON.stringify(product.image)}],
    description: ${JSON.stringify(product.description)},
    longDescription: ${JSON.stringify(product.longDescription)},
    category: ${product.category},
`;

    if (product.sizes) {
      output += `    sizes: ${product.sizes},\n`;
    }
    
    if (product.colors) {
      output += `    colors: ${product.colors},\n`;
    }

    output += `    rating: ${product.rating},
    reviews: ${product.reviews},
    inStock: ${product.inStock},
    sku: ${JSON.stringify(product.sku)},
`;

    if (product.material) {
      output += `    material: ${product.material},\n`;
    }

    output += `    care: ['Machine wash cold', 'Lay flat to dry'],
    shipping: ${product.shipping},
    tags: ['bestseller'],
  },\n`;
  });

  output += `];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return productDatabase.find(product => product.id === id);
}

export function getAllProducts(): Product[] {
  return productDatabase;
}

export function getProductsByCategory(category: string): Product[] {
  return productDatabase.filter(product => product.category === category);
}

export function getRelatedProducts(productId: string, limit: number = 3): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  return productDatabase
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}
`;

  return output;
}

// Main execution
try {
  const csvPath = path.join(__dirname, 'products_sample.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  
  const rows = parseCSV(csvContent);
  const products = rows.map(convertToProduct);
  const typescript = generateTypeScript(products);
  
  // Write to file
  const outputPath = path.join(__dirname, 'src', 'data', 'products_converted.ts');
  fs.writeFileSync(outputPath, typescript);
  
  console.log(`✅ Converted ${products.length} products!`);
  console.log(`📝 Output: ${outputPath}`);
  console.log(`\n📋 Next steps:`);
  console.log(`1. Review the generated file: src/data/products_converted.ts`);
  console.log(`2. Copy the content to src/data/products.ts`);
  console.log(`3. Replace the old file and verify in browser`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
