import { moduleForModel, test } from 'ember-qunit';
import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('allergy', 'Unit | Model | allergy', {
  needs: [
    'validator:presence',
    'model:patient'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testValidPropertyValues('name', ['qwe']);
testInvalidPropertyValues('name', ['', null]);
