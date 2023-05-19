import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses'
import expensesTotal from '../selectors/expenses-total'

require('numeral/locales/en-gb');
numeral.locale('en-gb');

export const ExpensesSummary = (props) => (
    <div>
        {
            props.expenses.length !== 0 &&  
                <p>
                    Viewing {props.expenses.length} expense{props.expenses.length > 1 && <span>s</span>} totalling {numeral(expensesTotal(props.expenses) / 100).format('$0,0.00')}
                </p>

                    
        }    
    </div>
    
);

const mapStateToProps = (state)=> {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

export default connect(mapStateToProps)(ExpensesSummary);