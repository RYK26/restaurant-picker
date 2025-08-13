import React from 'react';
import { Restaurant } from '../types/Restaurant';
import { Heart, Star, DollarSign, MapPin, Phone, Globe, Clock } from 'lucide-react';

interface ResultCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  restaurant,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-1">🎉 Winner!</h3>
            <p className="text-orange-100">Your dining destination awaits</p>
          </div>
          <button
            onClick={onFavoriteToggle}
            className={`p-3 rounded-full transition-colors duration-200 ${
              isFavorite
                ? 'bg-red-600 text-white'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h2>
        <p className="text-lg text-gray-600 mb-4">{restaurant.cuisine} Cuisine</p>
        
        {restaurant.description && (
          <p className="text-gray-600 mb-4 italic">{restaurant.description}</p>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {restaurant.rating && (
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="text-lg font-semibold text-gray-800">{restaurant.rating}</span>
            </div>
          )}
          
          {restaurant.priceRange && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="text-lg font-semibold text-gray-800">{restaurant.priceRange}</span>
            </div>
          )}
          
          {restaurant.address && (
            <div className="flex items-start space-x-2 col-span-2">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <span className="text-gray-600">{restaurant.address}</span>
            </div>
          )}
          
          {restaurant.phone && (
            <div className="flex items-center space-x-2 col-span-2">
              <Phone className="h-5 w-5 text-purple-500" />
              <span className="text-gray-600">{restaurant.phone}</span>
            </div>
          )}
          
          {restaurant.website && (
            <div className="flex items-center space-x-2 col-span-2">
              <Globe className="h-5 w-5 text-indigo-500" />
              <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">
                Visit Website
              </a>
            </div>
          )}
          
          {restaurant.hours && (
            <div className="flex items-center space-x-2 col-span-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="text-gray-600">{restaurant.hours}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-200 font-semibold">
            Get Directions
          </button>
          <button className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-semibold">
            Call Restaurant
          </button>
        </div>
      </div>
    </div>
  );
};