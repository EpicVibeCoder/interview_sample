
import profilePic from "../../assets/profile.png"
import sideVertor from "../../assets/sideVector.svg"
import quoteImage from "../../assets/quote.svg"
type TestimonialCardProps = {
  quote: string;
  authorName: string;
  location: string;
};

const TestimonialCard = ({ quote, authorName, location }: TestimonialCardProps) => {
  return (
    <div className="flex flex-col justify-between w-full lg:w-[45%] bg-yellow-500 border-2 px-[9%] lg:px-[5%] py-[5%] relative text-gray-800 h-[335px] lg:h-[555px] ">
      <img src={typeof sideVertor === 'string' ? sideVertor : sideVertor.src} alt="" className="lg:block absolute left-0 bottom-0 lg:bottom-10 w-8" />
      <div className="w-full">
        <img src={typeof quoteImage === 'string' ? quoteImage : quoteImage.src} alt="" className="h-4 w-4" />
        <p className="text-lg font-roboto text-left pl-4">{quote} </p>
      </div>

      <div className="flex items-start justify-between border-b-2 border-b-black z-0 relative h-14 mb-6 lg:mb-0">
        <div className="text-left">
          <p className="text-lg font-bebas-neue">{authorName}</p>
          <p className="text-xs font-roboto">{location}</p>
        </div>
        <div className="h-full w-fit  border-b-4 border-b-red-800 z-20 absolute right-0 ">
          <img src={typeof profilePic === 'string' ? profilePic : profilePic.src} alt="Author" className="w-10 h-10 rounded-full " />
        </div>

      </div>
    </div>
  );
};

export default TestimonialCard;