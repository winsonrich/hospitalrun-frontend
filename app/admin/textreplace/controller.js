import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'newExpansion.from': validator('presence', true),
  'newExpansion.to': validator('presence', true)
});

export default Ember.Controller.extend(Validations, {
  hideCancelButton: true,
  updateCapability: 'update_config',

  createExpansion: function() {
    let newExpansion = this.get('store').createRecord('text-expansion');
    this.set('newExpansion', newExpansion);
  }.on('init'),

  actions: {
    cancelExpansion() {
      this.createExpansion();
    }
  }
});
