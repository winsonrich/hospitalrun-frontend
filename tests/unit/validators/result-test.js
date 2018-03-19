import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:result', 'Unit | Validator | result', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  let validator = this.subject();
  assert.ok(validator);
});
