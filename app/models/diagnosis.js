import AbstractModel from 'hospitalrun/models/abstract';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  date: validator('presence', true),
  diagnosis: validator('presence', true)
});

export default AbstractModel.extend(Validations, {
  // Attributes
  active: DS.attr('boolean', { defaultValue: true }),
  date: DS.attr('date'),
  diagnosis: DS.attr('string'),
  secondaryDiagnosis: DS.attr('boolean', { defaultValue: false })
});
