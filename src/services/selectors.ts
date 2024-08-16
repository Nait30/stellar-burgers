import { RootState } from './store';

export const selectOrderById = (number: number) => (state: RootState) => {
  if (state.feed.orders.length || state.order.orders.length) {
    return (
      state.feed.orders.find((order) => order.number === number) ||
      state.order.orders.find((order) => order.number === number)
    );
  }

  if (state.feed.modalOrder) {
    return state.feed.modalOrder.number === number
      ? state.feed.modalOrder
      : null;
  }
  return null;
};
