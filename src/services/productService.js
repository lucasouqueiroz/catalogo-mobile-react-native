import api from './api';

export async function getProductsByCategory(category) {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

async function getProductsFromCategories(categories) {
  const results = await Promise.all(categories.map(getProductsByCategory));
  return results.flat();
}

export function getAllMaleProducts() {
  return getProductsFromCategories([
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
  ]);
}

export function getAllFemaleProducts() {
  return getProductsFromCategories([
    'womens-bags',
    'womens-dresses',
    'womens-jewellery',
    'womens-shoes',
    'womens-watches',
  ]);
}
