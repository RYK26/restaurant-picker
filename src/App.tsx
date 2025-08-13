import React, { useState } from 'react';
import { RouletteWheel } from './components/RouletteWheel';
import { RestaurantForm } from './components/RestaurantForm';
import { FavoritesList } from './components/FavoritesList';
import { ResultCard } from './components/ResultCard';
import { Restaurant, CuisineCategory } from './types/Restaurant';
import { useFavorites } from './hooks/useFavorites';
import { Utensils, Heart, Plus, Grid, List } from 'lucide-react';

const defaultCategories: CuisineCategory[] = [
  {
    id: 'italian',
    name: 'Italian',
    color: '#FF6B35',
    restaurants: [
      { id: '1', name: 'Tony\'s Italian Bistro', cuisine: 'Italian', rating: 4.5, address: '123 Main St', phone: '(555) 123-4567', priceRange: '$$', description: 'Authentic Italian cuisine with homemade pasta and wood-fired pizzas.' },
      { id: '2', name: 'Nonna\'s Kitchen', cuisine: 'Italian', rating: 4.3, address: '456 Oak Ave', phone: '(555) 234-5678', priceRange: '$$$', description: 'Family recipes passed down through generations.' },
    ]
  },
  {
    id: 'japanese',
    name: 'Japanese',
    color: '#F7931E',
    restaurants: [
      { id: '3', name: 'Sakura Sushi', cuisine: 'Japanese', rating: 4.7, address: '789 Pine St', phone: '(555) 345-6789', priceRange: '$$$', description: 'Fresh sushi and traditional Japanese dishes.' },
      { id: '4', name: 'Ramen House', cuisine: 'Japanese', rating: 4.4, address: '321 Elm St', phone: '(555) 456-7890', priceRange: '$$', description: 'Authentic ramen bowls and Japanese comfort food.' },
    ]
  },
  {
    id: 'mexican',
    name: 'Mexican',
    color: '#FFD700',
    restaurants: [
      { id: '5', name: 'El Mariachi', cuisine: 'Mexican', rating: 4.3, address: '654 Maple Dr', phone: '(555) 567-8901', priceRange: '$$', description: 'Traditional Mexican flavors with fresh ingredients.' },
      { id: '6', name: 'Taco Libre', cuisine: 'Mexican', rating: 4.1, address: '987 Cedar Ln', phone: '(555) 678-9012', priceRange: '$', description: 'Casual Mexican eatery with great tacos and burritos.' },
    ]
  },
  {
    id: 'american',
    name: 'American',
    color: '#32CD32',
    restaurants: [
      { id: '7', name: 'The Burger Joint', cuisine: 'American', rating: 4.4, address: '147 Birch St', phone: '(555) 789-0123', priceRange: '$$', description: 'Gourmet burgers and classic American comfort food.' },
      { id: '8', name: 'Diner 24/7', cuisine: 'American', rating: 4.0, address: '258 Spruce Ave', phone: '(555) 890-1234', priceRange: '$', description: 'Classic American diner open 24 hours.' },
    ]
  },
  {
    id: 'indian',
    name: 'Indian',
    color: '#00CED1',
    restaurants: [
      { id: '9', name: 'Spice Garden', cuisine: 'Indian', rating: 4.6, address: '369 Willow Rd', phone: '(555) 901-2345', priceRange: '$$', description: 'Aromatic Indian spices and traditional curries.' },
      { id: '10', name: 'Curry Palace', cuisine: 'Indian', rating: 4.2, address: '741 Poplar St', phone: '(555) 012-3456', priceRange: '$$$', description: 'Elegant Indian dining with regional specialties.' },
    ]
  },
  {
    id: 'chinese',
    name: 'Chinese',
    color: '#4169E1',
    restaurants: [
      { id: '11', name: 'Golden Dragon', cuisine: 'Chinese', rating: 4.2, address: '852 Ash Blvd', phone: '(555) 123-4567', priceRange: '$$', description: 'Traditional Chinese cuisine with modern presentation.' },
      { id: '12', name: 'Panda Express', cuisine: 'Chinese', rating: 3.8, address: '963 Hickory Way', phone: '(555) 234-5678', priceRange: '$', description: 'Fast-casual Chinese-American favorites.' },
    ]
  },
];

function App() {
  const [categories, setCategories] = useState<CuisineCategory[]>(defaultCategories);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [wheelMode, setWheelMode] = useState<'categories' | 'restaurants'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<CuisineCategory | null>(null);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const allRestaurants = categories.flatMap(cat => cat.restaurants);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSelectedRestaurant(null);
    
    setTimeout(() => {
      if (wheelMode === 'categories') {
        const randomCategoryIndex = Math.floor(Math.random() * categories.length);
        const randomCategory = categories[randomCategoryIndex];
        const randomRestaurantIndex = Math.floor(Math.random() * randomCategory.restaurants.length);
        setSelectedRestaurant(randomCategory.restaurants[randomRestaurantIndex]);
      } else if (selectedCategory) {
        const randomIndex = Math.floor(Math.random() * selectedCategory.restaurants.length);
        setSelectedRestaurant(selectedCategory.restaurants[randomIndex]);
      }
      setIsSpinning(false);
    }, 3000);
  };

  const handleAddRestaurant = (restaurant: Omit<Restaurant, 'id'>) => {
    const newRestaurant: Restaurant = {
      ...restaurant,
      id: Date.now().toString(),
    };
    
    setCategories(prev => {
      const categoryIndex = prev.findIndex(cat => cat.name === restaurant.cuisine);
      if (categoryIndex >= 0) {
        const updatedCategories = [...prev];
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          restaurants: [...updatedCategories[categoryIndex].restaurants, newRestaurant]
        };
        return updatedCategories;
      } else {
        // Create new category
        const colors = ['#FF6B35', '#F7931E', '#FFD700', '#32CD32', '#00CED1', '#4169E1', '#8A2BE2', '#DC143C'];
        const newCategory: CuisineCategory = {
          id: restaurant.cuisine.toLowerCase().replace(/\s+/g, '-'),
          name: restaurant.cuisine,
          color: colors[prev.length % colors.length],
          restaurants: [newRestaurant]
        };
        return [...prev, newCategory];
      }
    });
    setShowForm(false);
  };

  const handleFavoriteToggle = (restaurant: Restaurant) => {
    if (isFavorite(restaurant.id)) {
      removeFavorite(restaurant.id);
    } else {
      addFavorite(restaurant);
    }
  };

  const handleCategorySelect = (category: CuisineCategory) => {
    setSelectedCategory(category);
    setWheelMode('restaurants');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setWheelMode('categories');
  };

  const handleFavoriteClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Restaurant Roulette
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setWheelMode('categories')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors duration-200 ${
                    wheelMode === 'categories' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                  <span className="text-sm">Categories</span>
                </button>
                <button
                  onClick={() => setWheelMode('restaurants')}
                  disabled={!selectedCategory}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors duration-200 ${
                    wheelMode === 'restaurants' ? 'bg-white shadow-sm' : 'text-gray-600'
                  } ${!selectedCategory ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <List className="h-4 w-4" />
                  <span className="text-sm">Restaurants</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Restaurant</span>
              </button>
              
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <Heart className="h-4 w-4" />
                <span>Favorites ({favorites.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Wheel Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Roulette Wheel */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {wheelMode === 'categories' ? 'Choose a Cuisine!' : `${selectedCategory?.name} Restaurants`}
                </h2>
                <p className="text-gray-600">
                  {wheelMode === 'categories' 
                    ? 'Spin to select a cuisine category' 
                    : 'Spin to pick a restaurant from this category'
                  }
                </p>
                {wheelMode === 'restaurants' && selectedCategory && (
                  <button
                    onClick={handleBackToCategories}
                    className="mt-2 text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    ← Back to Categories
                  </button>
                )}
              </div>
              
              <RouletteWheel
                categories={categories}
                selectedCategory={selectedCategory}
                wheelMode={wheelMode}
                onSpin={handleSpin}
                onCategorySelect={handleCategorySelect}
                isSpinning={isSpinning}
                selectedRestaurant={selectedRestaurant}
              />
            </div>

            {/* Result Card */}
            {selectedRestaurant && (
              <ResultCard
                restaurant={selectedRestaurant}
                isFavorite={isFavorite(selectedRestaurant.id)}
                onFavoriteToggle={() => handleFavoriteToggle(selectedRestaurant)}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Restaurant Form */}
            {showForm && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Restaurant</h3>
                <RestaurantForm onSubmit={handleAddRestaurant} />
              </div>
            )}

            {/* Favorites List */}
            {showFavorites && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Favorites</h3>
                <FavoritesList
                  favorites={favorites}
                  onRemove={removeFavorite}
                  onRestaurantClick={handleFavoriteClick}
                />
              </div>
            )}

            {/* Restaurant Count */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Categories:</span>
                  <span className="font-semibold text-orange-600">{categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Restaurants:</span>
                  <span className="font-semibold text-orange-600">{allRestaurants.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Favorites:</span>
                  <span className="font-semibold text-red-600">{favorites.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;