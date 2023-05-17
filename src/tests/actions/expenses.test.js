import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

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

test('Should create add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '', 
            note: '', 
            amount: 0, 
            createdAt: 0
        }
    });
});

test('Should create add expense action object with given values', () => {
    const expenseData = {
        description: 'testDescription', 
        note: 'testNote', 
        amount: 123, 
        createdAt: 456
    };
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: { 
            id: expect.any(String),
            ...expenseData
        }
    });
});