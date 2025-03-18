// components/Slider.tsx
"use client";
import { useState, useEffect } from "react";
import { getSliders } from "../utils/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Slider() {
  const base_storage_url = process.env.NEXT_PUBLIC_STORAGE_URL;
  const [sliders, setSliders] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const fetchSliders = async () => {
      const response = await getSliders();
      setSliders(response.data);
    };
    fetchSliders();

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliders.length]);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % sliders.length);
  };

  const handleDotClick = (index: number) => {
    setSlideIndex(index);
  };

  if (sliders.length === 0) return null;

  return (
    <div className="slider fixed top-0 left-0 w-full h-full z-[1] overflow-hidden">
      <button
        onClick={handlePrev}
        id="prevBtn"
        className="slider-btn absolute left-5 top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-none border-none cursor-pointer z-40 text-white hover:text-secondary hover:scale-110 transition-all duration-300"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        id="nextBtn"
        className="slider-btn absolute right-5 top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-none border-none cursor-pointer z-40 text-white hover:text-secondary hover:scale-110 transition-all duration-300"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
      <div className="slides relative w-full h-full" id="slides">
        {sliders.map((slide: any, index: number) => (
          <div
            key={slide.id}
            className={`slide absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-[800ms] ease-in-out ${
              index === slideIndex ? "active" : ""
            }`}
          >
            <img
              src={`${base_storage_url}/${slide.background_image}`}
              alt={`Slide ${index + 1}`}
              className={`w-full h-full object-cover absolute z-[-1] transition-[clip-path] duration-[800ms] ease-in-out ${
                index === slideIndex
                  ? "clip-path-[polygon(0_0,100%_0,100%_100%,0_100%)]"
                  : "clip-path-[polygon(0_0,100%_0,100%_50%,0_50%)]"
              }`}
            />
            <div
              className={`slide-content relative z-[2] text-center text-white ${
                index === slideIndex ? "animate-fadeInUp" : ""
              }`}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">
                  {slide.title.split(" ").slice(0, -2).join(" ")}
                </span>
                <span className="text-secondary">
                  {" "}
                  {slide.title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>
              <p className="text-md md:text-lg mb-6">{slide.description}</p>
              {slide.button_link && slide.button_text && (
                <a href={slide.button_link}>
                  <button className="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-secondary hover:text-white transition w-fit">
                    {slide.button_text}
                  </button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="slider-overlay absolute inset-0 bg-[rgba(12,60,65,0.6)] backdrop-blur-[5px] z-[1]"></div>

      <div className="dots absolute bottom-[30px] left-1/2 -translate-x-1/2 flex gap-3 z-[3]">
        {sliders.map((_, index: number) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`dot w-3 h-3 bg-[rgba(255,255,255,0.5)] rounded-full cursor-pointer transition-all duration-300 ${
              index === slideIndex
                ? "bg-secondary scale-[1.3]"
                : "hover:bg-secondary hover:scale-[1.3]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
