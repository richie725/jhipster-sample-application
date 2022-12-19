import { IBill } from '@/shared/model/bill.model';

export interface IOrder {
  id?: number;
  name?: string | null;
  address?: string | null;
  bills?: IBill[] | null;
}

export class Order implements IOrder {
  constructor(public id?: number, public name?: string | null, public address?: string | null, public bills?: IBill[] | null) {}
}
