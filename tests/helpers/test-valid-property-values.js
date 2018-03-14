import Ember from 'ember';
import { test } from 'ember-qunit';

function testPropertyValues(propertyName, values, isTestForValid) {
  let validOrInvalid = (isTestForValid ? 'Valid' : 'Invalid');

  test(`${validOrInvalid} ${propertyName}`, function(assert) {
    values.forEach((value) => {
      let assertMessage = `Expected ${propertyName} to have ${validOrInvalid.toLowerCase()} value: ${value}`;

      let model = this.subject();
      Ember.run(model, 'set', propertyName, value);

      let { validations } = model.validateSync({ on: [propertyName] });
      if (isTestForValid) {
        assert.ok(validations.get('isValid'), assertMessage);
      } else {
        assert.notOk(validations.get('isValid'), assertMessage);
      }
    });
  });
}

export const testValidPropertyValues = function(propertyName, values) {
  return testPropertyValues(propertyName, values, true);
};

export const testInvalidPropertyValues = function(propertyName, values) {
  return testPropertyValues(propertyName, values, false);
};
