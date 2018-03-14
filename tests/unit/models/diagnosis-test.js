import { moduleForModel, test } from 'ember-qunit';
import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('diagnosis', 'Unit | Model | diagnosis', {
  needs: [
    'validator:presence'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testValidPropertyValues('date', ['qwe']);
testInvalidPropertyValues('date', ['', null]);

testValidPropertyValues('diagnosis', ['qwe']);
testInvalidPropertyValues('diagnosis', ['', null]);
