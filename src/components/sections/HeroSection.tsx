import heroImage from "../../assets/hero-image.jpeg";
import offerImage from "../../assets/Offer.svg";
import vectorImage from "../../assets/Vector.svg";
import ranges from "../../assets/ranges.png";
import Image from "next/image";

/**
 * Home page hero.
 *
 * Pure presentational section (no state), safe to keep as a server component.
 */
const HeroSection = () => {
      return (
            <section
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
                              <img
                                    src={vectorImage.src}
                                    alt="Saudi cuisine hero image"
                                    className="w-[45px] h-[45px] object-cover absolute -right-0 -top-5 lg:-top-[35px] lg:-right-[30px]"
                                    loading="eager"
                              />

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
                              <div className="w-[120px] h-[120px] object-cover absolute right-2 bottom-2 lg:-right-[60px] lg:bottom-[0px] bg-yellow-500 rounded-full p-2">
                                    <img src={offerImage.src} alt="Saudi cuisine hero image" width={"100%"} height={"100%"} loading="eager" />
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default HeroSection;
