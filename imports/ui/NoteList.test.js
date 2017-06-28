import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

const notes = [
  {
    _id: 'noteId1',
    title: 'testTitle1',
    body: 'body1',
    updatedAt: 0,
    userId: 'userId1'
  }, {
    _id: 'noteId2',
    title: 'testTitle2',
    body: 'body2',
    updatedAt: 0,
    userId: 'userId2'
  }
];

const emptyNotes = [];

if(Meteor.isClient) {
  describe('NoteList', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {
      const wrapper = mount(<NoteList notes={emptyNotes} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });

}
