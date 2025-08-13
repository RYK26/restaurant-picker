import React, { useState } from 'react';
import { Restaurant } from '../types/Restaurant';

interface RestaurantFormProps {
  onSubmit: (restaurant: Omit<Restaurant, 'id'>) => void;
}

const cuisineOptions = [
  'Italian', 'Japanese', 'Mexican', 'American', 'Indian', 'Chinese',
  'Mediterranean', 'French', 'Thai', 'Korean', 'Vietnamese', 'Greek'
];

export const RestaurantForm: React.FC<RestaurantFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    rating: 4.0,
    address: '',
    phone: '',
    priceRange: '$$' as '$' | '$$' | '$$$' | '$$$$',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.cuisine.trim()) {
      onSubmit({
        name: formData.name.trim(),
        cuisine: formData.cuisine.trim(),
        rating: formData.rating,
        address: formData.address.trim() || undefined,
        phone: formData.phone.trim() || undefined,
        priceRange: formData.priceRange,
        description: formData.description.trim() || undefined,
      });
      setFormData({
        name: '',
        cuisine: '',
        rating: 4.0,
        address: '',
        phone: '',
        priceRange: '$$',
        description: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Restaurant Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter restaurant name"
          required
        />
      </div>

      <div>
        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
          Cuisine Type *
        </label>
        <select
          id="cuisine"
          value={formData.cuisine}
          onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          required
        >
          <option value="">Select cuisine type</option>
          {cuisineOptions.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <select
          id="priceRange"
          value={formData.priceRange}
          onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as '$' | '$$' | '$$$' | '$$$$' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="$">$ - Budget</option>
          <option value="$$">$$ - Moderate</option>
          <option value="$$$">$$$ - Expensive</option>
          <option value="$$$$">$$$$ - Very Expensive</option>
        </select>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address (Optional)
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter address"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Describe the restaurant..."
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-200 font-medium"
      >
        Add Restaurant
      </button>
    </form>
  );
};