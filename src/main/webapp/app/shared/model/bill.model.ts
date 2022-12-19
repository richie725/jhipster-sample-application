import { IOrder } from '@/shared/model/order.model';

export interface IBill {
  id?: number;
  name?: string | null;
  amount?: number | null;
  order?: IOrder | null;
}

export class Bill implements IBill {
  constructor(public id?: number, public name?: string | null, public amount?: number | null, public order?: IOrder | null) {}
}
