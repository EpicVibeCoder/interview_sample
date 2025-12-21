"use client";
import { useRef, useState } from 'react';
import fruit from '../assets/fruit.png';
import grass from '../assets/grass.png';
import TestimonialCard from './ui/TestimonialCard';
import Carousel, { CarouselHandle } from './ui/Carousel';

type TestimonialItem = {
  quote: string;
  authorName: string;
  location: string;
  videoUrl: string;
};

const TestimonialSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const carouselRef = useRef<CarouselHandle>(null);
  const videoInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: TestimonialItem[] = [
    {
      quote: "You can't go wrong with Chicken Mandi, I had it twice. The chicken was cooked perfectly, juicy & soft (usually mandi chicken is a bit dry). I would definitely recommend it.",
      authorName: "Khalid Al Dawsy",
      location: "Jeddah, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
    },
    {
      quote: "Amazing food and excellent service! The atmosphere is perfect for a family dinner.",
      authorName: "Sarah Ahmed",
      location: "Riyadh, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
    },
    {
      quote: "Best restaurant in town! The flavors are authentic and the presentation is outstanding.",
      authorName: "Mohammed Ali",
      location: "Dammam, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
    },
    {
      quote: "I've been coming here for years. Consistently great food and friendly staff.",
      authorName: "Fatima Hassan",
      location: "Mecca, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
    },
  ];

  const goToNext = () => {
    carouselRef.current?.next();
  };

  const goToPrevious = () => {
    carouselRef.current?.prev();
  };

  const handleVideoAreaEnter = () => {
    setIsHoveringVideo(true);
    setIsVideoPlaying(true);
    // Clear any pending timeout
    if (videoInteractionTimeoutRef.current) {
      clearTimeout(videoInteractionTimeoutRef.current);
      videoInteractionTimeoutRef.current = null;
    }
  };

  const handleVideoAreaLeave = () => {
    setIsHoveringVideo(false);
    // Wait a bit before resetting, in case user is still interacting
    videoInteractionTimeoutRef.current = setTimeout(() => {
      setIsVideoPlaying(false);
    }, 2000); // 2 second delay to ensure video has stopped
  };

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
    // Clear any pending timeout
    if (videoInteractionTimeoutRef.current) {
      clearTimeout(videoInteractionTimeoutRef.current);
      videoInteractionTimeoutRef.current = null;
    }
  };

  return (
    <section className="py-16 px-[5%] lg:px-[10%] bg-[#FBF7F2] relative">
      <div className="hidden lg:block absolute z-10 left-0 top-10">
        <img src={typeof fruit === 'string' ? fruit : fruit.src} alt="" className="h-72" />
      </div>
      <div className="hidden lg:block absolute z-10 right-0 bottom-5">
        <img src={typeof grass === 'string' ? grass : grass.src} alt="" className="h-72" />
      </div>
      
      {/* Header */}
      <div className="mb-12 flex w-full justify-between">
        <div>
          <div className="text-red-600 font-roboto font-bold mb-2 flex items-center">
            <div className='h-[10px] w-[10px] bg-red-600 mr-2' /> Crispy, Every Bite Taste
          </div>
          <h2 className="text-5xl font-bebas-neue">What Some of my Customers Say</h2>
        </div>

        <div>
          {/* Navigation Arrows */}
          <div className="justify-end mt-8 gap-4 hidden lg:flex">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
              aria-label="Previous testimonial"
            >
              <span className="text-2xl">&lt;</span>
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
              aria-label="Next testimonial"
            >
              <span className="text-2xl">&gt;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        ref={carouselRef}
        items={testimonials}
        autoPlay={!isVideoPlaying && !isHoveringVideo}
        interval={5000}
        pauseOnHover={true}
        isPaused={isVideoPlaying || isHoveringVideo}
        itemsPerView={1}
        renderItem={(testimonial) => (
          <div className="flex justify-center h-full px-2">
            <div className="flex flex-col-reverse lg:flex-row items-stretch text-center bg-white h-fit w-full max-w-7xl mx-auto">
              <div className="w-full lg:w-[45%] flex-shrink-0">
                <TestimonialCard
                  quote={testimonial.quote}
                  authorName={testimonial.authorName}
                  location={testimonial.location}
                />
              </div>
              <div 
                className="w-full lg:w-[55%] h-[335px] lg:h-[555px] flex-shrink-0"
                onMouseEnter={handleVideoAreaEnter}
                onMouseLeave={handleVideoAreaLeave}
                onClick={handleVideoClick}
              >
                <iframe
                  className="w-full h-full"
                  src={testimonial.videoUrl}
                  title="Customer Testimonial"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      />

      {/* Mobile Navigation */}
      <div className='lg:hidden flex justify-center items-center mt-5'>
        <div className="justify-end gap-4 flex">
          <button
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
            aria-label="Previous testimonial"
          >
            <span className="text-2xl">&lt;</span>
          </button>
          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full flex items-center justify-center hover:text-red-700 bg-white shadow-lg transition-colors"
            aria-label="Next testimonial"
          >
            <span className="text-2xl">&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
