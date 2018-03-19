import DS from 'ember-data';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  from: validator('presence', true),
  to: validator('presence', true)
});

export default Model.extend(Validations, {
  from: DS.attr('string'),
  to: DS.attr('string')
});
