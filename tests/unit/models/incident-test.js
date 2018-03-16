import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import tHelper from 'ember-i18n/helper';
import localeConfig from 'ember-i18n/config/en';

import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('incident', 'Unit | Model | incident', {
  // Specify the other units that are required for this test.
  needs: [
    'validator:presence',
    'model:attachment',
    'model:patient',
    'model:incident-note',
    'model:allergy',
    'model:diagnosis',
    'model:operation-report',
    'model:operative-plan',
    'model:payment',
    'model:price-profile',
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

    Ember.getOwner(this).inject('model', 'i18n', 'service:i18n');

    // register t helper
    this.registry.register('helper:t', tHelper);
  }
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testValidPropertyValues('categoryName', ['test']);
testInvalidPropertyValues('categoryName', [undefined]);

testValidPropertyValues('dateOfIncident', ['test']);
testInvalidPropertyValues('dateOfIncident', [undefined]);

testValidPropertyValues('department', ['test']);
testInvalidPropertyValues('department', [undefined]);

testValidPropertyValues('description', ['test']);
testInvalidPropertyValues('description', [undefined]);

testValidPropertyValues('patientTypeAhead', ['John Doe', 'John Doe Junior', ''], function(subject) {
  let patient;
  Ember.run(() => {
    patient = subject.get('store').createRecord('patient', {
      firstName: 'John Doe'
    });
  });
  subject.set('patient', patient);
});

testInvalidPropertyValues('patientTypeAhead', ['John Doe'], function(subject) {
  let patient;
  Ember.run(() => {
    patient = subject.get('store').createRecord('patient', {
      firstName: 'James Doe'
    });
  });
  subject.set('patient', patient);
});
