import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeed,
  selectIsLoading,
  selectOrders
} from '../../services/slices/feedSlice/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
