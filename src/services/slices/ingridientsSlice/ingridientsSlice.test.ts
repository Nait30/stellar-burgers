import {
  getIngredients,
  IngredientsState,
  ingridientsReducer
} from './ingridientsSlice';

describe('testIngredientsSlice', () => {
  const initialState: IngredientsState = {
    ingridients: [],
    loading: false,
    error: null
  };

  test('loading should be true', () => {
    const expectedState = {
      ingridients: [],
      loading: true,
      error: null
    };
    const state = ingridientsReducer(initialState, getIngredients.pending(''));
    expect(state).toEqual(expectedState);
  });

  test('loading should be false', () => {
    const testIngredients = [
      {
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
      },
      {
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
      },
      {
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
      }
    ];

    const state = ingridientsReducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.fulfilled(testIngredients, '')
    );
    expect(state).toEqual({
      ingridients: testIngredients,
      loading: false,
      error: null
    });
  });

  test('test error', () => {
    const error = new Error('test error');

    const expectedState = {
      ...initialState,
      error: error.message
    };

    const state = ingridientsReducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.rejected(error, '')
    );

    expect(state).toEqual(expectedState);
  });
});
