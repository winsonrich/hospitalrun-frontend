import AbstractModel from 'hospitalrun/models/abstract';
import DS from 'ember-data';
import Ember from 'ember';
import NumberFormat from 'hospitalrun/mixins/number-format';
import { validator, buildValidations } from 'ember-cp-validations';

const { computed } = Ember;

const Validations = buildValidations({
  category: validator('presence', true),
  discount: validator('number', {
    allowBlank: true,
    allowString: true
  }),
  nationalInsurance: validator('number', {
    allowBlank: true,
    allowString: true
  }),
  name: validator('presence', true),
  privateInsurance: validator('number', {
    allowBlank: true,
    allowString: true
  }),
  total: validator('number', {
    allowBlank: true,
    allowString: true
  })
});

export default AbstractModel.extend(NumberFormat, Validations, {
  // Attributes
  amountOwed: DS.attr('number'),
  category: DS.attr('string'),
  description: DS.attr('string'),
  discount: DS.attr('number'),
  name: DS.attr('string'),
  nationalInsurance: DS.attr('number'),
  privateInsurance: DS.attr('number'),
  // Associations
  /* The individual objects that make up this line item. */
  details: DS.hasMany('line-item-detail', { async: false }),

  amountOwedChanged: computed('discount', 'nationalInsurance', 'privateInsurance', 'total', function() {
    Ember.run.debounce(this, function() {
      let discount = this._getValidNumber(this.get('discount'));
      let nationalInsurance = this._getValidNumber(this.get('nationalInsurance'));
      let privateInsurance = this._getValidNumber(this.get('privateInsurance'));
      let amountOwed = this._getValidNumber(this.get('total'));
      amountOwed = amountOwed - discount - nationalInsurance - privateInsurance;
      if (amountOwed < 0) {
        amountOwed = 0;
      }
      if (!this.get('isDestroyed')) {
        this.set('amountOwed', this._numberFormat(amountOwed, true));
      }
    }, 500);
  }),

  detailTotals: Ember.computed.mapBy('details', 'amountOwed'),
  total: Ember.computed.sum('detailTotals')
});
