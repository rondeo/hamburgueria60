import buildCreateOrderPayload from './buildCreateOrderPayload';

export const WAITER_TYPE = 'RESTAURANT';

export default function buildUpdateOrderPayload(order) {
  return {
    id: order.id,
    ...buildCreateOrderPayload(order)
  };
}
