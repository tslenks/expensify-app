import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({
    description: 'Water bill',
    amount: 250,
    note: 'This is a sample of a water bill',
    createdAt: 202251,
}));

store.dispatch(addExpense({
    description: 'Gas bill',
    amount: 100,
    note: 'This is a sample of a gas bill',
    createdAt: 124680,
}));

store.dispatch(setTextFilter('wa'));

/* setTimeout(()=>{
    store.dispatch(setTextFilter('gas'));
}, 3000); */

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

/**
 * put a provider component that allows all of our components and its wrapped components to use the store that we use
 * 
 */
const jsx = (
    <Provider store= { store }> 
        <AppRouter />
    </Provider>
);


// ReactDOM.render(<AppRouter />, document.getElementById('app'))
ReactDOM.render(jsx, document.getElementById('app'))
