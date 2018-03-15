import AbstractModel from 'hospitalrun/models/abstract';
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  dateReceived: validator('presence', true),
  inventoryItemTypeAhead: validator('presence', {
    presence: true,
    disabled: Ember.computed.notEmpty('model.invoiceItems')
  }),
  purchaseCost: validator('number', {
    gt: 0,
    allowString: true,
    disabled: Ember.computed.notEmpty('model.invoiceItems'),
    message(type) {
      if (type === 'gt') {
        return 'must be greater than 0';
      }
    }
  }),
  quantity: validator('number', {
    gt: 0,
    allowString: true,
    disabled: Ember.computed.notEmpty('model.invoiceItems'),
    message(type) {
      if (type === 'gt') {
        return 'must be greater than 0';
      }
    }
  }),
  vendor: validator('presence', true)
});

/**
 * Model to represent a request for inventory items.
 */
export default AbstractModel.extend(Validations, {});
