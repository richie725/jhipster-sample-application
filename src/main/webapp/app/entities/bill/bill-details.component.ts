import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBill } from '@/shared/model/bill.model';
import BillService from './bill.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class BillDetails extends Vue {
  @Inject('billService') private billService: () => BillService;
  @Inject('alertService') private alertService: () => AlertService;

  public bill: IBill = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.billId) {
        vm.retrieveBill(to.params.billId);
      }
    });
  }

  public retrieveBill(billId) {
    this.billService()
      .find(billId)
      .then(res => {
        this.bill = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
