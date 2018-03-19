import Ember from 'ember';
import { moduleForModel } from 'ember-qunit';

import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('appointment', 'Unit | Model | appointment', {
  needs: [
    'validator:presence',
    'validator:patient-typeahead',
    'model:patient',
    'model:visit',
    'model:allergy',
    'model:diagnosis',
    'model:operation-report',
    'model:operative-plan',
    'model:payment',
    'model:price-profile'
  ]
});

testValidPropertyValues('appointmentType', ['test']);
testInvalidPropertyValues('appointmentType', [undefined]);

testValidPropertyValues('startDate', ['test']);
testInvalidPropertyValues('startDate', [undefined]);

testValidPropertyValues('appointmentDate', ['test']);
testInvalidPropertyValues('appointmentDate', [undefined]);
testValidPropertyValues('appointmentDate', [undefined], function(subject) {
  subject.set('appointmentType', 'Admission');
});

testInvalidPropertyValues('endDate', [new Date(2010, 1, 1)], function(subject) {
  subject.set('startDate', new Date(2011, 1, 1));
});

testValidPropertyValues('endDate', [new Date(2010, 1, 1)], function(subject) {
  subject.set('allDay', true);
  subject.set('startDate', new Date(2010, 1, 1));
}, 'same date with allDay set to true');

testInvalidPropertyValues('endDate', [new Date(2010, 1, 1)], function(subject) {
  subject.set('allDay', false);
  subject.set('startDate', new Date(2010, 1, 1));
}, 'same date with allDay set to false');

testInvalidPropertyValues('endDate', [new Date(2010, 1, 1)], function(subject) {
  subject.set('startDate', null);
});

testInvalidPropertyValues('endDate', [undefined], function(subject) {
  subject.set('startDate', new Date(2010, 1, 1));
});

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
