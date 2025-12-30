import type { Product } from '@/components/ProductsListingPage';
import axios from 'axios';

const URL = 'https://dummyjson.com/products';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<{ products: Product[] }>(URL);
  return response.data.products;
};
