import { moduleForModel } from 'ember-qunit';

import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('billing-line-item', 'Unit | Model | billing-line-item', {
  needs: [
    'validator:presence',
    'validator:number',
    'model:line-item-detail'
  ]
});

testValidPropertyValues('category', ['test']);
testInvalidPropertyValues('category', [undefined]);

testValidPropertyValues('discount', [123, '123', 0.123, undefined]);
testInvalidPropertyValues('discount', ['test']);

testValidPropertyValues('nationalInsurance', [123, '123', 0.123, undefined]);
testInvalidPropertyValues('nationalInsurance', ['test']);

testValidPropertyValues('name', ['test']);
testInvalidPropertyValues('name', [undefined]);

testValidPropertyValues('privateInsurance', [123, '123', 0.123, undefined]);
testInvalidPropertyValues('privateInsurance', ['test']);
