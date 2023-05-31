import database from '../firebase/firebase';
import { firebase } from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};

        return firebase.push(firebase.ref(database, 'expenses'), expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',   
    id
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type:'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return firebase.get(firebase.ref(database, 'expenses')).then((snapshot) => {
            const expenses = [];
            snapshot.forEach((expense) => {
                expenses.push({
                    id: expense.key,
                    ...expense.val()
                });
            })
            dispatch(setExpenses(expenses));
        }, { onlyOnce: true })
    }
}