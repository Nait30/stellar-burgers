import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  getFeed,
  getOrder,
  selectModalOrder,
  selectOrder,
  selectOrders as selectFeedOrders
} from '../../services/slices/feedSlice/feedSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngridients } from '../../services/slices/ingridientsSlice/ingridientsSlice';
import { selectOrders as selectUserOrder } from '../../services/slices/orderSlice/orderSlice';
import { selectOrderById } from '@selectors';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const orderData = useSelector(selectOrderById(Number(number)));
  const ingredients: TIngredient[] = useSelector(selectIngridients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrder(Number(number)));
    }
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
