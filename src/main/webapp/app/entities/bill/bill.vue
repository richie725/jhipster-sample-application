<template>
  <div>
    <h2 id="page-heading" data-cy="BillHeading">
      <span v-text="$t('appdemoApp.bill.home.title')" id="bill-heading">Bills</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('appdemoApp.bill.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'BillCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-bill">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('appdemoApp.bill.home.createLabel')"> Create a new Bill </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && bills && bills.length === 0">
      <span v-text="$t('appdemoApp.bill.home.notFound')">No bills found</span>
    </div>
    <div class="table-responsive" v-if="bills && bills.length > 0">
      <table class="table table-striped" aria-describedby="bills">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span v-text="$t('appdemoApp.bill.name')">Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('amount')">
              <span v-text="$t('appdemoApp.bill.amount')">Amount</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amount'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('order.id')">
              <span v-text="$t('appdemoApp.bill.order')">Order</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'order.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'BillView', params: { billId: bill.id } }">{{ bill.id }}</router-link>
            </td>
            <td>{{ bill.name }}</td>
            <td>{{ bill.amount }}</td>
            <td>
              <div v-if="bill.order">
                <router-link :to="{ name: 'OrderView', params: { orderId: bill.order.id } }">{{ bill.order.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'BillView', params: { billId: bill.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'BillEdit', params: { billId: bill.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(bill)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="appdemoApp.bill.delete.question" data-cy="billDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-bill-heading" v-text="$t('appdemoApp.bill.delete.question', { id: removeId })">
          Are you sure you want to delete this Bill?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-bill"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeBill()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="bills && bills.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./bill.component.ts"></script>
