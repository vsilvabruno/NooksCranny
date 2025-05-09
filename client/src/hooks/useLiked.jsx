import { useContext } from 'react';
import { LikedContext } from '../components/liked/LikedContext';

export const useLiked = () => {
  const context = useContext(LikedContext);
  if (!context) {
    throw new Error('useLiked must be used within a LikedProvider');
  }
  return context;
};