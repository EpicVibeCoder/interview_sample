"use client";

import { useState } from "react";

/**
 * "Book your table" lead-capture form.
 *
 * Client component because it owns form state + validation UI.
 */
const BookTableSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    people: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    date: false,
    people: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      date: formData.date.trim() === "",
      people: formData.people.trim() === "",
    };
    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Submit form data (this is where you'd send it to a backend)
    console.log("Form submitted:", formData);

    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      date: "",
      people: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="flex items-start justify-center bg-[url('./assets/fork.jpeg')] bg-cover bg-center lg:bg-top text-white py-16 px-8 lg:h-[788px]">
      <div className="max-w-7xl w-full grid md:grid-cols-2 ">
        {/* Left Section - Form */}
        <div className="space-y-10">
          <div className="text-red-600 font-roboto mb-2 flex items-center">
            <div className="h-[10px] w-[10px] bg-red-600 mr-2" /> Book Now
          </div>

          <h2 className="text-4xl lg:text-7xl font-bebas-neue">BOOK YOUR TABLE</h2>
          <p className="text-white text-sm">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col lg:grid grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name *"
                className={`bg-transparent border ${errors.name ? "border-red-500" : "border-white"} px-4 py-2 text-sm placeholder-white`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`bg-transparent border ${errors.email ? "border-red-500" : "border-white"} px-4 py-2 text-sm placeholder-white`}
              />
            </div>
            <div className="flex flex-col lg:grid grid-cols-2 gap-6">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`bg-transparent border ${errors.date ? "border-red-500" : "border-white"} px-4 py-2 text-sm placeholder-white`}
                placeholder="MM/DD/YYYY"
              />
              <input
                type="number"
                name="people"
                value={formData.people}
                onChange={handleChange}
                placeholder="Total People"
                className={`bg-transparent border ${errors.people ? "border-red-500" : "border-white"} px-4 py-2 text-sm placeholder-white`}
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="w-full bg-transparent border border-white px-4 py-2 text-sm placeholder-white"
            ></textarea>
            <button type="submit" className="w-[150px] bg-yellow-500 text-black font-bold py-2 hover:bg-yellow-600 transition-colors w-max-[45px]">
              BOOK NOW
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookTableSection;


