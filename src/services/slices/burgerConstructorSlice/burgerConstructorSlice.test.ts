import { configureStore, nanoid } from '@reduxjs/toolkit';
import {
  burgerConstructorActions,
  burgerConstructorReducer,
  BurgerConstructorState,
  initialState,
  makeOrder
} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';
import { OrderState } from '../orderSlice/orderSlice';
import { TNewOrderResponse } from '@api';

const testBun = {
  _id: '342',
  id: '342',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const testSauce = {
  _id: '123',
  id: '123',
  name: 'соус',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const testMain = {
  _id: '321',
  id: '321',
  name: 'ингредиент',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};


describe('test constructor', () => {
  test('should add ingredient', () => {
    const state = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.addIngridient(testMain)
    );
    expect(state.constructorItems.ingredients).toEqual([
      { ...testMain, id: expect.any(String) }
    ]);
  });
  test('should remove ingredient', () => {
    const testInitialState: BurgerConstructorState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [testSauce]
      }
    };
    const state = burgerConstructorReducer(
      testInitialState,
      burgerConstructorActions.removeIngredient(0)
    );
    expect(state).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    });
  });

  test('should move ingredient down', () => {
    const testInitialState: BurgerConstructorState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [testMain, testSauce]
      },  };

    const state = burgerConstructorReducer(
      testInitialState,
      burgerConstructorActions.moveIngredient({ from: 0, to: 1 })
    );
    expect(state.constructorItems.ingredients).toEqual([
      testSauce,
      testMain
    ]);
  });

  test('makeOrderPending', () => {
    const expectedState: BurgerConstructorState = {
        ...initialState,
        orderRequest: true,
        loading: true
    };

    const state = burgerConstructorReducer(
      initialState,
      makeOrder.pending('', [])
    );
    expect(state).toEqual(expectedState);
  });

  test('makeOrderFulfilled', () => {
    const testOrder = {
      _id: '1',
      status: 'done',
      name: 'test',
      createdAt: '31.08.2024',
      updatedAt: '31.08.2024',
      number: 1,
      ingredients: ['test', 'test1']
    };

    const testApiResponse: TNewOrderResponse = {
      success: true,
      order: testOrder,
      name: 'test'
    };

    const expectedState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: testOrder,
      error: null,
      loading: false
    };

    const state = burgerConstructorReducer(
      initialState,
      makeOrder.fulfilled(testApiResponse, '', [])
    );
    expect(state).toEqual(expectedState);
  });
});
