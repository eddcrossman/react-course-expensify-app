import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import {    addExpense, 
            editExpense, 
            removeExpense, 
            startAddExpense, 
            setExpenses, 
            startSetExpenses,
            startRemoveExpense,
            startEditExpense
        } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
import { firebase } from '../../firebase/firebase'; 

const createMockStore = configureMockStore([thunk]);
const uid = 'TEST_UID';
const defaultAuthState = {auth: { uid }}

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    firebase.set(firebase.ref(database, `users/${uid}/expenses`), expensesData).then(() => { done(); })
});

test('Should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('Should remove expense from database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({id: id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
    
        firebase.onValue(firebase.ref(database, `users/${uid}/expenses/${actions[0].id}`), 
            (snapshot) => { 
                expect(snapshot.val()).toEqual(null);
                done();
            }, {
                onlyOnce: true
            }
        );
    });   
});

test('Should set up edit expense action object', () => {
    const action = editExpense('testID', { testKey: 'testValue' }); 
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'testID',
        updates: { 
            testKey: 'testValue'
        }
    });
});

test('Should edit expense in database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 999 };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return firebase.get(firebase.ref(database, `users/${uid}/expenses/${id}`)).then((snapshot) => {
            expect(snapshot.val().amount).toBe(updates.amount);
            done();
        }, { onlyOnce: true })
    });
});

test('Should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'this one is better',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        
        firebase.onValue(firebase.ref(database, `users/${uid}/expenses/${actions[0].expense.id}`), 
            (snapshot) => { 
                expect(snapshot.val()).toEqual(expenseData);
                done();
            }, {
                onlyOnce: true
            }
        );
    });
});

test('SHould add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        
        firebase.onValue(firebase.ref(database, `users/${uid}/expenses/${actions[0].expense.id}`), 
            (snapshot) => { 
                expect(snapshot.val()).toEqual(expenseData);
                done();
            }, {
                onlyOnce: true
            }
        )
    });
});

test('Should create add expense action object with given values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('Should setup set expenses action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});