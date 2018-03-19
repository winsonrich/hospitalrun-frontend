/**
 * Model for social worker family info
 */
import DS from 'ember-data';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  category: validator('presence', true),
  cost: validator('number', {
    allowString: true
  })
});

export default Model.extend(Validations, {
  // Attributes
  category: DS.attr('string'),
  sources: DS.attr('string'),
  cost: DS.attr()
});
