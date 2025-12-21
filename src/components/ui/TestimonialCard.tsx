import sideVertor from "../../assets/sideVector.svg";
import quoteImage from "../../assets/quote.svg";
import type { StaticImageData } from "next/image";

type TestimonialCardProps = {
      quote: string;
      authorName: string;
      location: string;
      avatar: string | StaticImageData;
      shouldLoad: boolean;
      isPlaying: boolean;
      videoSrc: string;
      onPlay: () => void;
};

const TestimonialCard = ({ quote, authorName, location, avatar, shouldLoad, isPlaying, videoSrc, onPlay }: TestimonialCardProps) => {
      const avatarSrc = typeof avatar === "string" ? avatar : avatar.src;

      return (
            <div className="flex flex-col-reverse lg:flex-row items-stretch text-center bg-white h-fit w-full max-w-7xl mx-auto">
                  {/* Card Content */}
                  <div className="w-full lg:w-[45%] flex-shrink-0">
                        <div className="flex flex-col justify-between w-full bg-yellow-500 border-2 px-[9%] lg:px-[10%] py-[10%] relative text-gray-800 h-[450px] lg:h-[555px] ">
                              <img src={typeof sideVertor === "string" ? sideVertor : sideVertor.src} alt="" className="lg:block absolute left-0 bottom-0 lg:bottom-10 w-8" />
                              <div className="w-full">
                                    <img src={typeof quoteImage === "string" ? quoteImage : quoteImage.src} alt="" className="h-4 w-4" />
                                    <p className="text-lg font-roboto text-left pl-4">{quote} </p>
                              </div>

                              <div className="flex items-start justify-between border-b-2 border-b-black z-0 relative h-16 mb-6 lg:mb-0">
                                    <div className="text-left">
                                          <p className="text-lg font-bebas-neue">{authorName}</p>
                                          <p className="text-xs font-roboto">{location}</p>
                                    </div>
                                    <div className="h-full w-fit  border-b-4 border-b-red-800 z-20 absolute right-0 ">
                                          <img src={avatarSrc} alt="Author" className="w-12 h-12 rounded-full " />
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Video Container */}
                  <div className="w-full lg:w-[55%] h-[335px] lg:h-[555px] flex-shrink-0 relative bg-gray-100">
                        {shouldLoad && isPlaying ? (
                              <iframe
                                    className="w-full h-full"
                                    src={videoSrc}
                                    title="Customer Testimonial"
                                    allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                              />
                        ) : (
                              <button
                                    type="button"
                                    onClick={onPlay}
                                    className="w-full h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                                    aria-label="Play testimonial video"
                              >
                                    <div className="flex flex-col items-center gap-2">
                                          <div className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center text-2xl">▶</div>
                                          <div className="text-gray-500 text-sm">{shouldLoad ? "Click to play" : "Loading..."}</div>
                                    </div>
                              </button>
                        )}
                  </div>
            </div>
      );
};

export default TestimonialCard;
