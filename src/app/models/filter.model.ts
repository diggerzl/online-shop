export class ProductsFilter {
  search: string;
  priceRanges: ProductsFilterPriceRange [] = [];
  category = '';
}

export interface ProductsFilterPriceRange {
  from: number;
  to: number;
}
