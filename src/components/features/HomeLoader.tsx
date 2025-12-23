"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "../ui/LoadingScreen";
import heroImage from "../../assets/hero-image.jpeg";
import offerImage from "../../assets/Offer.svg";
import vectorImage from "../../assets/Vector.svg";
import ranges from "../../assets/ranges.png";

const HomeLoader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const assets = [heroImage.src, offerImage.src, vectorImage.src, ranges.src];

    let loadedCount = 0;
    const totalAssets = assets.length;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = (loadedCount / totalAssets) * 100;
      setProgress(newProgress);

      if (loadedCount === totalAssets) {
        // Small delay to ensure the 100% is seen and transitions are smooth
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    // If no assets, just finish
    if (totalAssets === 0) {
      setIsLoading(false);
      return;
    }

    assets.forEach((src) => {
      const img = new Image();
      img.src = src;

      if (img.complete) {
        updateProgress();
      } else {
        img.onload = updateProgress;
        img.onerror = updateProgress; // Proceed even if error
      }
    });

    // Cleanup not strictly necessary for simple image preloader but good practice if we had listeners
    return () => {};
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen progress={progress} />}
      {!isLoading && children}
    </>
  );
};

export default HomeLoader;
