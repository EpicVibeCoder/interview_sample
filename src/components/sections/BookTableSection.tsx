"use client";

import { useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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

  // Show a "text-like" date input (with placeholder + custom icon) until focus,
  // then switch to the native date picker for actual selection.
  const [dateInputMode, setDateInputMode] = useState<"text" | "date">("text");
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const openNativeDatePicker = () => {
    setDateInputMode("date");

    // Switching `type` can interrupt focus; open the picker on the next frame.
    window.requestAnimationFrame(() => {
      const el = dateInputRef.current;
      if (!el) return;

      el.focus();
      // Chromium-based browsers support `showPicker()` for date inputs.
      // Safe to call guarded; unsupported browsers will just ignore this.
      el.showPicker?.();
    });
  };

  const setPeople = (value: number) => {
    const normalized = Math.max(1, Math.floor(value));
    setFormData((prev) => ({ ...prev, people: String(normalized) }));
  };

  const bumpPeople = (delta: 1 | -1) => {
    const current = Number(formData.people);
    const safeCurrent = Number.isFinite(current) && current > 0 ? current : 0;
    setPeople(safeCurrent + delta);
  };

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
              <div className="relative">
                <input
                  type={dateInputMode}
                  name="date"
                  ref={dateInputRef}
                  value={formData.date}
                  onChange={handleChange}
                  onClick={() => {
                    // Clicking the "text" version should open the date picker immediately.
                    if (dateInputMode === "text") openNativeDatePicker();
                  }}
                  onFocus={() => {
                    // Keyboard tab into the field should also open the picker.
                    if (dateInputMode === "text") openNativeDatePicker();
                  }}
                  onBlur={() => {
                    // Avoid collapsing back to "text" immediately when the browser opens the picker.
                    window.setTimeout(() => {
                      const el = dateInputRef.current;
                      const isFocused = el != null && document.activeElement === el;
                      if (!isFocused && !formData.date) setDateInputMode("text");
                    }, 150);
                  }}
                  className={`w-full bg-transparent border ${errors.date ? "border-red-500" : "border-white"} px-4 py-2 pr-10 text-sm placeholder-white`}
                  placeholder="Reservation Date"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/80">
                  <FiCalendar aria-hidden="true" />
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="people"
                  value={formData.people}
                  onChange={(e) => {
                    // Keep the state as a string, but normalize to a whole number when possible.
                    const raw = e.target.value;
                    if (raw === "") {
                      setFormData((prev) => ({ ...prev, people: "" }));
                      return;
                    }
                    setPeople(Number(raw));
                  }}
                  min={1}
                  placeholder="Total People"
                  className={`w-full bg-transparent border ${errors.people ? "border-red-500" : "border-white"} px-4 py-2 pr-12 text-sm placeholder-white`}
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col justify-between">
                  <button
                    type="button"
                    onClick={() => bumpPeople(1)}
                    className="text-white/80 hover:text-white leading-none"
                    aria-label="Increase people"
                  >
                    <FiChevronUp aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => bumpPeople(-1)}
                    className=" text-white/80 hover:text-white leading-none"
                    aria-label="Decrease people"
                  >
                    <FiChevronDown aria-hidden="true" />
                  </button>
                </div>
              </div>
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


