import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
import { firebase } from '../../firebase/firebase'; 

const createMockStore = configureMockStore([thunk]);

test('Should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
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

// test('Should create add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '', 
//             note: '', 
//             amount: 0, 
//             createdAt: 0
//         }
//     });
// });

test('Should add expense to database and store', (done) => {
    const store = createMockStore({});
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
        
        firebase.onValue(firebase.ref(database, `expenses/${actions[0].expense.id}`), 
            (snapshot) => { 
                expect(snapshot.val()).toEqual(expenseData);
                done();
            }, {
                onlyOnce: true
            }
        )
    });
});

test('SHould add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
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
        
        firebase.onValue(firebase.ref(database, `expenses/${actions[0].expense.id}`), 
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