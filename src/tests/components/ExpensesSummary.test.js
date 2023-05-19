import React from 'react';
import { shallow }  from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';


test('Should render ExpensesSummary with empty message', () => {
    const wrapper = shallow(<ExpensesSummary expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpensesSummary with totals from expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});