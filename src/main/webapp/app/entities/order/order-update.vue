<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="appdemoApp.order.home.createOrEditLabel"
          data-cy="OrderCreateUpdateHeading"
          v-text="$t('appdemoApp.order.home.createOrEditLabel')"
        >
          Create or edit a Order
        </h2>
        <div>
          <div class="form-group" v-if="order.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="order.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('appdemoApp.order.name')" for="order-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="order-name"
              data-cy="name"
              :class="{ valid: !$v.order.name.$invalid, invalid: $v.order.name.$invalid }"
              v-model="$v.order.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('appdemoApp.order.address')" for="order-address">Address</label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="order-address"
              data-cy="address"
              :class="{ valid: !$v.order.address.$invalid, invalid: $v.order.address.$invalid }"
              v-model="$v.order.address.$model"
            />
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
            :disabled="$v.order.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./order-update.component.ts"></script>
