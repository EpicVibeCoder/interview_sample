import { useState, useEffect } from 'react';
import burger2 from '../assets/burger2.png';
import pizza from '../assets/pizza.png';
import fries from '../assets/fries.png';
import chicken from '../assets/chicken.png';
import fruit from '../assets/fruit.png'
import grass from '../assets/grass.png'
import TestimonialCard from './ui/TestimonialCard';

type Item = {
    image: string;
    title: string;
    description: string;
};

const TestimonialSection = () => {
    const items: Item[] = [
        { image: burger2, title: "VEGETABLES BURGER", description: "Barbecue Italian cuisine pizza" },
        { image: pizza, title: "SPECIAL PIZZA", description: "Barbecue Italian cuisine pizza" },
        { image: fries, title: "SPECIAL FRENCH FRIES", description: "Barbecue Italian cuisine" },
        { image: chicken, title: "CUISINE CHICKEN", description: "Japanese Cuisine Chicken" },
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [displayItems, setDisplayItems] = useState<Item[]>([]);
    const [direction, setDirection] = useState<String>("animate-slideOut");
    const [itemsToShow, setItemsToShow] = useState<number>(1);
    const totalItems = items.length;

    // Initialize display items when component mounts
    useEffect(() => {
        if (displayItems.length === 0) {
            // Set initial display items
            setDisplayItems([items[0], items[1], items[2], items[3]]);
        }
        const interval = setInterval(goToNext, 3000);
        return () => clearInterval(interval);
    }, [displayItems]);

    // Update itemsToShow based on screen width
    useEffect(() => {
        const updateItemsToShow = () => {
            setItemsToShow(window.innerWidth < 1024 ? 1 : 1); // Adjust 1024px as per `lg` breakpoint
        };

        updateItemsToShow(); // Initialize on mount
        window.addEventListener('resize', updateItemsToShow); // Listen for resize

        return () => window.removeEventListener('resize', updateItemsToShow); // Cleanup
    }, []);

    // Update display items when the carousel moves
    const updateDisplayItems = (currentItems: Item[]) => {
        setDisplayItems(currentItems);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
        const currentItems = [...displayItems.slice(1), items[currentIndex]]; // Take the next item
          setDirection("animate-slideIn")
          updateDisplayItems(currentItems);
      };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + totalItems) % totalItems;
            console.log("before: ", displayItems);

            const updatedItems = [...displayItems];
            updatedItems.pop();

            console.log("after: ", updatedItems);

            const currentItems = [items[newIndex], ...updatedItems]; // Prepend the previous item
            console.log(currentItems);
            setDirection("animate-slideOut")

            updateDisplayItems(currentItems); // Update state with the new items
            return newIndex;
        });
    };

    return (
        <section className="py-16 px-[5%] lg:px-[10%] bg-[#FBF7F2] relative">
            <div className="hidden lg:block absolute z-10 left-0 top-10">
                <img src={fruit} alt="" className="h-72" />
            </div>
            <div className="hidden lg:block absolute z-10 right-0 bottom-5">
                <img src={grass} alt="" className="h-72" />
            </div>
            {/* Header */}
            <div className="mb-12 flex w-full justify-between">
                <div>
                    <p className="text-red-600 font-roboto font-bold mb-2 flex items-center"><div className='h-[10px] w-[10px] bg-red-600 mr-2' /> Crispy, Every Bite Taste</p>
                    <h2 className="text-5xl font-bebas-neue">What Some of my Customers Say</h2>
                </div>

                <div>
                    {/* Navigation Arrows */}
                    <div className="justify-end mt-8 gap-4 hidden lg:flex">
                        <button
                            onClick={goToPrevious}
                            className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg"
                        >
                            <span className="text-2xl">&lt;</span>
                        </button>
                        <button
                            onClick={goToNext}
                            className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg"
                        >
                            <span className="text-2xl">&gt;</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Items Carousel */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out "
                    style={{
                        width: `${totalItems * 100 / itemsToShow}%`, // Adjust width for items
                    }}
                >
                    {displayItems.map((item, index) => (
                        <div key={Math.random()+index} style={{ width: `${100 / itemsToShow}%` }} className='flex justify-center'>
                            <div key={item.description} className={`flex flex-col-reverse lg:flex-row items-center text-center  bg-white ${direction} h-fit`}>
                                
                                    <TestimonialCard
                                        quote="You can't go wrong with Chicken Mandi, I had it twice. The chicken was cooked perfectly, juicy & soft (usually mandi chicken is a bit dry). I would definitely recommend it."
                                        authorName="Khalid Al Dawsy"
                                        location="Jeddah, Saudi"
                                        
                                    />
                                
                                <div className="w-full h-[335px] lg:h-[555px]">
                                <iframe className="w-full h-[335px] lg:h-[555px]" src="https://www.youtube.com/embed/UTHgr6NLeEw" title="Make Awesome SVG Animations with CSS // 7 Useful Techniques" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='lg:hidden flex justify-center items-center mt-5'>
                {/* Navigation Arrows */}
                <div className="justify-end gap-4 flex ">
                    <button
                        onClick={goToPrevious}
                        className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg"
                    >
                        <span className="text-2xl">&lt;</span>
                    </button>
                    <button
                        onClick={goToNext}
                        className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg"
                    >
                        <span className="text-2xl">&gt;</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
