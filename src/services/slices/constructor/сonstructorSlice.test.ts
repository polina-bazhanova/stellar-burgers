import { describe, test } from '@jest/globals';
import {
  addIngredient,
  initialState as BurgerConstructorSliceInitialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  BurgerConstructorReducer,
  TBurgerConstructorState
} from './index';

const IngredientStub = {
  _id: '643d69a5c3f7b9001cfa0948',
  name: 'Кристаллы марсианских альфа-сахаридов',
  type: 'main',
  proteins: 234,
  fat: 432,
  carbohydrates: 111,
  calories: 189,
  price: 762,
  image: 'https://code.s3.yandex.net/react/code/core.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/core-large.png'
};

const AnotherIngredientStub = {
  ...IngredientStub,
  _id: '643d69a5c3f7b9001cfa0949'
};

describe('Тестирование BurgerConstructorSlice', () => {
  let state: TBurgerConstructorState;

  beforeEach(() => {
    // Сбрасываем состояние перед каждым тестом
    state = BurgerConstructorSliceInitialState;
  });

  test('Добавление ингредиента работает корректно', () => {
    const action = addIngredient(IngredientStub);
    state = BurgerConstructorReducer(state, action);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      ...IngredientStub,
      id: expect.any(String) // Проверяем, что сгенерирован уникальный ID
    });
  });

  test('Удаление ингредиента работает корректно', () => {
    const prepareAction = addIngredient(IngredientStub);
    state = BurgerConstructorReducer(state, prepareAction);

    const action = removeIngredient(state.constructorItems.ingredients[0].id);
    state = BurgerConstructorReducer(state, action);
    expect(state.constructorItems.ingredients).toEqual([]);
  }),
    describe('Тестирование изменения порядка ингредиентов', () => {
      beforeEach(() => {
        // Добавляем два ингредиента для тестирования сортировки
        state = BurgerConstructorReducer(state, addIngredient(IngredientStub));
        state = BurgerConstructorReducer(
          state,
          addIngredient(AnotherIngredientStub)
        );
      });

      test('Перемещение ингредиента вниз', () => {
        // Перемещаем первый ингредиент на позицию ниже
        const action = moveIngredientDown(
          state.constructorItems.ingredients[0]
        );
        state = BurgerConstructorReducer(state, action);
        expect(state.constructorItems.ingredients[1]._id).toEqual(
          IngredientStub._id
        );
        expect(state.constructorItems.ingredients[0]._id).toEqual(
          AnotherIngredientStub._id
        );
      });

      test('Перемещение ингредиента вверх', () => {
        // Перемещаем второй ингредиент на позицию выше
        const action = moveIngredientUp(state.constructorItems.ingredients[1]);
        state = BurgerConstructorReducer(state, action);
        expect(state.constructorItems.ingredients[0]._id).toEqual(
          AnotherIngredientStub._id
        );
        expect(state.constructorItems.ingredients[1]._id).toEqual(
          IngredientStub._id
        );
      });
    });
});
