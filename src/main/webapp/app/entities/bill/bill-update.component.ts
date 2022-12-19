import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import OrderService from '@/entities/order/order.service';
import { IOrder } from '@/shared/model/order.model';

import { IBill, Bill } from '@/shared/model/bill.model';
import BillService from './bill.service';

const validations: any = {
  bill: {
    name: {},
    amount: {},
  },
};

@Component({
  validations,
})
export default class BillUpdate extends Vue {
  @Inject('billService') private billService: () => BillService;
  @Inject('alertService') private alertService: () => AlertService;

  public bill: IBill = new Bill();

  @Inject('orderService') private orderService: () => OrderService;

  public orders: IOrder[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.billId) {
        vm.retrieveBill(to.params.billId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.bill.id) {
      this.billService()
        .update(this.bill)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('appdemoApp.bill.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.billService()
        .create(this.bill)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('appdemoApp.bill.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveBill(billId): void {
    this.billService()
      .find(billId)
      .then(res => {
        this.bill = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.orderService()
      .retrieve()
      .then(res => {
        this.orders = res.data;
      });
  }
}
