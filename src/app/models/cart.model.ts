import { Product } from './product.model';

export interface CartItem {
  count: number;
  product: Product;
}
