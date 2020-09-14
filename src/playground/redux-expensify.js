import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

const demoState = {
    expense: [{
        id: 'sdspr',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// So from this data demoState, we can set up our actions
// => ADD_EXPENSE/EDIT_EXPENSE/REMOVE_EXPENSE expense
// => Ability to filter 
// => Ability to sort (SORT_BY_DATE)
// => Set start date  (SET_START_DATE)
// => Set end date    (SET_END_DATE)
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    }
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate,
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate,
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // push will change the variable but concat will not
            // return state.concat(action.expense);
            return [
                ...state,
                action.expense
            ];
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                return expense;
            });
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => action.id && id !== action.id);
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filterReducers = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

// Get Visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate }) => {
    return expenses
        .filter((expense) => {
            const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
            const endDateMatch  = typeof endDate !== 'number' || expense.createdAt <= endDate;
            const textMatch = typeof text === 'string' && expense.description.toLowerCase().includes(text.toLowerCase());
            return startDateMatch && endDateMatch && textMatch;
        })
        .sort((a, b) => {
            if(sortBy === 'date') {
                return a.createdAt < b.createdAt ? 1 : -1;
            } else if (sortBy === 'amount') {
                return a.amount < b.amount ? 1 : -1;
            }
        });
};

// creation store and registration all the reducers
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducers
    })
);

const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 350 }));
const expense2 = store.dispatch(addExpense({ description: 'Coffee', amount: 750, createdAt:-200 }));
const expense3 = store.dispatch(addExpense({ description: 'Shop', amount: 124, createdAt: -360 }));
const expense4 = store.dispatch(addExpense({ description: 'Car', amount: 1250, createdAt: 500 }));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

/*

const removedExpense = store.dispatch(removeExpense({id: expense1.expense.id}));
const editExpense2 = store.dispatch(editExpense(expense2.expense.id, { amount: 500 }));

const searchByText1 = store.dispatch(setTextFilter('o'));
const searchByText2 = store.dispatch(setTextFilter());

const sortByDate1 = store.dispatch(sortByDate());
const sortByAmount1 = store.dispatch(sortByAmount());

store.dispatch(setStartDate(400));
tore.dispatch(setStartDate());
store.dispatch(setEndDate());
store.dispatch(setEndDate(1250));

*/
