import { useState, useEffect } from 'react';
import { Restaurant } from '../types/Restaurant';

const FAVORITES_KEY = 'restaurant-roulette-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (restaurant: Restaurant) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === restaurant.id);
      if (isAlreadyFavorite) return prev;
      return [...prev, restaurant];
    });
  };

  const removeFavorite = (restaurantId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== restaurantId));
  };

  const isFavorite = (restaurantId: string) => {
    return favorites.some(fav => fav.id === restaurantId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};