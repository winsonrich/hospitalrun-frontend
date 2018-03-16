import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
import { testValidPropertyValues, testInvalidPropertyValues } from '../../helpers/test-valid-property-values';

moduleForModel('invoice', 'Unit | Model | invoice', {
  needs: [
    'model:patient',
    'model:visit',
    'model:price-profile',
    'model:payment',
    'model:billing-line-item',
    'model:line-item-detail',
    'model:allergy',
    'model:diagnosis',
    'model:operation-report',
    'model:operative-plan',
    'validator:presence',
    'validator:number',
    'validator:patient-typeahead'
  ]
});

const lineItemsData = [
  {
    category: 'test',
    privateInsurance: 10,
    nationalInsurance: 3,
    discount: 5
  },
  {
    privateInsurance: 4,
    nationalInsurance: 5,
    discount: 2
  }
];

test('addPayment', function(assert) {
  let payments;
  Ember.run(() => {
    payments = [12.5, 10].map((amount) => {
      let model = this.store().createRecord('payment', { amount });
      model.set('currentState.parentState.isNew', false);
      return model;
    });
  });
  let invoice = this.subject();

  Ember.run(() => invoice.addPayment(payments[0]));
  assert.strictEqual(invoice.get('paidTotal'), 12.5, 'Should add first payment');

  Ember.run(() => invoice.addPayment(payments[1]));
  assert.strictEqual(invoice.get('paidTotal'), 22.5, 'Should add second payment');
});

test('billAsDate', function(assert) {
  let invoice = this.subject({
    billDate: new Date(1481745786401)
  });

  assert.strictEqual(invoice.get('billDateAsTime'), 1481745786401);
});

test('paidFlag', function(assert) {
  let invoice = this.subject({ status: 'Paid' });

  assert.strictEqual(invoice.get('paidFlag'), true);
});

test('paidFlag false', function(assert) {
  let invoice = this.subject();

  assert.strictEqual(invoice.get('paidFlag'), false);
});

test('discount', function(assert) {
  let lineItems, invoice;
  Ember.run(() => {
    lineItems = lineItemsData.map((item) => this.store().createRecord('billing-line-item', item));
    invoice = this.subject({ lineItems });
  });

  assert.strictEqual(invoice.get('discount'), 7);
});

test('nationalInsurance', function(assert) {
  let lineItems, invoice;
  Ember.run(() => {
    lineItems = lineItemsData.map((item) => this.store().createRecord('billing-line-item', item));
    invoice = this.subject({ lineItems });
  });

  assert.strictEqual(invoice.get('nationalInsurance'), 8);
});

test('privateInsurance', function(assert) {
  let lineItems, invoice;
  Ember.run(() => {
    lineItems = lineItemsData.map((item) => this.store().createRecord('billing-line-item', item));
    invoice = this.subject({ lineItems });
  });

  assert.strictEqual(invoice.get('privateInsurance'), 14);
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
