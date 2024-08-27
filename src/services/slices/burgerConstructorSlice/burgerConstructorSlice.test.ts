import { configureStore, nanoid } from "@reduxjs/toolkit"
import { burgerConstructorActions, burgerConstructorReducer, initialState } from "./burgerConstructorSlice"

const testIngredients = {
  bun: {
    _id:"643d69a5c3f7b9001cfa093d",
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
__v:0
  },
  sauce: {
    _id:"123",
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
    __v:0
  },
  main: {
      _id:"321",
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
      __v:0
  }
}

jest.mock('@reduxjs/toolkit', ()=> ({
  nanoid: jest.fn(() => '123')
}))


describe('test constructor', ()=>{
  test('should add ingredient', ()=>{
    const state = burgerConstructorReducer(
      initialState,
      burgerConstructorActions.addIngridient({
        ...testIngredients.main
      })
    )
    expect(state.constructorItems.ingredients).toEqual([
      {...testIngredients.main,
        id: '123'
      }
    ])
  })
})
