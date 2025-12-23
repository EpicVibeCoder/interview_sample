import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://interview-sample.vercel.app"; // Replace with actual domain

    // In a real app, you might fetch dynamic routes here (e.g. blog posts, menu items)
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        // Add more routes if/when they exist
    ];
}
