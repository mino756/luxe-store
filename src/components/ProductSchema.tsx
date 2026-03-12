'use client';

import { Product } from '@/data/products';

interface ProductSchemaProps {
  product: Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: `https://luxecart.com${product.image}`,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'LuxeCart',
    },
    offers: {
      '@type': 'Offer',
      url: `https://luxecart.com/products/${product.id}`,
      priceCurrency: 'USD',
      price: product.price.toString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews.toString(),
    },
    sku: product.sku,
    material: product.material,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
