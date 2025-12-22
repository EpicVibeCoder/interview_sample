"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "../../assets/icon.svg";

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * Top navigation for the site.
 *
 * Client component because it owns interactive state (mobile menu open/close).
 */
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50  text-white p-4 font-raleway">
      <nav className="flex justify-between items-center md:justify-around">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 justify-start md:mr-6">
            {/* SVG Icon */}
            <div className="w-10 h-10">
              <img
                src={Icon.src}
                alt="Restaurant Logo"
                className="w-full h-full"
              />
            </div>
            <span className="text-xl font-bold font-poppins ">
              Restau<span className="font-extralight">rant</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-yellow-300 text-xs font-raleway ">
              Home
            </Link>
            <a href="#about" className="hover:text-yellow-300 text-xs font-raleway">
              About
            </a>
            <a href="#menu" className="hover:text-yellow-300 text-xs font-raleway">
              Menu
            </a>
            <a href="#testimonials" className="hover:text-yellow-300 text-xs font-raleway">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-yellow-300 text-xs font-raleway">
              Contact
            </a>
          </div>
        </div>

        {/* Book a Table Button (Desktop Only) */}
        <div className="hidden md:flex items-center m-2">
          <a
            href="#contact"
            className="bg-yellow-500 text-black p-2 px-4 font-bold hover:bg-yellow-400 transition text-sm font-roboto "
          >
            BOOK A TABLE
          </a>
        </div>

        {/* Burger Menu Icon (Mobile Only) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <CloseIcon className="w-6 h-6 text-white" />
            ) : (
              <MenuIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-700 text-white py-4">
          <ul className="space-y-4 px-4">
            <li>
              <a href="#about" className="block hover:text-yellow-300">
                About
              </a>
            </li>
            <li>
              <a href="#menu" className="block hover:text-yellow-300">
                Menu
              </a>
            </li>
            <li>
              <a href="#testimonials" className="block hover:text-yellow-300">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="block hover:text-yellow-300">
                Contact
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="bg-yellow-500 text-black block text-center px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
              >
                Book a Table
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;


