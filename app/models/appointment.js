import AbstractModel from 'hospitalrun/models/abstract';
import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const { computed } = Ember;

const Validations = buildValidations({

  appointmentDate: validator('presence', {
    presence: true,
    disabled: Ember.computed.equal('model.appointmentType', 'Admission')
  }),

  patientTypeAhead: validator('patient-typeahead'),

  patient: validator('presence', true),
  appointmentType: validator('presence', true),
  startDate: validator('presence', true),
  endDate: validator(function(value, options, model) {
    if (!model.get('hasDirtyAttributes')) {
      return true;
    }
    let allDay = model.get('allDay');
    let startDate = model.get('startDate');
    let endDate = value;
    if (Ember.isEmpty(endDate) || Ember.isEmpty(startDate)) {
      // force validation to fail
      return 'Please select an end date later than the start date';
    } else {
      if (allDay) {
        if (endDate.getTime() < startDate.getTime()) {
          return 'Please select an end date later than the start date';
        }
      } else {
        if (endDate.getTime() <= startDate.getTime()) {
          return 'Please select an end date later than the start date';
        }
      }
    }

    return true;
  })
});

export default AbstractModel.extend(Validations, {
  // Attributes
  allDay: DS.attr(),
  provider: DS.attr('string'),
  location: DS.attr('string'),
  appointmentType: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  notes: DS.attr('string'),
  status: DS.attr('string', { defaultValue: 'Scheduled' }),

  // Associations
  patient: DS.belongsTo('patient', { async: false }),
  visits: DS.hasMany('visit'),

  // Formats
  longDateFormat: 'l h:mm A',
  shortDateFormat: 'l',
  timeFormat: 'h:mm A',

  _getDateSpan(startDate, endDate, format) {
    let formattedStart = startDate.format(format);
    let formattedEnd = endDate.format(format);
    return `${formattedStart} - ${formattedEnd}`;
  },

  appointmentDate: computed('startDate', function() {
    let startDate = this.get('startDate');
    return startDate;
  }),

  displayStatus: computed('status', function() {
    let status = this.get('status');
    if (Ember.isEmpty(status)) {
      status = 'Scheduled';
    }
    return status;
  }),

  formattedAppointmentDate: computed('startDate', 'endDate', function() {
    let allDay = this.get('allDay');
    let endDate = moment(this.get('endDate'));
    let dateFormat = '';
    let formattedDate = '';
    let startDate = moment(this.get('startDate'));

    if (startDate.isSame(endDate, 'day')) {
      formattedDate = startDate.format(this.get('shortDateFormat'));
      if (!allDay) {
        formattedDate += ' ';
        formattedDate += this._getDateSpan(startDate, endDate, this.get('timeFormat'));
      }
    } else {
      if (allDay) {
        dateFormat = this.get('shortDateFormat');
      } else {
        dateFormat = this.get('longDateFormat');
      }
      formattedDate = this._getDateSpan(startDate, endDate, dateFormat);
    }
    return formattedDate;
  })
});
