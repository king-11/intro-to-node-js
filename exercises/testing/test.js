// write some tests
const {
    findUser,
    deleteUser
} = require('./users')


describe('users', () => {
    test('findUser', async () => {
        const user = await findUser(1)
        expect(user.id).toBe(1)
    })
})

describe('users', () => {
    test('findUser', async () => {
        await deleteUser(1)
        try {
            const user = await findUser(1)
        } catch (e) {
            expect(e).toBe("No user with id 1")
        }
    })
})