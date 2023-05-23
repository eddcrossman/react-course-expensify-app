import React from 'react';
import { shallow }  from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';


test('Should render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={232} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary with totals from expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={5} expensesTotal={12232} />);
    expect(wrapper).toMatchSnapshot();
});