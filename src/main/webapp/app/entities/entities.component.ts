import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import OrderService from './order/order.service';
import BillService from './bill/bill.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('orderService') private orderService = () => new OrderService();
  @Provide('billService') private billService = () => new BillService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
