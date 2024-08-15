import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerConstructorActions,
  makeOrder,
  selectBurgerIngredients,
  selectModalData,
  selectOrderRequest
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getUser, selectUser } from '../../services/slices/userSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectBurgerIngredients);

  const location = useLocation();

  const navigate = useNavigate();

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectModalData);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const ingredientsId = Array.from(
      constructorItems.ingredients,
      (item) => item._id
    );
    ingredientsId.push(constructorItems.bun?._id as string);
    dispatch(makeOrder(ingredientsId));
  };
  const closeOrderModal = () => {
    dispatch(burgerConstructorActions.deleteOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
