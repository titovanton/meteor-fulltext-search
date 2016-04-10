import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    const hideCompleted = instance.state.get('hideCompleted');
    const queryText = instance.state.get('queryText');
    let fields = {};
    let options = {};

    if (queryText) {
      try {
        const re = new RegExp(queryText);
        fields.text = re;
      } catch (error) {
        ;
      }
    }

    if (hideCompleted) {
      fields.checked = { $ne: true };
      options.sort = { createdAt: -1 };
    }

    return Tasks.find(fields, options);
  },

  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  }
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },

  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

  'keyup #fulltext-search input'(event, instance) {
    instance.state.set('queryText', event.target.value);
  },

  'submit #fulltext-search'(event) {
    event.preventDefault();
  },
});
