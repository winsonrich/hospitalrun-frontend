import AbstractModel from 'hospitalrun/models/abstract';
import DS from 'ember-data';
import Ember from 'ember';
import LocationName from 'hospitalrun/mixins/location-name';
import { validator, buildValidations } from 'ember-cp-validations';

const { computed } = Ember;

const Validations = buildValidations({
  adjustmentQuantity: {
    validators:
      [
        validator('number', {
          gt: 0,
          allowString: true,
          message(type) {
            if (type === 'gt') {
              return 'must be greater than 0';
            }
          }
        }),
        validator(function(value, options, model) {
          let adjustmentQuantity = value;
          let transactionType = model.get('transactionType');
          let locationQuantity = model.get('quantity');
          if (Ember.isEmpty(adjustmentQuantity) || isNaN(adjustmentQuantity)) {
            return 'Invalid quantity';
          }

          if (transactionType !== 'Adjustment (Add)' && adjustmentQuantity > locationQuantity) {
            return 'Invalid quantity';
          }

          return true;
        })
      ]
  },

  dateCompleted: validator('presence', {
    presence: true,
    message: 'Please provide a date'
  }),

  transferLocation: validator(function(value, options, model) {
    let transferLocation = value;
    let transferItem = model.get('transferItem');
    // If we don't have a transfer item, then a transfer is not occurring.
    if (!Ember.isEmpty(transferItem) && Ember.isEmpty(transferLocation)) {
      return 'Please select a location to transfer to';
    }

    return true;
  })
});

/**
 * Model to represent the location(s) of inventory items.
 * File/model name is inv-location because using inv-location will cause location
 * items to be shown as inventory items since the pouchdb adapter does a
 * retrieve for keys starting with 'inventory' to fetch inventory items.
 */
let InventoryLocation = AbstractModel.extend(LocationName, Validations, {
  quantity: DS.attr('number'),
  location: DS.attr('string'),
  aisleLocation: DS.attr('string'),
  i18n: Ember.inject.service(),

  locationNameWithQuantity: computed('locationName', 'quantity', function() {
    let quantity = this.get('quantity');
    let locationName = this.get('locationName');
    return `${locationName} (${this.get('i18n').t('inventory.labels.availableQuantity', { quantity })})`;
  })
});

export default InventoryLocation;
