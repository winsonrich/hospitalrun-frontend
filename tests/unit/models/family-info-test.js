import { moduleForModel } from 'ember-qunit';
import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('family-info', 'Unit | Model | family-info', {
  needs: [
    'validator:presence',
    'validator:number'
  ]
});

testValidPropertyValues('age', [123, 123.0, '123', undefined]);
testInvalidPropertyValues('age', ['test']);

testValidPropertyValues('name', ['Test Person']);
testInvalidPropertyValues('name', [undefined]);
