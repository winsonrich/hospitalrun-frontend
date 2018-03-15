import Ember from 'ember';
import { test } from 'ember-qunit';

function testPropertyValues(propertyName, values, isTestForValid, context) {
  let validOrInvalid = (isTestForValid ? 'Valid' : 'Invalid');

  test(`${validOrInvalid} ${propertyName}`, function(assert) {
    values.forEach((value) => {
      let assertMessage = `Expected ${propertyName} to have ${validOrInvalid.toLowerCase()} value: ${value}${context ? ' with context' : ''}`;

      let model = this.subject();
      Ember.run(model, 'set', propertyName, value);

      if (context && typeof context === 'function') {
        context(model);
      }

      let { validations } = model.validateSync({ on: [propertyName] });
      if (isTestForValid) {
        assert.ok(validations.get('isValid'), assertMessage);
      } else {
        assert.notOk(validations.get('isValid'), assertMessage);
      }
    });
  });
}

export const testValidPropertyValues = function(propertyName, values, context) {
  return testPropertyValues(propertyName, values, true, context);
};

export const testInvalidPropertyValues = function(propertyName, values, context) {
  return testPropertyValues(propertyName, values, false, context);
};
