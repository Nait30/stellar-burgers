import { configureStore, nanoid } from "@reduxjs/toolkit"
import { burgerConstructorActions, burgerConstructorReducer, BurgerConstructorState, makeOrder } from "./burgerConstructorSlice"
import { TIngredient } from "@utils-types"
import { OrderState } from "../orderSlice/orderSlice"
import { TNewOrderResponse } from "@api"

const testIngredients = {
  bun: {
    _id:"342",
    id:"342",
name:"Флюоресцентная булка R2-D3",
type:"bun",
proteins:44,
fat:26,
carbohydrates:85,
calories:643,
price:988,
image:"https://code.s3.yandex.net/react/code/bun-01.png",
image_mobile:"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
image_large:"https://code.s3.yandex.net/react/code/bun-01-large.png",
  },
  sauce: {
    _id:"123",
    id:"123",
    name:"соус",
    type:"bun",
    proteins:44,
    fat:26,
    carbohydrates:85,
    calories:643,
    price:988,
    image:"https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile:"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large:"https://code.s3.yandex.net/react/code/bun-01-large.png",
  },
  main: {
      _id:"321",
      id:"321",
      name:"ингредиент",
      type:"main",
      proteins:44,
      fat:26,
      carbohydrates:85,
      calories:643,
      price:988,
      image:"https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile:"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/bun-01-large.png",
  }
}




describe('test constructor', ()=>{
  const initialState: BurgerConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    error: null,
    loading: false
  }
  test('should add ingredient', ()=>{
    const initialState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    };
    const state = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.addIngridient(testIngredients.main)
    )
    expect(state.constructorItems.ingredients).toEqual([
      {...testIngredients.main,
        id: expect.any(String)
      }
    ])
  })
  test('should remove ingredient', ()=>{
    const initialState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [testIngredients.sauce]
      },
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    };
    const state = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.removeIngredient(0)
    )
    expect(state).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    })
  })

  test('should move ingredient down', ()=> {
    const initialState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [testIngredients.main, testIngredients.sauce]
      },
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    };

    const state = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.moveIngredient({from: 0, to: 1})
    )
    expect(state.constructorItems.ingredients).toEqual([testIngredients.sauce, testIngredients.main])
  })

  test('makeOrderPending', ()=>{
    const initialState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    }

    const expectedState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: true,
      orderModalData: null,
      error: null,
      loading: true
    }

    const state = burgerConstructorReducer(
      initialState,
      makeOrder.pending('', [])
    );
    expect(state).toEqual(expectedState);
  })

  test('makeOrderFulfilled', ()=>{
    const testOrder =
      {  _id: '1',
        status: 'done',
        name: 'test',
        createdAt: '31.08.2024',
        updatedAt: '31.08.2024',
        number: 1,
        ingredients: ['test', 'test1']}
    
  
    const testApiResponse: TNewOrderResponse = {
      success: true,
      order: testOrder,
      name: 'test'
    }

    const expectedState: BurgerConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: testOrder,
      error: null,
      loading: false
    }

    const state = burgerConstructorReducer(
      initialState,
      makeOrder.fulfilled(testApiResponse, '', [])
    )
    expect(state).toEqual(expectedState)
  }) 
})
