import type { Metadata } from "next";
import "../index.css";
import icon from "@/assets/icon.svg";

export const metadata: Metadata = {
      title: "Generic Restaurant",
      description: "Experience authentic cuisine at Generic Restaurant",
      icons: {
            icon: typeof icon === "string" ? icon : icon.src,
      },
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="en" suppressHydrationWarning>
                  <head>
                        <link
                              href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700&display=swap"
                              rel="stylesheet"
                        />
                  </head>
                  <body>{children}</body>
            </html>
      );
}
