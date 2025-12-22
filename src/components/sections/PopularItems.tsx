"use client";

import { useEffect, useRef, useState } from "react";
import bell_pepper from "../../assets/bell-pepper.png";
import burger2 from "../../assets/burger2.png";
import chicken from "../../assets/chicken.png";
import fries from "../../assets/fries.png";
import pizza from "../../assets/pizza.png";
import Carousel, { CarouselHandle } from "../ui/Carousel";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type Item = {
  image: StaticImageData;
  title: string;
  description: string;
};

/**
 * Popular food items carousel.
 *
 * Client component because it relies on `window.innerWidth` for responsive behavior.
 */
const PopularItems = () => {
  const [itemsPerView, setItemsPerView] = useState(4);

  const items: Item[] = [
    { image: burger2, title: "VEGETABLES BURGER", description: "Barbecue Italian cuisine pizza" },
    { image: pizza, title: "SPECIAL PIZZA", description: "Barbecue Italian cuisine pizza" },
    { image: fries, title: "SPECIAL FRENCH FRIES", description: "Barbecue Italian cuisine" },
    { image: chicken, title: "CUISINE CHICKEN", description: "Japanese Cuisine Chicken" },
  ];

  const carouselRef = useRef<CarouselHandle>(null);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 1024 ? 1 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToNext = () => {
    carouselRef.current?.next();
  };

  const goToPrevious = () => {
    carouselRef.current?.prev();
  };

  return (
    <section id="menu" className="py-16 px-[10%] bg-[#FBF7F2] relative">
      <div className="hidden lg:block absolute z-10 left-0 bottom-5">
        <Image src={bell_pepper} alt="" className="h-72 w-auto" sizes="288px" />
      </div>
      {/* Header */}
      <div className="mb-12 flex w-full justify-between">
        <div>
          <div className="text-red-600 font-roboto font-bold mb-2 flex items-center">
            <div className="h-[10px] w-[10px] bg-red-600 mr-2" /> Crispy, Every Bite Taste
          </div>
          <h2 className="text-5xl font-bebas-neue">POPULAR FOOD ITEMS</h2>
        </div>

        <div>
          {/* Navigation Arrows */}
          <div className="justify-end mt-8 gap-4 hidden lg:flex">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
            >
              <span className="text-2xl">&lt;</span>
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
            >
              <span className="text-2xl">&gt;</span>
            </button>
          </div>
        </div>
      </div>

      <Carousel
        ref={carouselRef}
        items={items}
        itemsPerView={itemsPerView}
        renderItem={(item) => (
          <div className="flex justify-center h-full px-2">
            <div className="flex flex-col items-center text-center p-6 bg-white w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                width={128}
                height={128}
                className="w-32 h-32 object-contain mb-4"
                sizes="128px"
              />
              <div className="w-12 h-1 bg-red-600 mb-4"></div>
              <h3 className="font-bebas-neue text-2xl mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        )}
      />

      <div className="lg:hidden flex justify-center items-center mt-5">
        {/* Navigation Arrows Mobile */}
        <div className="justify-end gap-4 flex ">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
          >
            <span className="text-2xl">&lt;</span>
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
          >
            <span className="text-2xl">&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularItems;


