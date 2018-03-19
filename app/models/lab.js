import AbstractModel from 'hospitalrun/models/abstract';
import CanEditRequested from 'hospitalrun/mixins/can-edit-requested';
import DateFormat from 'hospitalrun/mixins/date-format';
import DS from 'ember-data';
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const { computed, get } = Ember;

const Validations = buildValidations({
  labTypeName: validator('presence', {
    presence: true,
    disabled: Ember.computed.not('model.isNew'),
    message: 'Please select a lab type'
  }),
  patient: validator('presence', true),
  patientTypeAhead: validator('patient-typeahead')
});

export default AbstractModel.extend(CanEditRequested, DateFormat, Validations, {
  // Attributes
  customForms: DS.attr('custom-forms'),
  labDate: DS.attr('date'),
  notes: DS.attr('string'),
  requestedBy: DS.attr('string'),
  requestedDate: DS.attr('date'),
  result: DS.attr('string'),
  status: DS.attr('string'),

  // Associations
  charges: DS.hasMany('proc-charge', { async: false }),
  labType: DS.belongsTo('pricing', { async: false }),
  patient: DS.belongsTo('patient', { async: false }),
  visit: DS.belongsTo('visit', { async: false }),

  labDateAsTime: computed('labDate', function() {
    return this.dateToTime(get(this, 'labDate'));
  }),

  requestedDateAsTime: computed('requestedDate', function() {
    return this.dateToTime(get(this, 'requestedDate'));
  })
});
