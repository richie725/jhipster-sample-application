import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Order = () => import('@/entities/order/order.vue');
// prettier-ignore
const OrderUpdate = () => import('@/entities/order/order-update.vue');
// prettier-ignore
const OrderDetails = () => import('@/entities/order/order-details.vue');
// prettier-ignore
const Bill = () => import('@/entities/bill/bill.vue');
// prettier-ignore
const BillUpdate = () => import('@/entities/bill/bill-update.vue');
// prettier-ignore
const BillDetails = () => import('@/entities/bill/bill-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'order',
      name: 'Order',
      component: Order,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/new',
      name: 'OrderCreate',
      component: OrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/:orderId/edit',
      name: 'OrderEdit',
      component: OrderUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'order/:orderId/view',
      name: 'OrderView',
      component: OrderDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bill',
      name: 'Bill',
      component: Bill,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bill/new',
      name: 'BillCreate',
      component: BillUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bill/:billId/edit',
      name: 'BillEdit',
      component: BillUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'bill/:billId/view',
      name: 'BillView',
      component: BillDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
