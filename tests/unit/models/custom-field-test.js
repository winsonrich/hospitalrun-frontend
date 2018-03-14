import { moduleForModel, test } from 'ember-qunit';
import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('custom-field', 'Unit | Model | custom field', {
  needs: [
    'validator:presence',
    'validator:number'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testValidPropertyValues('label', ['test']);
testInvalidPropertyValues('label', [undefined]);

testValidPropertyValues('type', ['test']);
testInvalidPropertyValues('type', [undefined]);

testValidPropertyValues('colSpan', [123, undefined]);
testInvalidPropertyValues('colSpan', ['test', '123', 0.123]);
