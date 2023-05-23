import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses'
import expensesTotal from '../selectors/expenses-total'

require('numeral/locales/en-gb');
numeral.locale('en-gb');

export const ExpensesSummary = ( {expenseCount, expensesTotal} ) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    );
}

const mapStateToProps = (state)=> {
    const expenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: expenses.length,
        expensesTotal: expensesTotal(expenses)
    }
};

export default connect(mapStateToProps)(ExpensesSummary);