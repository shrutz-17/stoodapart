import React, { useState, useEffect } from 'react';
import { Search, Heart } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onHeartClick: () => void; // Function passed from the parent to toggle favorites
}

export function Header({ searchQuery, setSearchQuery, onHeartClick }: HeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // For rotating taglines
  const [isHeartRed, setIsHeartRed] = useState(false); // Track heart icon color
  const taglines = [
    "Browse PETITE fashion from over 100 trusted brands, all in one place!",
    "Discover & shop from small independent brands",
    "Compare and shop from different brands, all in one place"
  ];

  // Change the tagline every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Toggle heart color (red or default)
  const handleHeartClick = () => {
    setIsHeartRed((prev) => !prev); // Toggle heart color
    onHeartClick(); // Call parent function for heart click
  };

  return (
    <>
      {/* Top Bar with rotating taglines */}
      <div
        className="bg-[#333333] text-[#f7e9d5] text-sm flex justify-center items-center"
        style={{
          fontFamily: "Comfortaa, sans-serif", 
          position: "relative", 
          overflow: "hidden",
          height: '35px' // Adjusted height of the banner
        }}
      >
        {/* This container will move the text horizontally */}
        <div
          className="absolute whitespace-nowrap transition-all duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: "150%" // Increased the width of the container to make it wider
          }}
        >
          {taglines.map((tagline, index) => (
            <span
              key={index}
              className="px-4 inline-block"
              style={{
                minWidth: "100%", // Ensure the text takes up full width
                textAlign: "center",
              }}
            >
              {tagline}
            </span>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header className="bg-[#f7e9d5] shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex-1 flex items-center justify-start">
              <h1 className="text-2xl font-['Comfortaa'] text-[#333333]" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
                Stood Apart
              </h1>
            </div>

            <div className="flex items-center gap-4"> {/* Right side icons */}
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-[#333333] sm:text-sm"
                  placeholder="Search for petite clothing..."
                />
              </div>

              {/* Heart Icon (Favorite Button) */}
              <button
                onClick={handleHeartClick} // Toggle heart color on click
                className={`p-2 ${isHeartRed ? 'text-red-500' : 'text-[#333333]'} hover:text-red-500`}
              >
                <Heart className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
