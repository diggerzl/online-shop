import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductsFilter } from '../models/filter.model';

export const addOneToCart = createAction(
  '[Shop] Add to cart',
  props<{ product: Product }>(),
);

export const removeOneFromCart = createAction(
  '[Shop] Remove from cart',
  props<{ product: Product }>(),
);

export const setProductsFilter = createAction(
  '[Shop] Set products filter',
  props<{ filter: Partial<ProductsFilter> }>(),
);
