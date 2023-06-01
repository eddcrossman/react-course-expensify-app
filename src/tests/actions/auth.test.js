import { login, logout } from '../../actions/auth'

test('Should generate LOGIN action object', () => {
    const uid = '123456';
    expect(login(uid)).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('Should generate LOGOUT action object', () => {
    expect(logout()).toEqual({
        type: 'LOGOUT'
    })
});