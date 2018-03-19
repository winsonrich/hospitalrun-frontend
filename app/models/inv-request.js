import AbstractModel from 'hospitalrun/models/abstract';
import AdjustmentTypes from 'hospitalrun/mixins/inventory-adjustment-types';
import DS from 'ember-data';
import Ember from 'ember';
import LocationName from 'hospitalrun/mixins/location-name';
import { validator, buildValidations } from 'ember-cp-validations';

const { computed } = Ember;

const Validations = buildValidations({
  inventoryItemTypeAhead: validator(function(value, options, model) {
    if (!model.get('hasDirtyAttributes')) {
      return true;
    }
    let itemName = model.get('inventoryItem.name');
    let itemTypeAhead = value;
    let requestedItems = model.get('requestedItems');
    let status = model.get('status');
    if (status === 'Requested') {
      // Requested items don't show the type ahead and therefore don't need validation.
      return 'Please select a valid inventory item';
    }
    if (Ember.isEmpty(itemName) || Ember.isEmpty(itemTypeAhead)) {
      // force validation to fail if fields are empty and requested items are empty
      return Ember.isEmpty(requestedItems) ? 'Please select a valid inventory item' : true;
    } else {
      let typeAheadName = itemTypeAhead.substr(0, itemName.length);
      if (itemName !== typeAheadName) {
        return 'Please select a valid inventory item';
      }
    }
    // Inventory item is properly selected; don't do any further validation
    return true;
  }),
  quantity: {
    validators: [
      validator('number', {
        gt: 0,
        allowString: true,
        disabled: Ember.computed.notEmpty('model.requestedItems'),
        message(type) {
          if (type === 'gt') {
            return 'must be greater than 0';
          }
        }
      }),
      validator(function(value, options, model) {
        let isNew = model.get('isNew');
        let requestQuantity = parseInt(value);
        let transactionType = model.get('transactionType');
        let quantityToCompare = null;
        if (transactionType === 'Return') {
          // no validation needed for returns
          return true;
        } else if (isNew && transactionType === 'Request') {
          quantityToCompare = model.get('inventoryItem.quantity');
        } else {
          quantityToCompare = model.get('inventoryLocation.quantity');
        }
        if (requestQuantity > quantityToCompare) {
          // force validation to fail
          return 'The quantity must be less than or equal to the number of available items.';
        } else {
          // Diagnosis is properly set; don't do any further validation
          return true;
        }
      })
    ]
  }
});

/**
 * Model to represent a request for inventory items.
 */
let InventoryRequest = AbstractModel.extend(AdjustmentTypes, LocationName, Validations, {
  adjustPurchases: DS.attr('boolean'),
  completedBy: DS.attr('string'),
  costPerUnit: DS.attr('number'),
  dateCompleted: DS.attr('date'),
  dateRequested: DS.attr('date'),
  deliveryAisle: DS.attr('string'),
  deliveryLocation: DS.attr('string'),
  expenseAccount: DS.attr('string'),
  inventoryItem: DS.belongsTo('inventory', { async: true }),
  locationsAffected: DS.attr(),
  markAsConsumed: DS.attr('boolean', { defaultValue: true }),
  patient: DS.belongsTo('patient', {
    async: false
  }),
  purchasesAffected: DS.attr(),
  quantity: DS.attr('number'),
  quantityAtCompletion: DS.attr('number'),
  reason: DS.attr('string'),
  requestedBy: DS.attr('string'),
  status: DS.attr('string'),
  transactionType: DS.attr('string'),
  visit: DS.belongsTo('visit', {
    async: false
  }),

  deliveryLocationName: computed('deliveryAisle', 'deliveryLocation', function() {
    let aisle = this.get('deliveryAisle');
    let location = this.get('deliveryLocation');
    return this.formatLocationName(location, aisle);
  }),

  deliveryDetails: computed('deliveryAisle', 'deliveryLocation', 'patient', function() {
    let locationName = this.get('deliveryLocationName');
    let patient = this.get('patient');
    if (Ember.isEmpty(patient)) {
      return locationName;
    } else {
      return patient.get('displayName');
    }
  }),

  haveReason: computed('reason', function() {
    return !Ember.isEmpty(this.get('reason'));
  }),

  isAdjustment: computed('transactionType', function() {
    let adjustmentTypes = this.get('adjustmentTypes');
    let transactionType = this.get('transactionType');
    let adjustmentType = adjustmentTypes.findBy('type', transactionType);
    return !Ember.isEmpty(adjustmentType);
  }),

  isFulfillment: computed('transactionType', function() {
    return this.get('transactionType') === 'Fulfillment';
  }),

  isTransfer: computed('transactionType', function() {
    return this.get('transactionType') === 'Transfer';
  })
});

export default InventoryRequest;
