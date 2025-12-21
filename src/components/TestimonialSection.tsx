"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import fruit from "../assets/fruit.png";
import grass from "../assets/grass.png";
import TestimonialCard from "./ui/TestimonialCard";
import Carousel, { CarouselHandle } from "./ui/Carousel";
import avatar1 from "../assets/avatar/avatar1.svg";
import avatar2 from "../assets/avatar/avatar2.svg";
import avatar3 from "../assets/avatar/avatar3.svg";
import avatar4 from "../assets/avatar/avatar4.svg";
import avatar5 from "../assets/avatar/avatar5.svg";
import avatar6 from "../assets/avatar/avatar6.svg";

type TestimonialItem = {
      quote: string;
      authorName: string;
      location: string;
      videoUrl: string;
      avatar: typeof avatar1;
};

const TestimonialSection = () => {
      const [currentIndex, setCurrentIndex] = useState(0);
      // IMPORTANT: this must be clone-aware (Carousel renders many cloned copies)
      // so we track the unique "render index" of the currently visible clone.
      const [playingRenderIndex, setPlayingRenderIndex] = useState<number | null>(null);
      const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set([0, 1])); // Preload first 2 videos
      const carouselRef = useRef<CarouselHandle>(null);
      const sectionRef = useRef<HTMLElement | null>(null);
      const [isSectionInView, setIsSectionInView] = useState(true);
      const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

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
                  setLoadedVideos((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(currentIndex);
                        newSet.add(nextIndex);
                        newSet.add(prevIndex);
                        return newSet;
                  });
            };
            preloadVideos();
      }, [currentIndex, testimonials.length]);

      const stopVideo = useCallback(() => {
            setPlayingRenderIndex(null);
      }, []);

      const goToNext = () => {
            stopVideo();
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            carouselRef.current?.next();
      };

      const goToPrevious = () => {
            stopVideo();
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            carouselRef.current?.prev();
      };

      // Load video when needed
      const loadVideo = useCallback((index: number) => {
            setLoadedVideos((prev) => {
                  if (prev.has(index)) return prev;
                  const newSet = new Set(prev);
                  newSet.add(index);
                  return newSet;
            });
      }, []);

      const buildYoutubeEmbedSrc = useCallback((url: string) => {
            try {
                  const u = new URL(url);
                  u.searchParams.set("autoplay", "1");
                  u.searchParams.set("playsinline", "1");
                  u.searchParams.set("rel", "0");
                  return u.toString();
            } catch {
                  const separator = url.includes("?") ? "&" : "?";
                  return `${url}${separator}autoplay=1&playsinline=1&rel=0`;
            }
      }, []);

      // Stop the video if the slide changes (e.g., swipe) while a video is playing
      useEffect(() => {
            if (playingRenderIndex === null) return;
            // When the carousel advances, the visible clone changes even if the logical item repeats.
            if (currentTrackIndex !== playingRenderIndex) stopVideo();
      }, [currentTrackIndex, playingRenderIndex, stopVideo]);

      // Stop the video if the whole section scrolls out of view
      useEffect(() => {
            if (!isSectionInView && playingRenderIndex !== null) {
                  stopVideo();
            }
      }, [isSectionInView, playingRenderIndex, stopVideo]);

      // Stop the video when the whole section scrolls out of view
      useEffect(() => {
            const node = sectionRef.current;
            if (!node) return;

            const observer = new IntersectionObserver(
                  (entries) => {
                        const entry = entries[0];
                        const inView = Boolean(entry?.isIntersecting) && (entry?.intersectionRatio ?? 0) >= 0.2;
                        setIsSectionInView(inView);
                  },
                  { threshold: [0, 0.2, 0.5, 1] }
            );

            observer.observe(node);
            return () => observer.disconnect();
      }, []);

      return (
            <section ref={sectionRef} className="py-16 px-[5%] lg:px-[10%] bg-[#FBF7F2] relative">
                  <div className="hidden lg:block absolute z-10 left-0 top-10">
                        <img src={typeof fruit === "string" ? fruit : fruit.src} alt="" className="h-72" />
                  </div>
                  <div className="hidden lg:block absolute z-10 right-0 bottom-5">
                        <img src={typeof grass === "string" ? grass : grass.src} alt="" className="h-72" />
                  </div>

                  {/* Header */}
                  <div className="mb-12 flex w-full justify-between">
                        <div>
                              <div className="text-red-600 font-roboto font-bold mb-2 flex items-center">
                                    <div className="h-[10px] w-[10px] bg-red-600 mr-2" /> Crispy, Every Bite Taste
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
                        autoPlay={playingRenderIndex === null && isSectionInView}
                        interval={3000}
                        pauseOnHover={true}
                        isPaused={playingRenderIndex !== null || !isSectionInView}
                        itemsPerView={1}
                        onIndexChange={(index) => {
                              setCurrentIndex(index);
                        }}
                        onTrackIndexChange={(trackIndex) => {
                              setCurrentTrackIndex(trackIndex);
                        }}
                        renderItem={(testimonial, logicalIndex, renderIndex) => {
                              const safeLogicalIndex = logicalIndex ?? 0;
                              const safeRenderIndex = renderIndex ?? 0;
                              const isPlaying = playingRenderIndex === safeRenderIndex;
                              const shouldLoad = isPlaying || loadedVideos.has(safeLogicalIndex);

                              return (
                                    <div className="flex justify-center h-full px-2">
                                          <TestimonialCard
                                                quote={testimonial.quote}
                                                authorName={testimonial.authorName}
                                                location={testimonial.location}
                                                avatar={testimonial.avatar}
                                                shouldLoad={shouldLoad}
                                                isPlaying={isPlaying}
                                                videoSrc={buildYoutubeEmbedSrc(testimonial.videoUrl)}
                                                onPlay={() => {
                                                      loadVideo(safeLogicalIndex);
                                                      setPlayingRenderIndex(safeRenderIndex);
                                                }}
                                          />
                                    </div>
                              );
                        }}
                  />

                  {/* Mobile Navigation */}
                  <div className="lg:hidden flex justify-center items-center mt-5">
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
