import authReducer from '../../reducers/auth';

test('Should log in with uid', () => {
    const action = {
        type: 'LOGIN',
        uid: '123456'
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);

})

test('Should log out', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({uid: 'testvalue'}, action);
    expect(state).toEqual({});
})
