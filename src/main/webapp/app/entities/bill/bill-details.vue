<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="bill">
        <h2 class="jh-entity-heading" data-cy="billDetailsHeading">
          <span v-text="$t('appdemoApp.bill.detail.title')">Bill</span> {{ bill.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('appdemoApp.bill.name')">Name</span>
          </dt>
          <dd>
            <span>{{ bill.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('appdemoApp.bill.amount')">Amount</span>
          </dt>
          <dd>
            <span>{{ bill.amount }}</span>
          </dd>
          <dt>
            <span v-text="$t('appdemoApp.bill.order')">Order</span>
          </dt>
          <dd>
            <div v-if="bill.order">
              <router-link :to="{ name: 'OrderView', params: { orderId: bill.order.id } }">{{ bill.order.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="bill.id" :to="{ name: 'BillEdit', params: { billId: bill.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./bill-details.component.ts"></script>
