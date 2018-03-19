import DS from 'ember-data';
import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: validator('format', {
    type: 'email',
    message: 'Please, enter a valid email address'
  })
});

const { computed } = Ember;

let User = DS.Model.extend(Validations, {
  // Attributes
  derived_key: DS.attr('string'),
  deleted: DS.attr('boolean'),
  displayName: DS.attr('string'),
  email: DS.attr('string'),
  iterations: DS.attr(),
  name: DS.attr('string'),
  password: DS.attr('string'),
  password_scheme: DS.attr('string'),
  password_sha: DS.attr('string'),
  rev: DS.attr('string'),
  roles: DS.attr(),
  salt: DS.attr('string'),
  userPrefix: DS.attr('string'),

  displayRole: computed('roles', function() {
    let roles = this.get('roles');
    if (!Ember.isEmpty(roles)) {
      return roles[0];
    }
  })
});

export default User;
