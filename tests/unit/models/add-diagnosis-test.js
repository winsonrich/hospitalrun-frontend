import { moduleForModel } from 'ember-qunit';
import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('add-diagnosis', 'Unit | Model | add-diagnosis', {
  // Specify the other units that are required for this test.
  needs: [
    'validator:presence'
  ]
});

testValidPropertyValues('diagnosis', ['test']);
testInvalidPropertyValues('diagnosis', [undefined]);
