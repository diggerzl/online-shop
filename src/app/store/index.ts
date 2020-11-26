import { ShopState } from './shop.reducer';
import { createSelector } from '@ngrx/store';
import { CartItem } from '../models/cart.model';

export interface AppState {
  shop: ShopState;
}

const selectShop = (state: AppState) => state.shop;

export const selectCart = createSelector(
  selectShop,
  (state: ShopState) => state.cart,
);

export const selectItemsInCartCount = createSelector(
  selectCart,
  (cart: CartItem []) => cart.reduce((total, item) => total += item.count, 0),
);

export const selectFilter = createSelector(
  selectShop,
  (state) => state.filter,
);
