const apiUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

export async function fetchCategories() {
  const response = await fetch(`${apiUrl}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await response.json();
  return data.categories;
}

export async function fetchItemsByCategory(category) {
  const response = await fetch(`${apiUrl}/items?category=${category}`);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  const data = await response.json();
  return data.items;
}

export async function fetchAllItems() {
  const response = await fetch(`${apiUrl}/items`);
  if (!response.ok) {
    throw new Error("Failed to fetch all items");
  }
  const data = await response.json();
  return data.items;
}