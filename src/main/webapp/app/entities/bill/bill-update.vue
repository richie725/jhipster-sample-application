<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="appdemoApp.bill.home.createOrEditLabel"
          data-cy="BillCreateUpdateHeading"
          v-text="$t('appdemoApp.bill.home.createOrEditLabel')"
        >
          Create or edit a Bill
        </h2>
        <div>
          <div class="form-group" v-if="bill.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="bill.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('appdemoApp.bill.name')" for="bill-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="bill-name"
              data-cy="name"
              :class="{ valid: !$v.bill.name.$invalid, invalid: $v.bill.name.$invalid }"
              v-model="$v.bill.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('appdemoApp.bill.amount')" for="bill-amount">Amount</label>
            <input
              type="number"
              class="form-control"
              name="amount"
              id="bill-amount"
              data-cy="amount"
              :class="{ valid: !$v.bill.amount.$invalid, invalid: $v.bill.amount.$invalid }"
              v-model.number="$v.bill.amount.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('appdemoApp.bill.order')" for="bill-order">Order</label>
            <select class="form-control" id="bill-order" data-cy="order" name="order" v-model="bill.order">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="bill.order && orderOption.id === bill.order.id ? bill.order : orderOption"
                v-for="orderOption in orders"
                :key="orderOption.id"
              >
                {{ orderOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.bill.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./bill-update.component.ts"></script>
