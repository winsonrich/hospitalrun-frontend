import { moduleForModel, test } from 'ember-qunit';
import tHelper from 'ember-i18n/helper';
import localeConfig from 'ember-i18n/config/en';
import { testInvalidPropertyValues, testValidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('inv-location', 'Unit | Model | inv-location', {
  needs: [
    'validator:presence',
    'validator:number',
    'service:i18n',
    'locale:en/translations',
    'locale:en/config',
    'util:i18n/missing-message',
    'util:i18n/compile-template',
    'config:environment'
  ],
  beforeEach() {
    // set the locale and the config
    this.container.lookup('service:i18n').set('locale', 'en');
    this.registry.register('locale:en/config', localeConfig);

    // register t helper
    this.registry.register('helper:t', tHelper);
  }
});

test('locationNameWithQuantity', function(assert) {
  let invLocation = this.subject({
    quantity: 3,
    locationName: 'Test Location'
  });

  assert.equal(invLocation.get('locationNameWithQuantity'), 'Test Location (3 available)');
});

testValidPropertyValues('adjustmentQuantity', [0.001, 1, '123']);
testInvalidPropertyValues('adjustmentQuantity', [-1, 0, '-1']);

testInvalidPropertyValues('adjustmentQuantity', [0.001, 1, '123'], function(subject) {
  subject.set('quantity', 0);
});

testValidPropertyValues('dateCompleted', ['test dr']);
testInvalidPropertyValues('dateCompleted', [undefined]);

testValidPropertyValues('transferLocation', ['test', '']);

testInvalidPropertyValues('transferLocation', [''], function(subject) {
  subject.set('transferItem', 'test');
});
