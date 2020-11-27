export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  category: string;
  image: string;
}

export interface ProductsResponse {
  total: number;
  data: Product [];
}
