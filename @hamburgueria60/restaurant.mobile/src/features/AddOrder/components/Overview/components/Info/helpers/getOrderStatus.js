import { DRAFT, SENT } from 'infrastructure/repositories/orders/constants';
import ordersStore from 'infrastructure/repositories/orders/ordersStore';

export default function getOrderStatus({ orderId }) {
  const order = ordersStore.orders.get(orderId);
  if (!order) return null;
  switch (order.status) {
    case DRAFT:
      return 'Rascunho';
    case SENT:
      return 'Enviado';
    default:
      return 'Desconhecido';
  }
}
