"use client";
import { useRef, useState, useCallback, useEffect } from 'react';
import fruit from '../assets/fruit.png';
import grass from '../assets/grass.png';
import TestimonialCard from './ui/TestimonialCard';
import Carousel, { CarouselHandle } from './ui/Carousel';
import avatar1 from '../assets/avatar/avatar1.svg';
import avatar2 from '../assets/avatar/avatar2.svg';
import avatar3 from '../assets/avatar/avatar3.svg';
import avatar4 from '../assets/avatar/avatar4.svg';
import avatar5 from '../assets/avatar/avatar5.svg';
import avatar6 from '../assets/avatar/avatar6.svg';

type TestimonialItem = {
  quote: string;
  authorName: string;
  location: string;
  videoUrl: string;
  avatar: typeof avatar1;
};

const TestimonialSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [hasInteractedWithVideo, setHasInteractedWithVideo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0, 1])); // Preload first 2 videos
  const carouselRef = useRef<CarouselHandle>(null);
  const videoInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoPauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Testimonials data array - easily extensible
  const testimonials: TestimonialItem[] = [
    {
      quote: "You can't go wrong with Chicken Mandi, I had it twice. The chicken was cooked perfectly, juicy & soft (usually mandi chicken is a bit dry). I would definitely recommend it.",
      authorName: "Khalid Al Dawsy",
      location: "Jeddah, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
      avatar: avatar1,
    },
    {
      quote: "Amazing food and excellent service! The atmosphere is perfect for a family dinner. The staff was very welcoming and the food arrived quickly.",
      authorName: "Sarah Ahmed",
      location: "Riyadh, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
      avatar: avatar2,
    },
    {
      quote: "Best restaurant in town! The flavors are authentic and the presentation is outstanding. I've recommended this place to all my friends.",
      authorName: "Mohammed Ali",
      location: "Dammam, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
      avatar: avatar3,
    },
    {
      quote: "I've been coming here for years. Consistently great food and friendly staff. The quality never disappoints, and the prices are very reasonable.",
      authorName: "Fatima Hassan",
      location: "Mecca, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
      avatar: avatar4,
    },
    {
      quote: "The grilled meats are absolutely fantastic! Perfectly seasoned and cooked to perfection. This is now my go-to restaurant for special occasions.",
      authorName: "Omar Abdullah",
      location: "Medina, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
      avatar: avatar5,
    },
    {
      quote: "Outstanding culinary experience! Every dish tells a story of authentic flavors. The dessert selection is particularly impressive.",
      authorName: "Layla Ibrahim",
      location: "Abha, Saudi",
      videoUrl: "https://www.youtube.com/embed/UTHgr6NLeEw",
      avatar: avatar6,
    },
  ];

  // Preload videos - load current, next, and previous for smooth transitions
  useEffect(() => {
    const preloadVideos = () => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      setLoadedVideos(prev => {
        const newSet = new Set(prev);
        newSet.add(currentIndex);
        newSet.add(nextIndex);
        newSet.add(prevIndex);
        return newSet;
      });
    };
    preloadVideos();
  }, [currentIndex, testimonials.length]);

  // Auto-update current index based on carousel autoplay timing
  useEffect(() => {
    if (!carouselRef.current) return;
    
    // Update index every 5 seconds (matching autoplay interval)
    const interval = setInterval(() => {
      if (!isVideoPlaying && !isHoveringVideo && !hasInteractedWithVideo) {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isVideoPlaying, isHoveringVideo, hasInteractedWithVideo, testimonials.length]);

  const goToNext = () => {
    handleCarouselChange();
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
    carouselRef.current?.next();
  };

  const goToPrevious = () => {
    handleCarouselChange();
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    carouselRef.current?.prev();
  };

  // Load video when needed
  const loadVideo = useCallback((index: number) => {
    setLoadedVideos(prev => {
      if (prev.has(index)) return prev;
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  }, []);

  const handleVideoAreaEnter = (index: number) => {
    setIsHoveringVideo(true);
    setIsVideoPlaying(true);
    setHasInteractedWithVideo(true);
    loadVideo(index); // Load video on hover
    // Clear any pending timeouts
    if (videoInteractionTimeoutRef.current) {
      clearTimeout(videoInteractionTimeoutRef.current);
      videoInteractionTimeoutRef.current = null;
    }
    if (videoPauseTimeoutRef.current) {
      clearTimeout(videoPauseTimeoutRef.current);
      videoPauseTimeoutRef.current = null;
    }
  };

  const handleVideoAreaLeave = () => {
    setIsHoveringVideo(false);
    // Don't reset isVideoPlaying immediately - keep it paused if user has interacted
    // This prevents autoplay while video might still be playing
    if (hasInteractedWithVideo) {
      // Keep paused for longer if user has interacted (they might be watching)
      videoPauseTimeoutRef.current = setTimeout(() => {
        setIsVideoPlaying(false);
        setHasInteractedWithVideo(false);
      }, 10000); // 10 second delay - enough time for video playback
    } else {
      // If no interaction, reset quickly
      videoInteractionTimeoutRef.current = setTimeout(() => {
        setIsVideoPlaying(false);
      }, 2000);
    }
  };

  const handleVideoClick = (index: number) => {
    setIsVideoPlaying(true);
    setHasInteractedWithVideo(true);
    loadVideo(index); // Ensure video is loaded on click
    // Clear any pending timeouts
    if (videoInteractionTimeoutRef.current) {
      clearTimeout(videoInteractionTimeoutRef.current);
      videoInteractionTimeoutRef.current = null;
    }
    if (videoPauseTimeoutRef.current) {
      clearTimeout(videoPauseTimeoutRef.current);
      videoPauseTimeoutRef.current = null;
    }
  };

  // Reset video state when carousel moves to a new item
  const handleCarouselChange = () => {
    // Clear timeouts
    if (videoInteractionTimeoutRef.current) {
      clearTimeout(videoInteractionTimeoutRef.current);
      videoInteractionTimeoutRef.current = null;
    }
    if (videoPauseTimeoutRef.current) {
      clearTimeout(videoPauseTimeoutRef.current);
      videoPauseTimeoutRef.current = null;
    }
    // Reset after a short delay to allow new video to load
    setTimeout(() => {
      setIsVideoPlaying(false);
      setIsHoveringVideo(false);
      setHasInteractedWithVideo(false);
    }, 500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoInteractionTimeoutRef.current) {
        clearTimeout(videoInteractionTimeoutRef.current);
      }
      if (videoPauseTimeoutRef.current) {
        clearTimeout(videoPauseTimeoutRef.current);
      }
    };
  }, []);

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
        autoPlay={!isVideoPlaying && !isHoveringVideo && !hasInteractedWithVideo}
        interval={5000}
        pauseOnHover={true}
        isPaused={isVideoPlaying || isHoveringVideo || hasInteractedWithVideo}
        itemsPerView={1}
        renderItem={(testimonial, index) => {
          const videoIndex = index ?? 0;
          const shouldLoad = loadedVideos.has(videoIndex);
          
          return (
            <div className="flex justify-center h-full px-2">
              <TestimonialCard
                quote={testimonial.quote}
                authorName={testimonial.authorName}
                location={testimonial.location}
                avatar={testimonial.avatar}
                videoUrl={testimonial.videoUrl}
                shouldLoad={shouldLoad}
                onVideoEnter={() => handleVideoAreaEnter(videoIndex)}
                onVideoLeave={handleVideoAreaLeave}
                onVideoClick={() => handleVideoClick(videoIndex)}
              />
            </div>
          );
        }}
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
