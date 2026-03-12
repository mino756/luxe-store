import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About LuxeCart - Premium Fashion Brand | Luxury Clothing Store",
  description:
    "Discover our story. LuxeCart offers premium fashion and luxury clothing made with sustainable practices and exceptional quality. Free shipping on all orders over $50.",
  keywords:
    "about us, luxury fashion brand, sustainable fashion, quality clothing, fashion company",
  alternates: {
    canonical: "https://luxecart.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://luxecart.com/about",
    title: "About LuxeCart - Premium Fashion Brand",
    description: "Learn about our commitment to quality and sustainable fashion",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
