import expensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('Should return 0 for no expenses', () => {
    const result = expensesTotal([]);
    expect(result).toBe(0);
});

test('Should return expense amount for 1 expense', () => {
    const result = expensesTotal([expenses[0]]);
    expect(result).toBe(expenses[0].amount);
});

test('Should return total for multiple expenses', () => {
    const result = expensesTotal(expenses);
    expect(result).toBe(expenses[0].amount + expenses[1].amount + expenses[2].amount);
});