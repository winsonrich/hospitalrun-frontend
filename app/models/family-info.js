/**
 * Model for social worker family info
 */
import DS from 'ember-data';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  age: validator('number', {
    allowBlank: true,
    allowString: true
  }),
  name: validator('presence', true)
});

export default Model.extend(Validations, {
  age: DS.attr('number'),
  civilStatus: DS.attr('string'),
  education: DS.attr('string'),
  income: DS.attr('string'),
  insurance: DS.attr('string'),
  name: DS.attr('string'),
  occupation: DS.attr('string'),
  relationship: DS.attr('string')
});
