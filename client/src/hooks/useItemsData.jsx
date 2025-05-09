import { useState, useEffect } from 'react';

function useItemsData(searchTerm) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [errorItems, setErrorItems] = useState(null);

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    fetchItems(searchTerm);
  }, [searchTerm]);

  const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  const getInitialData = async () => {
    try {
      const catRes = await fetch(`${apiUrl}/api/categories`);
      const catData = await catRes.json();
      setCategories(catData.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchItems = async (term = '') => {
    setLoadingItems(true);
    setErrorItems(null);
    try {
      const url = term
        ? `${apiUrl}/api/items?search=${encodeURIComponent(term)}`
        : `${apiUrl}/api/items`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items);
    } catch (error) {
      setErrorItems(error.message);
    } finally {
      setLoadingItems(false);
    }
  };

  const onCategoryClick = async (category) => {
    setLoadingItems(true);
    setErrorItems(null);
    try {
      const res = await fetch(`${apiUrl}/api/items?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      setItems(data.items);
    } catch (error) {
      setErrorItems(error.message);
    } finally {
      setLoadingItems(false);
    }
  };

  return {
    categories,
    items,
    loadingCategories,
    loadingItems,
    errorItems,
    onCategoryClick,
    fetchItems
  };
}

export default useItemsData;