import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if(Meteor.isClient) {
  describe('NoteListItem', function() {

    it('should render title and timestamp', function() {
      const title = 'Test Title';
      const updatedAt = 1486137505429;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('2/03/17');
    });

    it('should set default title if no title set', function() {
      const title = '';
      const updatedAt = 1486137505429;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }}/>);

      expect(wrapper.find('h5').text()).toNotBe(title);
      expect(wrapper.find('h5').text()).toBe('Untitled Note');
    });


  });
}
