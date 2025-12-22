"use client";

import { useState } from "react";
import bag from "../../assets/bag.svg";
import burgerImage from "../../assets/burger.png";
import medal from "../../assets/medal.svg";
import package1 from "../../assets/package.svg";
import top_bowl from "../../assets/top_bowl.png";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface FeatureProps {
  icon: StaticImageData;
  title: string;
  description: string;
}

/**
 * About section with simple tab switching (About/Experience/Contact).
 *
 * Client component because it owns UI state (the active tab).
 */
const AboutSection = () => {
  // Define valid section types
  type SectionKey = "About" | "Experience" | "Contact";

  const [activeSection, setActiveSection] = useState<SectionKey>("About");

  const percentage = 80;

  // Dummy content for each section
  const sectionContent = {
    About: (
      <div>
        <h1 className="text-5xl  text-gray-900 mb-4 font-bebas-neue">EXCEPTIONAL CULINARY EXPERIENCE AND DELICIOUS FOOD</h1>
        <p className="text-gray-600 mb-6 leading-relaxed font-roboto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus. Vel hac convallis ipsum, facilisi odio pellentesque bibendum viverra tempus. Lorem ipsum dolor sit
          amet consectetur adipiscing elit do eiusmod tempor incididunt ut labore et dolore magna minim veniam nostrud exercitation.
        </p>
        <div className="flex items-center space-x-4">
          <button className="bg-yellow-500 text-black px-5 min-w-36 py-3 font-semibold font-roboto">ABOUT MORE</button>
          <div className="flex items-center space-x-2 text-gray-900">
            <span role="img" aria-label="phone" className="text-red-600">
              📞
            </span>
            <span className="font-semibold">+88 3426 739 485</span>
          </div>
        </div>
      </div>
    ),
    Experience: (
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Our Experience</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          We have over 50 years of experience in the food industry, providing exceptional dining and fast delivery services. Our team is dedicated to creating the best experiences for our customers.
        </p>
      </div>
    ),
    Contact: (
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">Contact Us</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">We&apos;d love to hear from you! Reach out with any questions, comments, or feedback.</p>
        <p className="text-gray-600">Email: support@foodexperience.com</p>
        <p className="text-gray-600">Phone: +88 3426 739 485</p>
      </div>
    ),
  };

  return (
    <section id="about" className="bg-white  flex flex-col lg:p-20 lg:px-[10%] relative">
      <div className="hidden lg:block absolute z-10 right-0 top-1/2 ">
        <Image src={top_bowl} alt="" className="h-72 w-auto" sizes="288px" />
      </div>

      <div className="flex flex-col lg:flex-row p-4 xs:p-2">
        {/* Image and Badge */}
        <div className=" w-full justify-items-center lg:w-1/2 p-2">
          <div className="relative w-full max-w-[674px]">
            <Image
              src={burgerImage}
              alt="Burger"
              width={674}
              height={674}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="block w-full h-auto"
              placeholder="blur"
            />
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg flex items-center w-[200px] font-semibold font-sans">
              <div className=" w-[50%]  flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#e6e6e6" strokeWidth="5" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#FEBF00"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (percentage * 314) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <circle cx="60" cy="10" r="7" fill="white" stroke="#FEBF00" strokeWidth="5" transform={`rotate(${(percentage * 360) / 100} 60 60)`} />
                  <text x="60" y="70" textAnchor="middle" className="text-3xl font-bold" fill="currentColor">
                    50+
                  </text>
                </svg>
              </div>
              <p className="w-[50%]">Market Experiences</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-2">
          {/* Header Navigation */}
          <div className="flex space-x-8 border-b border-red-700 ">
            <button
              onClick={() => setActiveSection("About")}
              className={`font-semibold font-inter  ${activeSection === "About" ? "text-white bg-red-700 px-4 py-2" : "text-[#333333] px-4 py-2"}`}
            >
              About
            </button>
            <button
              onClick={() => setActiveSection("Experience")}
              className={`font-semibold font-inter  ${
                activeSection === "Experience" ? "text-white bg-red-700 px-4 py-2" : "text-[#333333] px-4 py-2"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveSection("Contact")}
              className={`font-semibold font-inter  ${activeSection === "Contact" ? "text-white bg-red-700 px-4 py-2" : "text-[#333333] px-4 py-2"}`}
            >
              Contact
            </button>
          </div>

          {/* Main Text Content (Controlled by activeSection) */}
          <div className="w-full pt-10">{sectionContent[activeSection]}</div>
        </div>
      </div>
      {/* Features Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center p-4 lg:py-10 lg:justify-around w-full">
        <Feature icon={package1} title="Fast Delivery" description="Within 30 minutes" />
        <Feature icon={medal} title="Absolute Dining" description="Best buffet restaurant" />
        <Feature icon={bag} title="Pickup Delivery" description="Grab your food order" />
      </div>
    </section>
  );
};

// Feature component without using React.FC
function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex w-[290px] pb-10 lg:pb-0">
      <div className="flex items-center justify-center w-[70px] h-[70px] bg-white shadow-lg rounded-full p-4 mr-4">
        <Image src={icon} alt="" width={40} height={40} />
      </div>
      <div className="flex content-center">
        <h4 className=" text-gray-900 text-3xl font-bebas-neue">{title}</h4>
        <span className="text-gray-500 text-sm font-inter">{description}</span>
      </div>
    </div>
  );
}

export default AboutSection;


