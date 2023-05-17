import {    
    setTextFilter, 
    sortByAmount, 
    sortByDate, 
    setStartDate, 
    setEndDate
} from '../../actions/filters';
import moment from 'moment';

test('Should generate SET_START_DATE action object', () => {
    expect(setStartDate(moment(0))).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('Should generate SET_END_DATE action object', () => {
    expect(setEndDate(moment(0))).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('Should generate SET_SORT_BY_DATE action object', () => {
    expect(sortByDate()).toEqual({ type: 'SET_SORT_BY_DATE' });
});

test('Should generate SET_SORT_BY_AMOUNT action object', () => {
    expect(sortByAmount()).toEqual({ type: 'SET_SORT_BY_AMOUNT' });
});

test('Should generate SET_TEXT_FILTER action object with default value', () => {
    expect(setTextFilter()).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('Should generate SET_TEXT_FILTER action object with given value', () => {
    const text = 'testValue'
    expect(setTextFilter(text)).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});