import {Meteor} from 'meteor/meteor';
import expect from 'expect';


// const add = (a, b) => {
//   if(typeof b !== 'number') {
//     return a + a;
//   }
//
//   return a + b;
// };
//
// const square = (a) => {
//   return a * a;
// }
//
//
// describe('add', function() {
//
//   it('should add two numbers', function() {
//     const result = add(11, 9);
//
//     expect(result).toBe(20);
//
//     // if(result !== 20) {
//     //   throw new Error('Sum was not equal to the expected value');
//     // }
//   });
//
//   it('should double a single number', function() {
//     const result = add(44);
//
//     expect(result).toBe(88);
//
//     // if(result !== 88) {
//     //   throw new Error('Number was not doubled.');
//     // }
//   });
//
// });
//
//
// describe('square', function() {
//
//   it('should square a number', function() {
//     const result = square(8);
//
//     expect(result).toBe(64);
//
//     // if(result !== 64) {
//     //   throw new Error('Square result was not equal to the expected value');
//     // }
//   });
//
// });


import { validateNewUser } from './users';

if(Meteor.isServer) {
  describe('users', function() {
    it('should allow valid email address', function() {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };

      const result = validateNewUser(testUser);

      expect(result).toBe(true);

    });

    it('should reject invalid email', function() {
      expect(() => {
        const testUser2 = {
          emails: [
            {
              address: '1a34gfd.com'
            }
          ]
        };

        validateNewUser(testUser2);
      }).toThrow();
    });

  });
}
