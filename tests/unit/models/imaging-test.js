import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import { testInvalidPropertyValues, testValidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('imaging', 'Unit | Model | imaging', {
  needs: [
    'model:proc-charge',
    'model:pricing',
    'model:patient',
    'model:visit',
    'model:allergy',
    'model:diagnosis',
    'model:operation-report',
    'model:operative-plan',
    'model:payment',
    'model:price-profile',
    'validator:presence',
    'validator:result',
    'validator:patient-typeahead'
  ]
});

test('imagingDateAsTime', function(assert) {
  let imaging = this.subject({
    imagingDate: new Date(1131593040000)
  });

  assert.strictEqual(imaging.get('imagingDateAsTime'), 1131593040000);
});

test('requestedDateAsTime', function(assert) {
  let imaging = this.subject({
    requestedDate: new Date(1131593040000)
  });

  assert.strictEqual(imaging.get('requestedDateAsTime'), 1131593040000);
});

testValidPropertyValues('imagingTypeName', ['test']);
testInvalidPropertyValues('imagingTypeName', [undefined]);

testValidPropertyValues('patientTypeAhead', ['John Doe', 'John Doe Junior'], function(subject) {
  let patient;
  Ember.run(() => {
    patient = subject.get('store').createRecord('patient', {
      firstName: 'John Doe'
    });
  });
  subject.set('patient', patient);
  subject.set('selectPatient', true);
  subject.set('hasDirtyAttributes', true);
});

testInvalidPropertyValues('patientTypeAhead', ['John Doe', ''], function(subject) {
  let patient;
  Ember.run(() => {
    patient = subject.get('store').createRecord('patient', {
      firstName: 'James Doe'
    });
  });
  subject.set('patient', patient);
  subject.set('selectPatient', true);
  subject.set('hasDirtyAttributes', true);
});

testValidPropertyValues('patientTypeAhead', ['John Doe', ''], function(subject) {
  let patient;
  Ember.run(() => {
    patient = subject.get('store').createRecord('patient', {
      firstName: 'James Doe'
    });
  });
  subject.set('patient', patient);
  subject.set('selectPatient', false);
  subject.set('hasDirtyAttributes', true);
}, 'When no select patient');

testValidPropertyValues('patientTypeAhead', ['John Doe', ''], function(subject) {
  let patient;
  Ember.run(() => {
    patient = subject.get('store').createRecord('patient', {
      firstName: 'James Doe'
    });
  });
  subject.set('patient', patient);
  subject.set('selectPatient', true);
  subject.set('hasDirtyAttributes', false);
}, 'When no dirty attributes');

testInvalidPropertyValues('result', [''], function(subject) {
  subject.set('status', 'Completed');
});

testValidPropertyValues('result', ['test', '']);
