import AbstractModel from 'hospitalrun/models/abstract';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  formType: validator('presence', true),
  name: validator('presence', true),
  columns: validator('number', {
    allowBlank: true,
    integer: true,
    lte: 12
  })
});

function defaultFields() {
  return [];
}

export default AbstractModel.extend(Validations, {
  alwaysInclude: DS.attr('boolean'),
  columns: DS.attr('number', { defaultValue: 1 }),
  fields: DS.attr('custom-fields', { defaultValue: defaultFields }),
  formType: DS.attr('string'),
  name: DS.attr('string')
});
