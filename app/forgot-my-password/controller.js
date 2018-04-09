import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),
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
