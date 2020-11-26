import { CartItem } from '../models/cart.model';
import { ProductsFilter } from '../models/filter.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as ShopActions from './shop.actions';
import { cloneDeep, findIndex } from 'lodash';

const storageKey = 'shopState';

export interface ShopState {
  cart: CartItem [];
  filter: ProductsFilter;
}

const storageState: ShopState = JSON.parse(localStorage.getItem(storageKey) as string);

export const initialState: ShopState = {
  cart: storageState?.cart || [],
  filter: storageState?.filter || new ProductsFilter(),
};

const shopReducer = createReducer(
  initialState,
  on(ShopActions.addOneToCart, (state, { product }) => {
    const cart = cloneDeep(state.cart);
    const cartItem = cart.find((c) => c.product.id === product.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      cart.push({
        count: 1,
        product,
      });
    }

    const newState = { ...state, cart };
    saveStateInStorage(newState);
    return newState;
  }),
  on(ShopActions.removeOneFromCart, (state, { product }) => {
    const cart: CartItem [] = cloneDeep(state.cart);
    const index = findIndex(cart, (c) => c.product.id === product.id);

    if (index !== -1) {
      const item = cart[index];

      if (item.count > 1) {
        item.count--;
      } else {
        cart.splice(index, 1);
      }
    }

    const newState = { ...state, cart };
    saveStateInStorage(newState);
    return newState;
  }),
  on(ShopActions.setProductsFilter, (state, { filter }) => {
    const newState = {
      ...state,
      filter: {
        ...state.filter,
        ...filter,
      },
    };
    saveStateInStorage(newState);
    return newState;
  }),
);

function saveStateInStorage(state: ShopState): void {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export function reducer(state: ShopState, action: Action): any {
  return shopReducer(state, action);
}
