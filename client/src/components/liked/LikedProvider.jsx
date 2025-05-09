import React, { useState, useEffect } from 'react';
import { getToken } from '../../utils/auth';
import useAuth from '../../hooks/useAuth';
import { getLocal } from '../../utils/localStorage';
import { LikedContext } from './LikedContext';

const LikedProvider = ({ children }) => {
  const [liked, setLiked] = useState(getLocal('liked') || []);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  useEffect(() => {
    if (!user) {
      setLiked(getLocal('liked'));
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      console.error("No token available for fetching liked data");
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`${apiUrl}/api/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(serverLiked => {
        if (Array.isArray(serverLiked)) {
          const mergedLikes = [
            ...serverLiked,
            ...liked.filter(item => !serverLiked.some(i => i.id === item.id)),
          ];

          setLiked(mergedLikes);

          const likesToSync = liked.filter(item => !serverLiked.some(i => i.id === item.id));
          if (likesToSync.length > 0) {
            likesToSync.forEach(item => syncLiked(item, 'add'));
          }

          localStorage.removeItem('liked');
        }
      })
      .catch((err) => {
        console.error("Error fetching liked data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, apiUrl]);

  const syncLiked = (item, action) => {
    const token = getToken();
    if (!token) return;

    const method = action === 'add' ? 'POST' : 'DELETE';
    const url = `${apiUrl}/api/likes${action === 'delete' ? `/${item.id}` : ''}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    fetch(url, {
      method,
      headers,
      body: action === 'delete' ? null : JSON.stringify({ itemId: item.id }),
    }).catch((err) => {
      console.error("Error syncing liked data", err);
    });
  };

  const addToLiked = (item) => {
    setLiked(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      syncLiked(item, 'add');
      return [...prev, item];
    });
  };

  const removeFromLiked = (id) => {
    setLiked(prev => {
      const item = prev.find(i => i.id === id);
      if (item) syncLiked(item, 'delete');
      return prev.filter(i => i.id !== id);
    });
  };

  useEffect(() => {
    if (!user) {
      localStorage.setItem('liked', JSON.stringify(liked));
    }
  }, [liked, user]);

  return (
    <LikedContext.Provider
      value={{
        liked,
        likedCount: liked.length,
        addToLiked,
        removeFromLiked,
        setLiked,
        loading,
      }}
    >
      {children}
    </LikedContext.Provider>
  );
};

export default LikedProvider;