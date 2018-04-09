import Ember from 'ember';
export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  actions: {
    recoverPassword() {
      let username = this.get('identification');
      // let ajax = this.get('ajax').post('/recover-password', {
        // username: username
      // }).then((data) => {
        // TODO set up endpoint to handle password recovery
        // this.set('recoverySuccess', true)
        // this.set('recoveryFailure', true)
      // })
    }
  }
});
