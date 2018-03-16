import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const PatientTypeahead = BaseValidator.extend({
  validate(value, options, model) {
    if (!model.get('selectPatient')) {
      return true;
    }
    if (!model.get('hasDirtyAttributes')) {
      return true;
    }
    let patientName = model.get('patient.displayName');
    let patientTypeAhead = value;
    if (Ember.isEmpty(patientName) || Ember.isEmpty(patientTypeAhead)) {
      // force validation to fail
      return false;
    } else {
      let typeAheadName = patientTypeAhead.substr(0, patientName.length).toLowerCase();
      if (patientName.toLowerCase().indexOf(typeAheadName) !== 0) {
        return false;
      }
    }
    // patient is properly selected; don't do any further validation
    return true;
  }
});

PatientTypeahead.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * [
   * 	`model.array.@each.${attribute}` --> Dependent is created on the model's context
   * 	`${attribute}.isValid` --> Dependent is created on the `model.validations.attrs` context
   * ]
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor(/* attribute, options */) {
    return [];
  }
});

export default PatientTypeahead;
