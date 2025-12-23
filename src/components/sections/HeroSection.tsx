"use client";

import heroImage from "../../assets/hero-image.jpeg";
import offerImage from "../../assets/Offer.svg";
import vectorImage from "../../assets/Vector.svg";
import ranges from "../../assets/ranges.png";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Home page hero.
 *
 * Client component for GSAP animations.
 */
const HeroSection = () => {
      const containerRef = useRef(null);
      const vectorRef = useRef(null);
      const offerRef = useRef(null);

      useEffect(() => {
            const ctx = gsap.context(() => {
                  // 1. Vector Animation: Continuous "Windmill" Spin
                  // We delay this too so it starts spinning when it appears
                  gsap.to(vectorRef.current, {
                        rotation: -360,
                        repeat: -1,
                        ease: "none",
                        duration: 1, // Faster: 4 seconds per revolution
                        delay: 0.5,
                  });

                  // 1b. Vector Entry: Fly in from outside (Right) - No Fade
                  gsap.fromTo(
                        vectorRef.current,
                        {
                              x: "50vw", // Start well outside
                              y: -50,
                              autoAlpha: 1, // Visible immediately (off-screen)
                        },
                        {
                              x: 0,
                              y: 0,
                              autoAlpha: 1, // Stay visible
                              duration: 2,
                              ease: "power3.out",
                        }
                  );

                  // 2. Offer Animation Master Timeline
                  const tl = gsap.timeline({
                        scrollTrigger: {
                              trigger: containerRef.current,
                              start: "top top",
                              end: "bottom top",
                              scrub: 1,
                              markers: false,
                        },
                  });

                  // Step A: Load Animation (Immediate, not scrubbed initially, but we need to trick it)
                  // Actually, for combined Load + Scroll effects, it's safer to separate them completely to avoid conflict.

                  // 2. Offer Animation: Entry (Roll In) - No Fade
                  gsap.fromTo(
                        offerRef.current,
                        { x: "100vw", rotation: 720, autoAlpha: 1 }, // Start off screen Right, Fully Visible
                        { x: 0, rotation: 0, autoAlpha: 1, duration: 2.5, ease: "power2.out"}
                  );

                  // 3. Offer Animation: Scroll Exit (Roll Out)
                  // immediateRender: false is CRITICAL here so it doesn't lock the starting values before the entry finishes.
                  gsap.to(offerRef.current, {
                        x: "100vw", // Match the entry distance for symmetry
                        rotation: 7200,
                        ease: "none",
                        scrollTrigger: {
                              trigger: containerRef.current,
                              start: "top top", // Start immediately at top
                              end: "bottom top", // End when hero leaves
                              scrub: 1, // Smooth scrubbing (approx 1s catchup)
                              toggleActions: "play none none reverse", // Fallback if scrub fails
                        },
                        immediateRender: false, // wait for entry to establish position
                  });
            }, containerRef); // Scope to container

            return () => ctx.revert(); // Cleanup
      }, []);

      return (
            <section
                  id="hero"
                  ref={containerRef}
                  className="relative flex h-screen min-h-[667px] overflow-hidden bg-[#BD1F17] justify-center items-end lg:items-center bg-repeat bg-[length:100px_100px] pb-8"
                  style={{ backgroundImage: `url(${ranges.src})` }}
            >
                  <div className="flex z-0 absolute inset-0 bg-gradient-to-r from-[#BD1F17] via-[#A61D13] to-[#8E1B0F] items-center justify-center opacity-90 "></div>
                  <div className="flex max-w-[567px] flex-col lg:flex-row h-[90%] items-center justify-center w-full lg:h-[60%]  lg:w-[80%] px-5 opacity-100 z-10 lg:max-w-[1300px]">
                        <div className="text-left flex flex-col lg:w-[40%] justify-around h-[70%]">
                              <h1 className="text-5xl lg:text-8xl lg:w-fit font-bebas-neue lg:-mr-[60%] z-20 text-white lg:bg-[#bd1f1771] lg:pr-8 lg:pt-4">
                                    TASTE THE AUTHENTIC <br /> SAUDI CUISINE
                              </h1>
                              <span className="text-white font-roboto text-xl ">Among the best Saudi chefs in the world, serving you something beyond flavor.</span>
                              <a href="#menu" className="bg-yellow-500 text-black  text-[18px] font-bold leading-[24px] text-center hover:bg-yellow-400 transition w-fit h-[56px] px-6 py-4 gap-2">
                                    EXPLORE MENU
                              </a>
                        </div>
                        <div className="w-full h-[50%] min-h-[220px] lg:h-full lg:w-[60%] opacity-100 lg:mt-0 lg:min-w-[500px] relative">
                              <div ref={vectorRef} className="absolute -right-0 -top-5 lg:-top-[35px] lg:-right-[30px] w-[45px] h-[45px] opacity-0">
                                    <Image src={vectorImage} alt="Saudi cuisine hero image" className="w-full h-full object-cover" loading="eager" />
                              </div>

                              {/* LCP image: use next/image for responsive sizing + automatic optimization */}
                              <Image
                                    src={heroImage}
                                    alt="Saudi cuisine hero image"
                                    fill
                                    priority
                                    placeholder="blur"
                                    sizes="(min-width: 1024px) 60vw, 100vw"
                                    className="object-cover scale-x-[-1] opacity-100"
                              />
                              <div ref={offerRef} className="w-[120px] h-[120px] object-cover absolute right-2 bottom-2 lg:-right-[60px] lg:bottom-[0px] bg-yellow-500 rounded-full p-2 opacity-0">
                                    <Image src={offerImage} alt="Saudi cuisine hero image" className="w-full h-full" loading="eager" />
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default HeroSection;
