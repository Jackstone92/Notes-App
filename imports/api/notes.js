// collection //
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
// import Simpl Schema from simpl-schema //
import SimpleSchema from 'simpl-schema';


export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({userId: this.userId});
  });
}

Meteor.methods({
  'notes.insert': function() {
    if(!this.userId) {
      throw new Meteor.Error('Not-Authorised!');
    }

    return Notes.insert({
      title: '',
      body: '',
      userId: this.userId,
      updatedAt: moment().valueOf() //new Date().getTime()
    });
  }, // notes.insert end //

  'notes.remove': function(_id) {
    if(!this.userId) {
      throw new Meteor.Error('Not-Authorised!');
    }

    // validate _id //
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id: _id
    });

    Notes.remove({_id: _id, userId: this.userId });
  }, // notes.remove end //

  'notes.update': function(_id, updates) {
    if(!this.userId) {
      throw new Meteor.Error('Not-Authorised!');
    }

    // validate _id //
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id: _id,
      ...updates
    });

    Notes.update({
      _id: _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });

  }
});
