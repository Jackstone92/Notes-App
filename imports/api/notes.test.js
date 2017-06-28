import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if(Meteor.isServer) {
  describe('notes', function() {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    }

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Second Title',
      body: 'My second body for note',
      updatedAt: 0,
      userId: 'testUserId2'
    }

    // Mocha Lifecycle Method 'beforeEach' to fill database with seed data before running test-cases //
    beforeEach(function() {
      // uses different database for testing //
      Notes.remove({});
      Notes.insert(noteOne);
    });

    it('should insert new note', function() {
      // test meteor methods //
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId: 'testId' });
      expect(Notes.findOne({ _id: _id, userId: 'testId' })).toExist();
    });

    it('should not insert note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      expect(Notes.findOne({ _id: noteOne._id })).toNotExist();
    });

    it('should not remove note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
      }).toThrow();
    });

    it('should update note', function() {
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
        }, [
          noteOne._id,
          { title: title }
        ]
      );

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title: title,
        body: noteOne.body
      });
    });

    it('should throw error if extra updates provided', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
          }, [
            noteOne._id,
            { unexpected: "this is unexpected!" }
          ]
        );
      }).toThrow();
    });

    it('should not update note if user was not creator', function() {
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'this is a different userId than creator'
        }, [
          noteOne._id,
          { title: title }
        ]
      );

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude(noteOne);
    });

    it('should not update note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId});
      }).toThrow();
    });

    it('should return a users notes', function() {
      const result = Meteor.server.publish_handlers['notes'].apply({ userId: noteOne.userId});
      const notes = result.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return 0 notes for user that has none', function() {
      const result = Meteor.server.publish_handlers['notes'].apply({ userId: 'Someone Different'});
      const notes = result.fetch();

      expect(notes.length).toBe(0);
    });



  }); // describe end //
}
