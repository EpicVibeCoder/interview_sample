import React from "react";

const JsonLd = () => {
      const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Generic Restaurant",
            image: "https://interview-sample.vercel.app/seo-image.png", // Replace with actual image URL preferably absolute
            description: "Experience authentic cuisine at Generic Restaurant. Book your table today!",
            address: {
                  "@type": "PostalAddress",
                  streetAddress: "123 Food Street",
                  addressLocality: "Food City",
                  addressRegion: "FC",
                  postalCode: "12345",
                  addressCountry: "US",
            },
            geo: {
                  "@type": "GeoCoordinates",
                  latitude: 40.7128,
                  longitude: -74.006,
            },
            url: "https://interview-sample.vercel.app",
            telephone: "+11234567890",
            priceRange: "$$",
            servesCuisine: "American",
            menu: "https://interview-sample.vercel.app/menu",
            opens: "11:00",
            closes: "22:00",
      };

      return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
};

export default JsonLd;
