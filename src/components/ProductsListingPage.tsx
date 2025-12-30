import axios from 'axios';
import { useEffect, useState } from 'react';

const URL = 'https://dummyjson.com/products';

export interface Product {
  id?: number;
  brand?: string;
  title?: string;
  category?: string;
  description?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  price?: number;
  rating?: string;
  stock?: number;
  tags?: string[];
  discountPercentage?: number;
  images?: string[];
  reviews?: Array<{
    rating?: number;
    comment: string;
    date: string;
    reviewEmail?: string;
    reviewerName?: string;
  }>;
}

const ProductsListingPage = () => {
  const [products, setProducts] = useState<Product[]>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'a' | 'd'>('a');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(URL);
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.log(error);
        setError('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (inputValue: string) => {
    const trimmedInput = inputValue.trim();
    setSearchTerm(trimmedInput);

    const copy = [...(products || [])];
    const filteredProducts = copy.filter((p) =>
      p?.title?.toLowerCase().includes(trimmedInput.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const handleSort = () => {
    const copy = [...(filteredProducts || [])];
    let sortedProducts;
    if (sortOrder === 'a') {
      console.log('handle sort called a', sortOrder);
      setSortOrder('d');
      sortedProducts = copy.sort((a, b) => (a?.price || 0) - (b?.price || 0)); // Ascending
    } else {
      console.log('handle sort called d', sortOrder);
      setSortOrder('a');
      sortedProducts = copy.sort((a, b) => (b?.price || 0) - (a?.price || 0)); //descending
    }
    setFilteredProducts(sortedProducts);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* searching */}
      <div>
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      {/* sorting by price */}
      <div>
        <button onClick={handleSort}>
          {sortOrder === 'a' ? 'sort in asc' : 'sort in desc'}
        </button>
      </div>
      ProductsListingPage
      {filteredProducts &&
        filteredProducts.length > 0 &&
        filteredProducts?.map((product: Product) => {
          const { id, images, price, rating, title } = product;
          return (
            <div key={id}>
              {title}
              {price}
              <img alt="some images" src={images?.[0]} width={50} height={50} />
              {rating}
              {/* {description} */}
            </div>
          );
        })}
    </div>
  );
};

export default ProductsListingPage;
