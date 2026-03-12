import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fashion Collection - Designer Clothing, Shoes & Accessories | LuxeCart",
  description:
    "Browse our curated collection of luxury fashion. Find premium clothing, designer shoes & accessories with fast shipping and 30-day returns. Quality guaranteed.",
  keywords:
    "fashion collection, designer clothing, luxury fashion online, premium clothing, fashion store",
  alternates: {
    canonical: "https://luxecart.com/collection",
  },
  openGraph: {
    type: "website",
    url: "https://luxecart.com/collection",
    title: "Fashion Collection - Designer Clothing | LuxeCart",
    description: "Browse luxury fashion collection with free shipping",
  },
};

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
