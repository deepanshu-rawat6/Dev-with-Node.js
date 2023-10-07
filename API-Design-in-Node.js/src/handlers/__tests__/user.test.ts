// describe('user handler', () => {
//     it('it should do something when something happens', () => {
//         expect(1).toBe(1);
//     })
// });

// Test Suite: user handler
// Tests: it section

import * as user from '../user';

describe('user handler', () => {
    it('should create a new user', async () => {
        const req = {
            body: {
                username: 'test',
                password: 'test',
                email: 'test@abc.com',
            }
        }
        const res = {
            json({ token }) {
                console.log(token)
                expect(token).toBeTruthy()
            }
        }

        await user.createNewUser(req, res, () => { });
    })
})