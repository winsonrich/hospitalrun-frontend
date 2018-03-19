import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:patient-typeahead', 'Unit | Validator | patient-typeahead', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  let validator = this.subject();
  assert.ok(validator);
});
