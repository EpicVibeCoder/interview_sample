import type { Metadata } from "next";
import { Bebas_Neue, Inter, Poppins, Raleway, Roboto } from "next/font/google";
import "../index.css";
import icon from "@/assets/icon.svg";

import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
      metadataBase: new URL("https://interview-sample.vercel.app"), // Base URL for resolving relative paths
      title: {
            default: "Generic Restaurant | Authentic Cuisine",
            template: "%s | Generic Restaurant",
      },
      description: "Experience authentic cuisine at Generic Restaurant. Book your table today for a memorable dining experience.",
      keywords: ["Restaurant", "Authentic Cuisine", "Dining", "Food", "Generic Restaurant"],
      authors: [{ name: "Mir Ashiqul Hossain" }],
      creator: "Mir Ashiqul Hossain",
      publisher: "Generic Restaurant",
      formatDetection: {
            email: false,
            address: false,
            telephone: false,
      },
      icons: {
            icon: typeof icon === "string" ? icon : icon.src,
            shortcut: typeof icon === "string" ? icon : icon.src,
            apple: typeof icon === "string" ? icon : icon.src,
      },
      openGraph: {
            title: "Generic Restaurant | Authentic Cuisine",
            description: "Experience authentic cuisine at Generic Restaurant. Book your table today!",
            url: "https://interview-sample.vercel.app",
            siteName: "Generic Restaurant",
            images: [
                  {
                        url: "/seo-image.png", // Ensure this image exists in public folder
                        width: 1200, // Standard OG image width
                        height: 630, // Standard OG image height
                        alt: "Generic Restaurant Ambiance",
                  },
            ],
            locale: "en_US",
            type: "website",
      },
      twitter: {
            card: "summary_large_image",
            title: "Generic Restaurant | Authentic Cuisine",
            description: "Experience authentic cuisine at Generic Restaurant.",
            images: ["/seo-image.png"], // Ensure this image exists
      },
      robots: {
            index: true,
            follow: true,
            googleBot: {
                  index: true,
                  follow: true,
                  "max-video-preview": -1,
                  "max-image-preview": "large",
                  "max-snippet": -1,
            },
      },
      alternates: {
            canonical: "https://interview-sample.vercel.app",
      },
};

const bebasNeue = Bebas_Neue({
      weight: "400",
      subsets: ["latin"],
      variable: "--font-bebas-neue",
});

const poppins = Poppins({
      weight: ["300", "400", "500", "600", "700"],
      subsets: ["latin"],
      variable: "--font-poppins",
});

const raleway = Raleway({
      weight: ["300", "400", "500", "600", "700"],
      subsets: ["latin"],
      variable: "--font-raleway",
});

const roboto = Roboto({
      weight: ["300", "400", "500", "700"],
      subsets: ["latin"],
      variable: "--font-roboto",
});

const inter = Inter({
      weight: ["300", "400", "500", "600", "700"],
      subsets: ["latin"],
      variable: "--font-inter",
});

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="en" suppressHydrationWarning>
                  <body className={`${bebasNeue.variable} ${poppins.variable} ${raleway.variable} ${roboto.variable} ${inter.variable}`}>
                        <JsonLd />
                        {children}
                  </body>
            </html>
      );
}
