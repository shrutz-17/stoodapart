import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { ProductCard } from './components/ProductCard';
import { fetchAndMergeCSV } from './utils/csvUtils';
import { parsePrice } from './utils/productData';

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('newest');
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, 1000]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavorites, setShowFavorites] = useState(false);

  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    fetchAndMergeCSV([
      '/matalan-2024-11-21.csv',
      '/lovall-2024-11-26.csv',
      '/phase-eight-2024-11-26.csv',
      '/whistles-2024-11-26 - Copy.csv',
      '/whitestuff-2024-11-26.csv',
      '/relr-2024-11-26.csv',
      '/neverfullydressed-2024-11-26.csv',
      '/pixiegirl-2024-12-01-blue.csv',
      '/pixiegirl-2024-12-01-black.csv',
      'boohoo-2024-12-01-black.csv',
      //'/pixiegirl-2024-11-26-skirts.csv'
    ])
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading CSV:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(new Set(JSON.parse(storedFavorites)));
    }
  }, []);

  useEffect(() => {
    if (favorites.size > 0) {
      localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    } else {
      localStorage.removeItem('favorites');
    }
  }, [favorites]);

  const minPrice = useMemo(() => {
    if (products.length === 0) return 0;
    return Math.min(
      ...products.map((product) => parsePrice(product.currentPrice) || 0)
    );
  }, [products]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.max(
      ...products.map((product) => parsePrice(product.currentPrice) || 0)
    );
  }, [products]);

  const uniqueColours = useMemo(() => {
    const colours = new Set<string>();
    products.forEach(product => {
      if (product.colour) {
        colours.add(product.colour.trim());
      }
    });
    return Array.from(colours).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(
        (product) =>
          (product.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) ||
          (product.description?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category));
    }

    if (selectedColours.length > 0) {
      result = result.filter((product) => {
        const productColour = product.colour?.trim();
        return selectedColours.some(selectedColour => 
          productColour?.toLowerCase() === selectedColour.toLowerCase()
        );
      });
    }

    result = result.filter((product) => {
      const price = parsePrice(product.currentPrice);
      return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
    });

    if (sortOption === 'price-asc') {
      result.sort((a, b) => parsePrice(a.currentPrice) - parsePrice(b.currentPrice));
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => parsePrice(b.currentPrice) - parsePrice(a.currentPrice));
    } else if (sortOption === 'discount') {
      result.sort((a, b) => {
        const discountA = a.originalPrice ? parsePrice(a.originalPrice) - parsePrice(a.currentPrice) : 0;
        const discountB = b.originalPrice ? parsePrice(b.originalPrice) - parsePrice(b.currentPrice) : 0;
        return discountB - discountA;
      });
    }

    return result;
  }, [products, selectedBrands, selectedCategories, selectedColours, selectedPriceRange, sortOption, searchQuery]);

  const itemsPerPage = 40;
  const totalProductCount = filteredAndSortedProducts.length;

  const loadMoreProducts = () => {
    if (page < Math.ceil(totalProductCount / itemsPerPage) && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const paginatedProducts = useMemo(() => {
    const start = 0;
    const end = page * itemsPerPage;
    return filteredAndSortedProducts.slice(start, end);
  }, [filteredAndSortedProducts, page]);

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1000) {
        loadMoreProducts();
      }

      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, totalProductCount]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFavoriteToggle = (productId: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(productId)) {
        updatedFavorites.delete(productId);
      } else {
        updatedFavorites.add(productId);
      }
      return updatedFavorites;
    });
  };

  const filteredFavorites = filteredAndSortedProducts.filter((product) =>
    favorites.has(product.id)
  );

  const displayedProducts = showFavorites ? filteredFavorites : paginatedProducts;

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onHeartClick={() => {
          setShowFavorites((prev) => !prev);
          setSelectedBrands([]);
          setSelectedCategories([]);
          setSelectedColours([]);
          setSelectedPriceRange([0, 1000]);
        }}
        showFavorites={showFavorites}
      />
      <div className="container mx-auto px-4 py-6 flex">
        <div className="w-full sm:w-1/4 lg:w-1/4">
          <Filters
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedColours={selectedColours}
            setSelectedColours={setSelectedColours}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            sortOption={sortOption}
            setSortOption={setSortOption}
            minPrice={minPrice}
            maxPrice={maxPrice}
            uniqueColours={uniqueColours}
          />
        </div>
        <div className="w-full sm:w-3/4 lg:w-3/4 pl-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              {showFavorites
                ? `${filteredFavorites.length} products found in favorites`
                : `${totalProductCount} products found`}
            </div>
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border px-2 py-1"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="discount">Discount</option>
              </select>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            ref={gridContainerRef}
          >
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onFavorite={() => handleFavoriteToggle(product.id)}
                isFavorite={favorites.has(product.id)}
              />
            ))}
          </div>
          {loading && <div>Loading more products...</div>}
        </div>
      </div>
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#333333] text-[#f7e9d5] rounded-full p-4 hover:bg-gray-800 transition duration-300"
          style={{
            fontSize: '20px',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;