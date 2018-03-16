import AbstractModel from 'hospitalrun/models/abstract';
import DS from 'ember-data';
import Ember from 'ember';
import IncidentStatuses, { REPORTED } from 'hospitalrun/mixins/incident-statuses';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const { attr, belongsTo, hasMany } = DS;

const { computed, get, isEmpty, set } = Ember;

const Validations = buildValidations({
  categoryName: validator('presence', true),
  dateOfIncident: validator('presence', true),
  department: validator('presence', true),
  description: validator('presence', true),
  patientTypeAhead: validator(function(value, options, model) {
    let patientTypeAhead = value;
    let isValid = true;
    if (isEmpty(patientTypeAhead)) {
      return true;
    }
    let patientName = model.get('patient.displayName');
    if (isEmpty(patientName)) {
      isValid = false;
    } else {
      let typeAheadName = patientTypeAhead.substr(0, patientName.length).toLowerCase();
      if (patientName.toLowerCase().indexOf(typeAheadName) !== 0) {
        isValid = false;
      }
    }
    if (!isValid) {
      let i18n = model.get('i18n');
      return i18n.t('incident.messages.selectExistingPatient').toString();
    }

    return true;
  })
});

export default AbstractModel.extend(IncidentStatuses, Validations, {
  categoryItem: attr('string'),
  categoryName: attr('string'),
  customForms: DS.attr('custom-forms'),
  dateOfIncident: attr('date'),
  department: attr('string'),
  description: attr('string'),
  friendlyId: attr('string'),
  modifiedByDisplayName: DS.attr('string'),
  notificationSend: attr('boolean', { defaultValue: false }),
  reportedBy: attr('string'),
  reportedByDisplayName: attr('string'),
  reportedDate: attr('date'),
  reportedTo: attr('string'),
  sentinelEvent: attr('boolean'),
  status: attr('string', { defaultValue: REPORTED }),

  incidentAttachments: hasMany('attachment', { async: true }),
  notes: hasMany('incident-note', { async: true }),
  patient: belongsTo('patient', { async: false }),

  dateForFilter: computed('dateOfIncident', function() {
    let dateOfIncident = get(this, 'dateOfIncident');
    return moment(dateOfIncident).startOf('day').toDate();
  }),

  localizedStatus: computed('status', function() {
    let status = get(this, 'status');
    return this.getLocalizedStatus(status);
  }),

  patientTypeAhead: computed('patient', {
    get() {
      let patient = get(this, 'patient');
      if (!isEmpty(patient)) {
        return `${get(patient, 'displayName')} - ${get(patient, 'displayPatientId')}`;
      } else {
        return get(this, 'typeAheadPatientName');
      }
    },
    set(key, value) {
      set(this, 'typeAheadPatientName', value);
      return value;
    }
  })
});
