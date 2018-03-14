/**
 * Stub model for adding new patient diagnoses; needed for validation.
 */
import DS from 'ember-data';
import { Model } from 'ember-pouch';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  diagnosis: validator('presence', true)
});

export default Model.extend(Validations, {
  diagnosis: DS.attr('string')
});
