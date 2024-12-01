import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { BrandFilter } from '../types';

interface FiltersProps {
  selectedBrands: BrandFilter[];
  setSelectedBrands: (brands: BrandFilter[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedPriceRange: [number, number];
  setSelectedPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
  selectedColours: string[];
  setSelectedColours: (colours: string[]) => void;
  uniqueColours: string[];
}

export function Filters({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  selectedPriceRange,
  setSelectedPriceRange,
  minPrice,
  maxPrice,
  selectedColours,
  setSelectedColours,
  uniqueColours,
}: FiltersProps) {
  const brands: BrandFilter[] = [
    'Dorothy Perkins',
    'Oasis',
    'Pixie Girl',
    'River Island',
    'Roman',
    'Papaya',
    'Boden',
    'Lovall',
    'Phase Eight',
    'Whistles',
    'White Stuff',
    'RELR',
    'Never Fully Dressed',
    'BOOHOO',
    'M&Co',
  ];

  const categories: string[] = [
    'Tops',
    'Knitwear',
    'Cardigans',
    'Dresses',
    'Skirts',
    'Jumpsuits & Playsuits',
    'Dungarees',
    'Hoodies',
    'Shorts',
    'Skorts',
    'Trousers',
    'Jeans',
    'Leggings & Jeggings',
    'Blazers',
    'Coats & Jackets',
    'Swimwear',
    'Nightwear & Loungewear',
    'Lingerie',
  ];

  const colorMap: { [key: string]: string } = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Gray': '#808080',
    'Cream': '#F5F5DC',
    'Camel': '#c19a6b',
    'Khaki': '#BDB76B',
    'Brown': '#594235',
    'Burgundy': '#800020',
    'Blue': '#0000FF',
    'Red': '#FF0000',
    'Green': '#008000',
    'Pink': '#FFC0CB',
    'Yellow': '#FFFF00',
    'Purple': '#800080',
    'Orange': '#FFA500',
    'Multicolour': '#FFD700'
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedColours([]);
    setSelectedPriceRange([minPrice, maxPrice]);
  };

  // Handle the price selection logic
  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'show-all') {
      setSelectedPriceRange([minPrice, maxPrice]);
    } else {
      const [min, max] = value.split('-').map(Number);
      setSelectedPriceRange([min, max]);
    }
  };

  // Handle toggling brands selection
  const toggleBrandSelection = (brand: BrandFilter) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };

  // Handle toggling categories selection
  const toggleCategorySelection = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  // Handle toggling colours selection
  const toggleColourSelection = (colour: string) => {
    setSelectedColours((prevSelectedColours) =>
      prevSelectedColours.includes(colour)
        ? prevSelectedColours.filter((c) => c !== colour)
        : [...prevSelectedColours, colour]
    );
  };

  // Get unique colors from the data and map them to their hex codes
  const processedColors = Object.entries(colorMap).map(([name, colorCode]) => ({
    name,
    colorCode
  }));

  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Brand Filter Section */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Brands:</span>
            </div>
            <button
              onClick={() => setSelectedBrands([])}
              className="text-sm font-medium text-black hover:underline"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrandSelection(brand)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedBrands.includes(brand)
                    ? 'bg-[#f7e9d5] text-black'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Category Filter Section */}
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Categories:</span>
            </div>
            <button
              onClick={() => setSelectedCategories([])}
              className="text-sm font-medium text-black hover:underline"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategorySelection(category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-[#f7e9d5] text-black'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Colour Filter Section */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Colours:</span>
            </div>
            <button
              onClick={() => setSelectedColours([])}
              className="text-sm font-medium text-black hover:underline"
            >
              Reset
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {processedColors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColourSelection(color.name)}
                className={`w-8 h-8 rounded-full border-2 transition-colors relative ${
                  selectedColours.includes(color.name)
                    ? 'border-black'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.colorCode }}
                title={color.name}
              >
                {selectedColours.includes(color.name) && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Price Range Filter Section */}
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Price Range:</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <select
              value={`${selectedPriceRange[0]}-${selectedPriceRange[1]}`}
              onChange={handlePriceChange}
              className="w-full px-5 py-3 text-sm rounded-md border border-gray-300"
            >
              <option value="show-all">Show All</option>
              <option value="0-50">Under £50</option>
              <option value="50-100">£50 - £100</option>
              <option value="100-200">£100 - £200</option>
              <option value="200-500">£200 - £500</option>
              <option value="500-1000">£500 - £1000</option>
              <option value="1000-999999">Over £1000</option>
            </select>
          </div>

          {/* Reset All Filters Button */}
          <div className="mt-6">
          <button
  onClick={resetFilters}
  className="w-full py-3 text-[#f7e9d5] bg-[#333333] rounded-md hover:bg-gray-800"
>
  Reset All Filters
</button>
          </div>
        </div>
      </div>
    </div>
  );
}