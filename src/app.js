import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});
console.log(store.getState());

store.dispatch(addExpense({description: 'Water Bill', amount: 1000, createdAt: 1000}));
store.dispatch(addExpense({description: 'Gas Bill', amount: 2000, createdAt: -1000}));
store.dispatch(setTextFilter('Gas'));


ReactDOM.render(<AppRouter/>, document.getElementById('app'));