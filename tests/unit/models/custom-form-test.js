import { moduleForModel, test } from 'ember-qunit';
import { testInvalidPropertyValues, testValidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('custom-form', 'Unit | Model | custom form', {
  needs: [
    'validator:presence',
    'validator:number'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testValidPropertyValues('formType', ['test']);
testInvalidPropertyValues('formType', [undefined]);

testValidPropertyValues('name', ['test']);
testInvalidPropertyValues('name', [undefined]);

testValidPropertyValues('columns', [12, 3, undefined]);
testInvalidPropertyValues('columns', ['test', '123', 0.123, 123]);
