import call from "../../assets/call.svg";
import clock from "../../assets/clock.svg";
import dining from "../../assets/dining.jpeg";
import fb from "../../assets/fb.svg";
import gps from "../../assets/gps.svg";
import insta from "../../assets/insta.svg";
import linked from "../../assets/linked.svg";
import mail from "../../assets/mail.svg";
import twitter from "../../assets/twitter.svg";
import Image from "next/image";

/**
 * Site footer section with contact details and social links.
 *
 * Note: background image uses a Tailwind arbitrary `url(...)` string; keep it as-is
 * to avoid changing how Tailwind emits the final CSS.
 */
const Footer = () => {
  return (
    <section className="relative flex justify-center items-center text-white py-10 px-4 h-fit lg:h-[720px] overflow-hidden">
      {/* Background image served via next/image (resized + WebP/AVIF) */}
      <Image
        src={dining}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-black opacity-80" />
      <div className="z-10">
        {/* Heading */}
        <h2 className="text-5xl lg:text-7xl font-bebas-neue text-center mb-8">
          WE are READY TO give YOU THE BEST DINING EXPERIENCE
        </h2>

        {/* Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-center">
          {/* Opening Hours */}
          <div className="flex flex-col justify-center items-center gap-3">
            <Image alt="" src={clock} width={32} height={32} />
            <h3 className="text-3xl font-bebas-neue">OPENING HOURS</h3>
            <p className="font-roboto">Monday - Sunday</p>
            <p className="font-roboto">9:00 AM to 11:30 PM</p>
          </div>

          {/* Let's Talk */}
          <div className="flex flex-col justify-center items-center gap-3">
            <Image alt="" src={call} width={32} height={32} />
            <h3 className="text-3xl font-bebas-neue">LET&apos;S TALK</h3>
            <p className="font-roboto">Phone: 1-800-222-4545</p>
            <p className="font-roboto">Fax: 1-800-222-4545</p>
          </div>

          {/* Book a Table */}
          <div className="flex flex-col justify-center items-center gap-3">
            <Image alt="" src={mail} width={32} height={32} />
            <h3 className="text-3xl font-bebas-neue">BOOK A TABLE</h3>
            <p className="font-roboto">Email: demo@website.com</p>
            <p className="font-roboto">Support: support@website.com</p>
          </div>

          {/* Our Address */}
          <div className="flex flex-col justify-center items-center gap-3">
            <Image alt="" src={gps} width={32} height={32} />
            <h3 className="text-3xl font-bebas-neue">OUR ADDRESS</h3>
            <p className="font-roboto">123 Street New York City, United States of America</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-20">
          <div className="rounded-full border-white p-3 border-[1px]">
            <Image alt="" src={fb} width={16} height={16} />
          </div>

          <div className="rounded-full border-white p-3 border-[1px]">
            <Image alt="" src={twitter} width={16} height={16} />
          </div>
          <div className="rounded-full border-white p-3 border-[1px]">
            <Image alt="" src={insta} width={16} height={16} />
          </div>
          <div className="rounded-full border-white p-3 border-[1px]">
            <Image alt="" src={linked} width={16} height={16} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 font-roboto">
          <p>&copy; 2023 All Rights Reserved</p>
        </footer>
      </div>
    </section>
  );
};

export default Footer;


