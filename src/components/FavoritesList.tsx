import React from 'react';
import { Restaurant } from '../types/Restaurant';
import { Heart, Star, DollarSign } from 'lucide-react';

interface FavoritesListProps {
  favorites: Restaurant[];
  onRemove: (id: string) => void;
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemove, onRestaurantClick }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No favorites yet!</p>
        <p className="text-sm text-gray-400">Spin the wheel and save restaurants you love.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {favorites.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          onClick={() => onRestaurantClick(restaurant)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{restaurant.name}</h4>
              <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
              
              <div className="flex items-center space-x-3 mt-2">
                {restaurant.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{restaurant.rating}</span>
                  </div>
                )}
                
                {restaurant.priceRange && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">{restaurant.priceRange}</span>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-blue-600 mt-2">Click to view details</p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(restaurant.id);
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
            >
              <Heart className="h-5 w-5 fill-current" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};