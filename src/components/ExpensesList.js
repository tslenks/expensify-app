import React from 'React';
import { connect }  from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        <h1>Expenses List</h1>
        { props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />;
        })}        
    </div>
);

const mapStateToProps = (state)=> ({
    expenses: selectExpenses(state.expenses, state.filters) // because here we need the filter data and not all the data
});

export default connect(mapStateToProps)(ExpenseList);