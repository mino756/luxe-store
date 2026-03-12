import { Metadata } from "next";
import { getProductById } from "@/data/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | LuxeCart",
      description: "The product you're looking for is not available.",
    };
  }

  return {
    title: `${product.title} - Premium ${product.category} | LuxeCart - $${product.price}`,
    description: `Buy ${product.title} at LuxeCart. ${product.description} ⭐ ${product.rating}/5 from ${product.reviews} reviews. Premium quality, free shipping on orders over $50.`,
    keywords: `${product.title}, ${product.category}, buy online, luxury fashion, premium ${product.category}`,
    alternates: {
      canonical: `https://luxecart.com/products/${id}`,
    },
    openGraph: {
      type: "website",
      url: `https://luxecart.com/products/${id}`,
      title: `${product.title} | LuxeCart`,
      description: product.description,
      images: [
        {
          url: `https://luxecart.com${product.image}`,
          width: 800,
          height: 1000,
          alt: product.title,
        },
      ],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
