import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  colSpan: validator('number', {
    allowBlank: true,
    integer: true
  }),
  label: validator('presence', true),
  type: validator('presence', true)
});

export default DS.Model.extend(Validations, {
  checkboxes: DS.attr(),
  classNames: DS.attr('string'),
  colSpan: DS.attr('number'),
  includeOtherOption: DS.attr('boolean'),
  label: DS.attr('string'),
  otherOptionLabel: DS.attr('string'),
  prompt: DS.attr('string'),
  property: DS.attr('string'),
  type: DS.attr('string'),
  values: DS.attr('string')
});
