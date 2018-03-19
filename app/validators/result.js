import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const Result = BaseValidator.extend({
  i18n: Ember.inject.service(),

  validate(value, options, model) {
    if (!model.get('hasDirtyAttributes')) {
      return true;
    }

    let status = model.get('status');
    if (status === 'Completed' && Ember.isEmpty(value)) {
      // force validation to fail
      return 'Please enter a result before completing'; // todo fix i18n
    }

    return true;
  }
});

Result.reopenClass({
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

export default Result;
